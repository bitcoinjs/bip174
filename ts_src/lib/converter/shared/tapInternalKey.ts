import { KeyValue, TapInternalKey } from '../../interfaces';
import * as tools from 'uint8array-tools';

export function makeConverter(
  TYPE_BYTE: number,
): {
  decode: (keyVal: KeyValue) => TapInternalKey;
  encode: (data: TapInternalKey) => KeyValue;
  check: (data: any) => data is TapInternalKey;
  expected: string;
  canAdd: (currentData: any, newData: any) => boolean;
} {
  function decode(keyVal: KeyValue): TapInternalKey {
    if (keyVal.key[0] !== TYPE_BYTE || keyVal.key.length !== 1) {
      throw new Error(
        'Decode Error: could not decode tapInternalKey with key 0x' +
          tools.toHex(keyVal.key),
      );
    }
    if (keyVal.value.length !== 32) {
      throw new Error(
        'Decode Error: tapInternalKey not a 32-byte x-only pubkey',
      );
    }
    return keyVal.value;
  }

  function encode(value: TapInternalKey): KeyValue {
    const key = Uint8Array.from([TYPE_BYTE]);
    return { key, value };
  }

  const expected = 'Uint8Array';
  function check(data: any): data is TapInternalKey {
    return data instanceof Uint8Array && data.length === 32;
  }

  function canAdd(currentData: any, newData: any): boolean {
    return (
      !!currentData && !!newData && currentData.tapInternalKey === undefined
    );
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAdd,
  };
}
