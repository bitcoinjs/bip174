import * as BN from 'bn.js';
import { script, Transaction } from 'bitcoinjs-lib';
const { decompile } = script;

import { decodePsbt } from './decode_psbt';

const decBase = 10;

/** Extract a transaction from a finalized PSBT

  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }

  @throws
  <Extract Transaction Error>

  @returns
  {
    transaction: <Hex Serialized Transaction String>
  }
*/
export function extractTransaction({ psbt }) {
  let decoded;

  try {
    decoded = decodePsbt({ psbt });
  } catch (err) {
    throw err;
  }

  const tx = Transaction.fromHex(decoded.unsigned_transaction);

  decoded.inputs.forEach((n, vin) => {
    if (!n.final_scriptsig && !n.final_scriptwitness) {
      throw new Error('ExpectedFinalScriptSigsAndWitnesses');
    }

    if (n.final_scriptsig) {
      tx.setInputScript(vin, Buffer.from(n.final_scriptsig, 'hex'));
    }

    if (n.final_scriptwitness) {
      const finalScriptWitness = Buffer.from(n.final_scriptwitness, 'hex');

      const witnessElements = decompile(finalScriptWitness).map(n => {
        if (!n) {
          return Buffer.from([]);
        }

        if (Buffer.isBuffer(n)) {
          return n;
        }

        return new BN(n, decBase).toArrayLike(Buffer);
      });

      tx.setWitness(vin, decompile(witnessElements));
    }
  });

  return { transaction: tx.toHex() };
}
