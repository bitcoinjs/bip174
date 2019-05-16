"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_ops_1 = require("bitcoin-ops");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const { decompile } = bitcoinjs_lib_1.script;
const p2shHashByteLength = 20;
/** Check that an input's non witness utxo is valid

  {
    hash: <Input Redeem Script RIPEMD160 Hash Buffer Object>
    script: <Input Redeem Script Buffer Object>
    utxo: <Non-Witness UTXO Transaction Buffer Object>
  }

  @throws
  <RedeemScriptDoesNotMatchUtxo Error>
*/
function checkNonWitnessUtxo({ hash, script, utxo, }) {
    const scriptPubHashes = bitcoinjs_lib_1.Transaction.fromBuffer(utxo).outs.map(out => {
        // It's expected that the scriptPub be a normal P2SH script
        const [hash160, scriptHash, isEqual, extra] = decompile(out.script);
        if (hash160 !== bitcoin_ops_1.OP_HASH160) {
            return null;
        }
        if (scriptHash.length !== p2shHashByteLength) {
            return null;
        }
        if (isEqual !== bitcoin_ops_1.OP_EQUAL) {
            return null;
        }
        if (extra) {
            return null;
        }
        return scriptHash;
    });
    // Make sure the p2sh script hashes has a hash that matches the input
    if (!scriptPubHashes.find(h => !!h && h.equals(hash))) {
        throw new Error('RedeemScriptDoesNotMatchUtxo');
    }
}
exports.checkNonWitnessUtxo = checkNonWitnessUtxo;
