import { KeyValue, RedeemScript } from '../../interfaces';
import * as tools from 'uint8array-tools';

export function makeConverter(
  TYPE_BYTE: number,
): {
  decode: (keyVal: KeyValue) => RedeemScript;
  encode: (data: RedeemScript) => KeyValue;
  check: (data: any) => data is RedeemScript;
  expected: string;
  canAdd: (currentData: any, newData: any) => boolean;
} {
  function decode(keyVal: KeyValue): RedeemScript {
    if (keyVal.key[0] !== TYPE_BYTE) {
      throw new Error(
        'Decode Error: could not decode redeemScript with key 0x' +
          tools.toHex(keyVal.key),
      );
    }
    return keyVal.value;
  }

  function encode(data: RedeemScript): KeyValue {
    const key = Uint8Array.from([TYPE_BYTE]);
    return {
      key,
      value: data,
    };
  }

  const expected = 'Uint8Array';
  function check(data: any): data is RedeemScript {
    return data instanceof Uint8Array;
  }

  function canAdd(currentData: any, newData: any): boolean {
    return !!currentData && !!newData && currentData.redeemScript === undefined;
  }
  return {
    decode,
    encode,
    check,
    expected,
    canAdd,
  };
}
