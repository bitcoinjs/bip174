import { OP_EQUAL, OP_HASH160 } from 'bitcoin-ops';

import { checkWitnessVersion } from './check_witness_version';
import { script } from 'bitcoinjs-lib';
const { decompile } = script;

const nestedScriptPubElementsLen: number = 3;
const p2pkhHashByteLength: number = 20;
const p2shHashByteLength: number = 20;
const p2wshHashByteLength: number = 32;
const witnessScriptPubElementsLen: number = 2;

export interface CheckWitnessUtxoInput {
  hash: Buffer;
  redeem: string;
  script: string;
}

/** Check that an input's witness UTXO is valid

  {
    hash: <Witness Script Hash Buffer Object>
    [redeem]: <Redeem Script Hex String>
    [script]: <Witness UTXO Script PubKey Hex String>
  }

  @throws
  <Error>
*/
export function checkWitnessUtxo({
  hash,
  redeem,
  script,
}: CheckWitnessUtxoInput) {
  if (!script) {
    throw new Error('ExpectedScriptInWitnessUtxoCheck');
  }

  const redeemScript: Buffer | null = !redeem
    ? null
    : Buffer.from(redeem, 'hex');
  const scriptPub: Buffer = Buffer.from(script, 'hex');

  const decompiledScriptPub = decompile(scriptPub);

  switch (decompiledScriptPub.length) {
    case nestedScriptPubElementsLen:
      const [hash160, nestedScriptHash, isEqual] = decompiledScriptPub;

      if (hash160 !== OP_HASH160) {
        throw new Error('ExpectedHash160ForNestedWitnessScriptPub');
      }

      if (nestedScriptHash.length !== p2shHashByteLength) {
        throw new Error('UnexpectedHashLengthForNestedWitnessScriptPub');
      }

      if (isEqual !== OP_EQUAL) {
        throw new Error('UnexpectedOpCodeForNestedWitnessScriptPub');
      }

      if (!hash || !redeem) {
        break;
      }

      {
        const [version, redeemScriptHash, extra] = decompile(redeemScript);

        try {
          checkWitnessVersion({ version });
        } catch (err) {
          throw err;
        }

        if (extra) {
          throw new Error('UnexpectedElementInWitnessRedeemScript');
        }

        if (!redeemScriptHash.equals(hash)) {
          throw new Error('InvalidRedeemScriptHashForWitnessScript');
        }
      }
      break;

    case witnessScriptPubElementsLen:
      const [version, scriptHash] = decompiledScriptPub;

      try {
        checkWitnessVersion({ version });
      } catch (err) {
        throw err;
      }

      switch (scriptHash.length) {
        case p2pkhHashByteLength:
        case p2wshHashByteLength:
          break;

        default:
          throw new Error('InvalidScriptHashLengthForWitnessScriptPub');
      }
      break;

    default:
      throw new Error('ExpectedWitnessScriptPubForWitnessUtxo');
  }
}
