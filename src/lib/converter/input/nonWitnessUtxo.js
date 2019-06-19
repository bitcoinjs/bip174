'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const bitcoinjs_lib_1 = require('bitcoinjs-lib');
const typeFields_1 = require('../../typeFields');
function decode(keyVal) {
  if (keyVal.key[0] !== typeFields_1.InputTypes.NON_WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode nonWitnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  try {
    return bitcoinjs_lib_1.Transaction.fromBuffer(keyVal.value);
  } catch (err) {
    throw new Error(
      'Decode Error: Error parsing NON_WITNESS_UTXO: ' + err.message,
    );
  }
}
exports.decode = decode;
function encode(data) {
  return {
    key: Buffer.from([typeFields_1.InputTypes.NON_WITNESS_UTXO]),
    value: data.toBuffer(),
  };
}
exports.encode = encode;
