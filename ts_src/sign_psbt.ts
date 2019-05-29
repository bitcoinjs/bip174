import {
  crypto,
  ECPair,
  networks,
  script,
  Transaction,
  TxOutput,
} from 'bitcoinjs-lib';
const { decompile } = script;
const { hash160 } = crypto;

import { decodePsbt, DecodePsbtsOutput } from './decode_psbt';
import { encodeSignature } from './encode_signature';
import { updatePsbt } from './update_psbt';

const hexBase: number = 16;

export interface SignPsbtInput {
  network: string;
  psbt: string;
  signing_keys: string[];
}

export interface SignPsbtOutput {
  psbt: string;
}

interface KeyMap {
  [keyType: string]: ECPair.ECPairInterface;
}

/** Update a PSBT with signatures

  {
    network: <Network Name String>
    psbt: <BIP 174 Encoded PSBT Hex String>
    signing_keys: [<WIF Encoded Private Key String>]
  }

  @throws
  <Sign PSBT Error>

  @returns
  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }
*/
export function signPsbt(args: SignPsbtInput): SignPsbtOutput {
  let decoded: DecodePsbtsOutput;
  const keys: KeyMap = {};
  const network = networks[args.network];
  const pkHashes: KeyMap = {};

  args.signing_keys.map(k => {
    const key = ECPair.fromWIF(k, network);

    keys[key.publicKey!.toString('hex')] = key;
    pkHashes[hash160(key.publicKey!).toString('hex')] = key;
  });

  try {
    decoded = decodePsbt({ psbt: args.psbt });
  } catch (err) {
    throw err;
  }

  const tx = Transaction.fromHex(decoded.unsigned_transaction as string);
  const signatures: {}[] = [];

  decoded.inputs.forEach((input, vin) => {
    // Absent bip32 derivations to look for, look in scripts for keys
    if (!input.bip32_derivations) {
      const scripts = [input.redeem_script, input.witness_script];

      // Go through the scripts that match keys and add signatures
      scripts
        .filter(n => !!n)
        .map(n => Buffer.from(n as string, 'hex'))
        .forEach(n => {
          const buffers = decompile(n)!.filter(Buffer.isBuffer);

          // Lookup data pushes in the key and key hash indexes
          const keysToSign = buffers
            .map(b => b.toString('hex'))
            .map(k => {
              return keys[k] || pkHashes[k];
            });

          // For each found key, add a signature
          keysToSign
            .filter(n => !!n)
            .forEach(signingKey => {
              let hashToSign;
              let sighashType = input.sighash_type as number;

              // Witness input spending a witness utxo
              if (!!input.witness_script && !!input.witness_utxo) {
                const script = Buffer.from(input.witness_script, 'hex');
                const tokens = input.witness_utxo!.tokens;

                hashToSign = tx.hashForWitnessV0(
                  vin,
                  script,
                  tokens,
                  sighashType,
                );
              }
              if (!!input.witness_script && !!input.redeem_script) {
                // Nested witness input
                const nonWitnessUtxo = Transaction.fromHex(
                  input.non_witness_utxo!,
                );
                const redeemScript = Buffer.from(input.redeem_script, 'hex');
                const script = Buffer.from(input.witness_script, 'hex');

                const nestedScriptHash = hash160(redeemScript);

                const tx = Transaction.fromHex(
                  decoded.unsigned_transaction as string,
                );

                // Find the value for the sigHash in the non-witness utxo
                const { value } = nonWitnessUtxo.outs.find(n => {
                  return !!decompile(n.script)!
                    .filter(Buffer.isBuffer)
                    .find(n => n.equals(nestedScriptHash));
                }) as TxOutput;

                hashToSign = tx.hashForWitnessV0(
                  vin,
                  script,
                  value,
                  sighashType,
                );
              } else if (!!input.witness_script && !!input.non_witness_utxo) {
                const txWithOutputs = Transaction.fromHex(
                  input.non_witness_utxo,
                );

                const vout = tx.ins[vin].index;

                const script = Buffer.from(input.witness_script, 'hex');
                const tokens = (txWithOutputs.outs[vout] as TxOutput).value;

                hashToSign = tx.hashForWitnessV0(
                  vin,
                  script,
                  tokens,
                  sighashType,
                );
              } else {
                // Non-witness script
                const forkId = networks[args.network].fork_id;

                const forkMod = parseInt(forkId || 0, hexBase);
                const redeem = Buffer.from(
                  input.redeem_script as string,
                  'hex',
                );
                const sigHash = input.sighash_type;
                let tokens;
                const spendsTx = Transaction.fromHex(
                  input.non_witness_utxo as string,
                );

                if (input.witness_utxo) {
                  tokens = input.witness_utxo.tokens;
                } else if (input.non_witness_utxo) {
                  tokens = (spendsTx.outs[tx.ins[vin].index] as TxOutput).value;
                }

                sighashType = (!forkMod
                  ? sigHash
                  : forkMod | sigHash!) as number;

                const fork = tx.hashForWitnessV0(
                  vin,
                  redeem,
                  tokens as number,
                  sighashType,
                );
                const normal = tx.hashForSignature(vin, redeem, sighashType);

                hashToSign = forkMod ? fork : normal;
              }

              if (!hashToSign) {
                return;
              }

              const sig = encodeSignature({
                flag: sighashType,
                signature: signingKey.sign(hashToSign).toString('hex'),
              });

              return signatures.push({
                vin,
                hash_type: sighashType,
                public_key: signingKey.publicKey!.toString('hex'),
                signature: sig.toString('hex'),
              });
            });
        });
    }

    // Given BIP32 derivations, attach relevant signatures for each
    (input.bip32_derivations || []).forEach(bip32 => {
      const signingKey = keys[bip32.public_key];

      if (!signingKey) {
        return;
      }

      let hashToSign;
      const sighashType = input.sighash_type as number;

      if (!!input.witness_script && !!input.witness_utxo) {
        const script = Buffer.from(input.witness_script, 'hex');
        const tokens = input.witness_utxo.tokens;

        hashToSign = tx.hashForWitnessV0(vin, script, tokens, sighashType);
      }

      if (!!input.non_witness_utxo && !!input.redeem_script) {
        const redeemScript = Buffer.from(input.redeem_script, 'hex');

        hashToSign = tx.hashForSignature(vin, redeemScript, sighashType);
      }

      if (!hashToSign) {
        return;
      }

      const signature = encodeSignature({
        flag: sighashType,
        signature: signingKey.sign(hashToSign).toString('hex'),
      });

      return signatures.push({
        vin,
        hash_type: sighashType,
        public_key: bip32.public_key,
        signature: signature.toString('hex'),
      });
    });
  });

  return updatePsbt({ signatures, psbt: args.psbt });
}
