import { SilentPaymentDleq, KeyValue } from '../../interfaces';
import * as tools from 'uint8array-tools';

const isValidPubKey = (pubkey: Uint8Array): boolean =>
  pubkey.length === 33 && [2, 3].includes(pubkey[0]);

export function makeConverter(
  TYPE_BYTE: number,
  isValidPubkey = isValidPubKey,
): {
  decode: (keyVal: KeyValue) => SilentPaymentDleq;
  encode: (data: SilentPaymentDleq) => KeyValue;
  check: (data: any) => data is SilentPaymentDleq;
  expected: string;
  canAddToArray: (
    array: SilentPaymentDleq[],
    item: SilentPaymentDleq,
    dupeSet: Set<string>,
  ) => boolean;
} {
  function decode(keyVal: KeyValue): SilentPaymentDleq {
    if (keyVal.key[0] !== TYPE_BYTE) {
      throw new Error(
        'Decode Error: could not decode silentPaymentDleq with key 0x' +
          tools.toHex(keyVal.key),
      );
    }
    const scanKey = keyVal.key.slice(1);
    if (!isValidPubkey(scanKey)) {
      throw new Error(
        'Decode Error: silentPaymentDleq has invalid scanKey in key 0x' +
          tools.toHex(keyVal.key),
      );
    }
    if (keyVal.value.length !== 64) {
      throw new Error('Decode Error: silentPaymentDleq not a 64-byte proof');
    }
    return {
      scanKey,
      proof: keyVal.value,
    };
  }

  function encode(data: SilentPaymentDleq): KeyValue {
    const head = Uint8Array.from([TYPE_BYTE]);
    const key = tools.concat([head, data.scanKey]);

    return {
      key,
      value: data.proof,
    };
  }

  const expected = '{ scanKey: Uint8Array; proof: Uint8Array; }';
  function check(data: any): data is SilentPaymentDleq {
    return (
      data.scanKey instanceof Uint8Array &&
      data.proof instanceof Uint8Array &&
      isValidPubkey(data.scanKey) &&
      data.proof.length === 64
    );
  }

  function canAddToArray(
    array: SilentPaymentDleq[],
    item: SilentPaymentDleq,
    dupeSet: Set<string>,
  ): boolean {
    const dupeString = tools.toHex(item.scanKey);
    if (dupeSet.has(dupeString)) return false;
    dupeSet.add(dupeString);
    return (
      array.filter(v => tools.compare(v.scanKey, item.scanKey) === 0).length ===
      0
    );
  }

  return {
    decode,
    encode,
    check,
    expected,
    canAddToArray,
  };
}
