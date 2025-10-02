import { SilentPaymentEcdhShare, KeyValue } from '../../interfaces';
import * as tools from 'uint8array-tools';

const isValidDERKey = (pubkey: Uint8Array): boolean =>
  (pubkey.length === 33 && [2, 3].includes(pubkey[0])) ||
  (pubkey.length === 65 && 4 === pubkey[0]);

export function makeConverter(
  TYPE_BYTE: number,
  isValidPubkey = isValidDERKey,
): {
  decode: (keyVal: KeyValue) => SilentPaymentEcdhShare;
  encode: (data: SilentPaymentEcdhShare) => KeyValue;
  check: (data: any) => data is SilentPaymentEcdhShare;
  expected: string;
  canAddToArray: (
    array: SilentPaymentEcdhShare[],
    item: SilentPaymentEcdhShare,
    dupeSet: Set<string>,
  ) => boolean;
} {
  function decode(keyVal: KeyValue): SilentPaymentEcdhShare {
    if (keyVal.key[0] !== TYPE_BYTE) {
      throw new Error(
        'Decode Error: could not decode silentPaymentEcdhShare with key 0x' +
          tools.toHex(keyVal.key),
      );
    }
    const scanKey = keyVal.key.slice(1);
    if (!isValidPubkey(scanKey)) {
      throw new Error(
        'Decode Error: silentPaymentEcdhShare has invalid scanKey in key 0x' +
          tools.toHex(keyVal.key),
      );
    }
    if (!isValidPubkey(keyVal.value)) {
      throw new Error(
        'Decode Error: silentPaymentEcdhShare not a 33-byte pubkey',
      );
    }
    return {
      scanKey,
      share: keyVal.value,
    };
  }

  function encode(data: SilentPaymentEcdhShare): KeyValue {
    const head = Uint8Array.from([TYPE_BYTE]);
    const key = tools.concat([head, data.scanKey]);

    return {
      key,
      value: data.share,
    };
  }

  const expected = '{ scanKey: Uint8Array; share: Uint8Array; }';
  function check(data: any): data is SilentPaymentEcdhShare {
    return (
      data.scanKey instanceof Uint8Array &&
      data.share instanceof Uint8Array &&
      isValidPubkey(data.scanKey) &&
      isValidPubkey(data.share)
    );
  }

  function canAddToArray(
    array: SilentPaymentEcdhShare[],
    item: SilentPaymentEcdhShare,
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
