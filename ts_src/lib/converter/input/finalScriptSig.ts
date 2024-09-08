import { FinalScriptSig, KeyValue } from '../../interfaces';
import { InputTypes } from '../../typeFields.js';
import * as tools from 'uint8array-tools';

export function decode(keyVal: KeyValue): FinalScriptSig {
  if (keyVal.key[0] !== InputTypes.FINAL_SCRIPTSIG) {
    throw new Error(
      'Decode Error: could not decode finalScriptSig with key 0x' +
        tools.toHex(keyVal.key),
    );
  }
  return keyVal.value;
}

export function encode(data: FinalScriptSig): KeyValue {
  const key = new Uint8Array([InputTypes.FINAL_SCRIPTSIG]);
  return {
    key,
    value: data,
  };
}

export const expected = 'Uint8Array';
export function check(data: any): data is FinalScriptSig {
  return data instanceof Uint8Array;
}

export function canAdd(currentData: any, newData: any): boolean {
  return !!currentData && !!newData && currentData.finalScriptSig === undefined;
}
