import { InputTypes } from '../../typeFields.js';
export function decode(keyVal) {
  if (keyVal.key[0] !== InputTypes.POR_COMMITMENT) {
    throw new Error(
      'Decode Error: could not decode porCommitment with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value.toString('utf8');
}
export function encode(data) {
  const key = Buffer.from([InputTypes.POR_COMMITMENT]);
  return {
    key,
    value: Buffer.from(data, 'utf8'),
  };
}
export const expected = 'string';
export function check(data) {
  return typeof data === 'string';
}
export function canAdd(currentData, newData) {
  return !!currentData && !!newData && currentData.porCommitment === undefined;
}
