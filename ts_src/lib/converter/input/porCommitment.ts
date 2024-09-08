import { KeyValue, PorCommitment } from '../../interfaces';
import { InputTypes } from '../../typeFields.js';
import * as tools from 'uint8array-tools';

export function decode(keyVal: KeyValue): PorCommitment {
  if (keyVal.key[0] !== InputTypes.POR_COMMITMENT) {
    throw new Error(
      'Decode Error: could not decode porCommitment with key 0x' +
        tools.toHex(keyVal.key),
    );
  }
  return tools.toUtf8(keyVal.value);
}

export function encode(data: PorCommitment): KeyValue {
  const key = new Uint8Array([InputTypes.POR_COMMITMENT]);
  return {
    key,
    value: tools.fromUtf8(data),
  };
}

export const expected = 'string';
export function check(data: any): data is PorCommitment {
  return typeof data === 'string';
}

export function canAdd(currentData: any, newData: any): boolean {
  return !!currentData && !!newData && currentData.porCommitment === undefined;
}
