'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../../typeFields');
function decode(keyVal) {
  if (keyVal.key[0] !== typeFields_1.InputTypes.SIGHASH_TYPE) {
    throw new Error(
      'Decode Error: could not decode sighashType with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return {
    index: 0,
    data: keyVal.value.readUInt32LE(0),
  };
}
exports.decode = decode;
function encode(data) {
  const key = Buffer.from([typeFields_1.InputTypes.SIGHASH_TYPE]);
  const value = Buffer.allocUnsafe(4);
  value.writeUInt32LE(data.data, 0);
  return {
    key,
    value,
  };
}
exports.encode = encode;
