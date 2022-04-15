'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const varuint = require('../varint');
const bip32Derivation = require('./bip32Derivation');
const isValidBIP340Key = pubkey => pubkey.length === 32;
function makeConverter(TYPE_BYTE) {
  const parent = bip32Derivation.makeConverter(TYPE_BYTE, isValidBIP340Key);
  function decode(keyVal) {
    const nHashes = varuint.decode(keyVal.value);
    const nHashesLen = varuint.encodingLength(nHashes);
    const base = parent.decode({
      key: keyVal.key,
      value: keyVal.value.slice(nHashesLen + nHashes * 32),
    });
    const leafHashes = new Array(nHashes);
    for (let i = 0, _offset = nHashesLen; i < nHashes; i++, _offset += 32) {
      leafHashes[i] = keyVal.value.slice(_offset, _offset + 32);
    }
    return Object.assign({}, base, { leafHashes });
  }
  function encode(data) {
    const base = parent.encode(data);
    const nHashesLen = varuint.encodingLength(data.leafHashes.length);
    const nHashesBuf = Buffer.allocUnsafe(nHashesLen);
    varuint.encode(data.leafHashes.length, nHashesBuf);
    const value = Buffer.concat([nHashesBuf, ...data.leafHashes, base.value]);
    return Object.assign({}, base, { value });
  }
  const expected =
    '{ ' +
    'masterFingerprint: Buffer; ' +
    'pubkey: Buffer; ' +
    'path: string; ' +
    'leafHashes: Buffer[]; ' +
    '}';
  function check(data) {
    return (
      Array.isArray(data.leafHashes) &&
      data.leafHashes.every(
        leafHash => Buffer.isBuffer(leafHash) && leafHash.length === 32,
      ) &&
      parent.check(data)
    );
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAddToArray: parent.canAddToArray,
  };
}
exports.makeConverter = makeConverter;
