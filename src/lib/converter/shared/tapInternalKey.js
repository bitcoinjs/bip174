'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function makeConverter(TYPE_BYTE) {
  function decode(keyVal) {
    if (keyVal.key[0] !== TYPE_BYTE || keyVal.key.length !== 1) {
      throw new Error(
        'Decode Error: could not decode tapInternalKey with key 0x' +
          keyVal.key.toString('hex'),
      );
    }
    if (keyVal.value.length !== 32) {
      throw new Error(
        'Decode Error: tapInternalKey not a 32-byte x-only pubkey',
      );
    }
    return keyVal.value;
  }
  function encode(value) {
    const key = Buffer.from([TYPE_BYTE]);
    return { key, value };
  }
  const expected = 'Buffer';
  function check(data) {
    return Buffer.isBuffer(data) && data.length === 32;
  }
  function canAdd(currentData, newData) {
    return (
      !!currentData && !!newData && currentData.tapInternalKey === undefined
    );
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAdd,
  };
}
exports.makeConverter = makeConverter;
