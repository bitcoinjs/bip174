import { InputTypes } from '../../typeFields.js';
export function decode(keyVal) {
  if (keyVal.key[0] !== InputTypes.FINAL_SCRIPTSIG) {
    throw new Error(
      'Decode Error: could not decode finalScriptSig with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}
export function encode(data) {
  const key = Buffer.from([InputTypes.FINAL_SCRIPTSIG]);
  return {
    key,
    value: data,
  };
}
export const expected = 'Buffer';
export function check(data) {
  return Buffer.isBuffer(data);
}
export function canAdd(currentData, newData) {
  return !!currentData && !!newData && currentData.finalScriptSig === undefined;
}
