import { KeyValue, NonWitnessUtxo } from '../../interfaces';
import { InputTypes } from '../../typeFields.js';
import * as tools from 'uint8array-tools';

export function decode(keyVal: KeyValue): NonWitnessUtxo {
  if (keyVal.key[0] !== InputTypes.NON_WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode nonWitnessUtxo with key 0x' +
        tools.toHex(keyVal.key),
    );
  }
  return keyVal.value;
}

export function encode(data: NonWitnessUtxo): KeyValue {
  return {
    key: new Uint8Array([InputTypes.NON_WITNESS_UTXO]),
    value: data,
  };
}

export const expected = 'Uint8Array';
export function check(data: any): data is NonWitnessUtxo {
  return data instanceof Uint8Array;
}

export function canAdd(currentData: any, newData: any): boolean {
  return !!currentData && !!newData && currentData.nonWitnessUtxo === undefined;
}
