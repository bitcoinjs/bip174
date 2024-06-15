import { InputTypes } from '../../typeFields.js';
export function decode(keyVal) {
  if (keyVal.key[0] !== InputTypes.TAP_KEY_SIG || keyVal.key.length !== 1) {
    throw new Error(
      'Decode Error: could not decode tapKeySig with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (!check(keyVal.value)) {
    throw new Error(
      'Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature',
    );
  }
  return keyVal.value;
}
export function encode(value) {
  const key = Buffer.from([InputTypes.TAP_KEY_SIG]);
  return { key, value };
}
export const expected = 'Buffer';
export function check(data) {
  return Buffer.isBuffer(data) && (data.length === 64 || data.length === 65);
}
export function canAdd(currentData, newData) {
  return !!currentData && !!newData && currentData.tapKeySig === undefined;
}
