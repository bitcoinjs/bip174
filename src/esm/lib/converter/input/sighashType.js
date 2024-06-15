import { InputTypes } from '../../typeFields.js';
export function decode(keyVal) {
  if (keyVal.key[0] !== InputTypes.SIGHASH_TYPE) {
    throw new Error(
      'Decode Error: could not decode sighashType with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value.readUInt32LE(0);
}
export function encode(data) {
  const key = Buffer.from([InputTypes.SIGHASH_TYPE]);
  const value = Buffer.allocUnsafe(4);
  value.writeUInt32LE(data, 0);
  return {
    key,
    value,
  };
}
export const expected = 'number';
export function check(data) {
  return typeof data === 'number';
}
export function canAdd(currentData, newData) {
  return !!currentData && !!newData && currentData.sighashType === undefined;
}
