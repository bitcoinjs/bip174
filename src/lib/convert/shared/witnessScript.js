'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function makeConverter(TYPE_BYTE) {
  return {
    decode,
    encode,
  };
  function decode(keyVal) {
    if (keyVal.key[0] !== TYPE_BYTE) {
      throw new Error(
        'Decode Error: could not decode witnessScript with key 0x' +
          keyVal.key.toString('hex'),
      );
    }
    return {
      index: 0,
      data: keyVal.value,
    };
  }
  function encode(data) {
    const key = Buffer.from([TYPE_BYTE]);
    return {
      key,
      value: data.data,
    };
  }
}
exports.makeConverter = makeConverter;
