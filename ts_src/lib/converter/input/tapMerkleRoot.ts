import { KeyValue, TapMerkleRoot } from '../../interfaces';
import { InputTypes } from '../../typeFields.js';
import * as tools from 'uint8array-tools';

export function decode(keyVal: KeyValue): TapMerkleRoot {
  if (keyVal.key[0] !== InputTypes.TAP_MERKLE_ROOT || keyVal.key.length !== 1) {
    throw new Error(
      'Decode Error: could not decode tapMerkleRoot with key 0x' +
        tools.toHex(keyVal.key),
    );
  }
  if (!check(keyVal.value)) {
    throw new Error('Decode Error: tapMerkleRoot not a 32-byte hash');
  }
  return keyVal.value;
}

export function encode(value: TapMerkleRoot): KeyValue {
  const key = Uint8Array.from([InputTypes.TAP_MERKLE_ROOT]);
  return { key, value };
}

export const expected = 'Uint8Array';
export function check(data: any): data is TapMerkleRoot {
  return data instanceof Uint8Array && data.length === 32;
}

export function canAdd(currentData: any, newData: any): boolean {
  return !!currentData && !!newData && currentData.tapMerkleRoot === undefined;
}
