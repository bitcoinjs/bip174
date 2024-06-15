import { InputTypes } from '../../typeFields.js';
export function decode(keyVal) {
  if (keyVal.key[0] !== InputTypes.NON_WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode nonWitnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}
export function encode(data) {
  return {
    key: Buffer.from([InputTypes.NON_WITNESS_UTXO]),
    value: data,
  };
}
export const expected = 'Buffer';
export function check(data) {
  return Buffer.isBuffer(data);
}
export function canAdd(currentData, newData) {
  return !!currentData && !!newData && currentData.nonWitnessUtxo === undefined;
}
