import { OutputTypes } from '../../typeFields.js';
import * as tools from 'uint8array-tools';
export function decode(keyVal) {
  if (keyVal.key[0] !== OutputTypes.SP_V0_LABEL) {
    throw new Error(
      'Decode Error: could not decode silentPaymentOutputLabel with key 0x' +
        tools.toHex(keyVal.key),
    );
  }
  return Number(tools.readUInt32(keyVal.value, 0, 'LE'));
}
export function encode(data) {
  const key = Uint8Array.from([OutputTypes.SP_V0_LABEL]);
  const value = new Uint8Array(4);
  tools.writeUInt32(value, 0, data, 'LE');
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
  return (
    !!currentData &&
    !!newData &&
    currentData.silentPaymentOutputLabel === undefined
  );
}
