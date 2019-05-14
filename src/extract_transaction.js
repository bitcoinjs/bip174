"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BN = require("bn.js");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const { decompile } = bitcoinjs_lib_1.script;
const decode_psbt_1 = require("./decode_psbt");
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
function extractTransaction({ psbt }) {
    let decoded;
    try {
        decoded = decode_psbt_1.decodePsbt({ psbt });
    }
    catch (err) {
        throw err;
    }
    const tx = bitcoinjs_lib_1.Transaction.fromHex(decoded.unsigned_transaction);
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
exports.extractTransaction = extractTransaction;
