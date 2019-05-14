"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const { decompile } = bitcoinjs_lib_1.script;
const { hash160 } = bitcoinjs_lib_1.crypto;
const decode_psbt_1 = require("./decode_psbt");
const encode_signature_1 = require("./encode_signature");
const update_psbt_1 = require("./update_psbt");
const hexBase = 16;
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
function signPsbt(args) {
    let decoded;
    const keys = {};
    const network = bitcoinjs_lib_1.networks[args.network];
    const pkHashes = {};
    args.signing_keys.map(k => {
        const key = bitcoinjs_lib_1.ECPair.fromWIF(k, network);
        keys[key.publicKey.toString('hex')] = key;
        pkHashes[hash160(key.publicKey).toString('hex')] = key;
    });
    try {
        decoded = decode_psbt_1.decodePsbt({ psbt: args.psbt });
    }
    catch (err) {
        throw err;
    }
    const tx = bitcoinjs_lib_1.Transaction.fromHex(decoded.unsigned_transaction);
    const signatures = [];
    decoded.inputs.forEach((input, vin) => {
        // Absent bip32 derivations to look for, look in scripts for keys
        if (!input.bip32_derivations) {
            const scripts = [input.redeem_script, input.witness_script];
            // Go through the scripts that match keys and add signatures
            scripts
                .filter(n => !!n)
                .map(n => Buffer.from(n, 'hex'))
                .forEach(n => {
                const buffers = decompile(n).filter(Buffer.isBuffer);
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
                    let sighashType = input.sighash_type;
                    // Witness input spending a witness utxo
                    if (!!input.witness_script && !!n.witness_utxo) {
                        const script = Buffer.from(input.witness_script, 'hex');
                        const tokens = input.witness_utxo.tokens;
                        hashToSign = tx.hashForWitnessV0(vin, script, tokens, sighashType);
                    }
                    if (!!input.witness_script && !!input.redeem_script) {
                        // Nested witness input
                        const nonWitnessUtxo = bitcoinjs_lib_1.Transaction.fromHex(input.non_witness_utxo);
                        const redeemScript = Buffer.from(input.redeem_script, 'hex');
                        const script = Buffer.from(input.witness_script, 'hex');
                        const nestedScriptHash = hash160(redeemScript);
                        const tx = bitcoinjs_lib_1.Transaction.fromHex(decoded.unsigned_transaction);
                        // Find the value for the sigHash in the non-witness utxo
                        const { value } = nonWitnessUtxo.outs.find(n => {
                            return decompile(n.script)
                                .filter(Buffer.isBuffer)
                                .find(n => n.equals(nestedScriptHash));
                        });
                        hashToSign = tx.hashForWitnessV0(vin, script, value, sighashType);
                    }
                    else if (!!input.witness_script && !!input.non_witness_utxo) {
                        const txWithOutputs = bitcoinjs_lib_1.Transaction.fromHex(input.non_witness_utxo);
                        const vout = tx.ins[vin].index;
                        const script = Buffer.from(input.witness_script, 'hex');
                        const tokens = txWithOutputs.outs[vout].value;
                        hashToSign = tx.hashForWitnessV0(vin, script, tokens, sighashType);
                    }
                    else {
                        // Non-witness script
                        const forkId = bitcoinjs_lib_1.networks[args.network].fork_id;
                        const forkMod = parseInt(forkId || 0, hexBase);
                        const redeem = Buffer.from(input.redeem_script, 'hex');
                        const sigHash = input.sighash_type;
                        let tokens;
                        const spendsTx = bitcoinjs_lib_1.Transaction.fromHex(input.non_witness_utxo);
                        if (input.witness_utxo) {
                            tokens = input.witness_utxo.tokens;
                        }
                        else if (input.non_witness_utxo) {
                            tokens = spendsTx.outs[tx.ins[vin].index].value;
                        }
                        sighashType = !forkMod ? sigHash : forkMod | sigHash;
                        const fork = tx.hashForWitnessV0(vin, redeem, tokens, sighashType);
                        const normal = tx.hashForSignature(vin, redeem, sighashType);
                        hashToSign = forkMod ? fork : normal;
                    }
                    if (!hashToSign) {
                        return;
                    }
                    const sig = encode_signature_1.encodeSignature({
                        flag: sighashType,
                        signature: signingKey.sign(hashToSign).toString('hex'),
                    });
                    return signatures.push({
                        vin,
                        hash_type: sighashType,
                        public_key: signingKey.publicKey.toString('hex'),
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
            const sighashType = input.sighash_type;
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
            const signature = encode_signature_1.encodeSignature({
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
    return update_psbt_1.updatePsbt({ signatures, psbt: args.psbt });
}
exports.signPsbt = signPsbt;
