import { InputTypes } from '../../typeFields.js';
export function decode(keyVal) {
  if (keyVal.key[0] !== InputTypes.TAP_MERKLE_ROOT || keyVal.key.length !== 1) {
    throw new Error(
      'Decode Error: could not decode tapMerkleRoot with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (!check(keyVal.value)) {
    throw new Error('Decode Error: tapMerkleRoot not a 32-byte hash');
  }
  return keyVal.value;
}
export function encode(value) {
  const key = Buffer.from([InputTypes.TAP_MERKLE_ROOT]);
  return { key, value };
}
export const expected = 'Buffer';
export function check(data) {
  return Buffer.isBuffer(data) && data.length === 32;
}
export function canAdd(currentData, newData) {
  return !!currentData && !!newData && currentData.tapMerkleRoot === undefined;
}
