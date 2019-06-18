'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const bitcoinjs_lib_1 = require('bitcoinjs-lib');
const typeFields_1 = require('../../typeFields');
function decode(keyVal) {
  if (keyVal.key[0] !== typeFields_1.GlobalTypes.UNSIGNED_TX) {
    throw new Error(
      'Decode Error: could not decode unsignedTx with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  let unsignedTx;
  try {
    unsignedTx = bitcoinjs_lib_1.Transaction.fromBuffer(keyVal.value);
  } catch (err) {
    throw new Error('Decode Error: Error parsing Transaction: ' + err.message);
  }
  return unsignedTx;
}
exports.decode = decode;
function encode(tx, stripInputs = true) {
  let newTx;
  if (stripInputs) {
    newTx = tx.clone();
    newTx.ins.forEach(input => {
      input.script = Buffer.from([]);
      input.witness = [];
    });
  } else {
    newTx = tx;
  }
  return {
    key: Buffer.from([typeFields_1.GlobalTypes.UNSIGNED_TX]),
    value: newTx.toBuffer(),
  };
}
exports.encode = encode;
