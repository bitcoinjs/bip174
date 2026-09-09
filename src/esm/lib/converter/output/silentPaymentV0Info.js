import { OutputTypes } from '../../typeFields.js';
import * as tools from 'uint8array-tools';
const isValidPubKey = pubkey =>
  pubkey.length === 33 && [2, 3].includes(pubkey[0]);
export function decode(keyVal) {
  if (keyVal.key[0] !== OutputTypes.SP_V0_INFO) {
    throw new Error(
      'Decode Error: could not decode silentPaymentV0Info with key 0x' +
        tools.toHex(keyVal.key),
    );
  }
  if (keyVal.value.length !== 66) {
    throw new Error('Decode Error: SP_V0_INFO is not proper length');
  }
  const scanKey = keyVal.value.slice(0, 33);
  if (!isValidPubKey(scanKey)) {
    throw new Error('Decode Error: SP_V0_INFO scanKey is not a valid pubkey');
  }
  const spendKey = keyVal.value.slice(33);
  if (!isValidPubKey(spendKey)) {
    throw new Error('Decode Error: SP_V0_INFO spendKey is not a valid pubkey');
  }
  return {
    scanKey,
    spendKey,
  };
}
export function encode(data) {
  const key = new Uint8Array([OutputTypes.SP_V0_INFO]);
  return {
    key,
    value: Uint8Array.from([...data.scanKey, ...data.spendKey]),
  };
}
export const expected = '{ scanKey: Uint8Array; spendKey: Uint8Array; }';
export function check(data) {
  return (
    data.scanKey instanceof Uint8Array &&
    data.spendKey instanceof Uint8Array &&
    isValidPubKey(data.scanKey) &&
    isValidPubKey(data.spendKey)
  );
}
export function canAdd(currentData, newData) {
  return (
    !!currentData && !!newData && currentData.silentPaymentV0Info === undefined
  );
}
