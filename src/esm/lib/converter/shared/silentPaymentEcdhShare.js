import * as tools from 'uint8array-tools';
const isValidDERKey = pubkey =>
  (pubkey.length === 33 && [2, 3].includes(pubkey[0])) ||
  (pubkey.length === 65 && 4 === pubkey[0]);
export function makeConverter(TYPE_BYTE, isValidPubkey = isValidDERKey) {
  function decode(keyVal) {
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
  function encode(data) {
    const head = Uint8Array.from([TYPE_BYTE]);
    const key = tools.concat([head, data.scanKey]);
    return {
      key,
      value: data.share,
    };
  }
  const expected = '{ scanKey: Uint8Array; share: Uint8Array; }';
  function check(data) {
    return (
      data.scanKey instanceof Uint8Array &&
      data.share instanceof Uint8Array &&
      isValidPubkey(data.scanKey) &&
      isValidPubkey(data.share)
    );
  }
  function canAddToArray(array, item, dupeSet) {
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
