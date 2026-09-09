'use strict';
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const tools = __importStar(require('uint8array-tools'));
const isValidPubKey = pubkey =>
  pubkey.length === 33 && [2, 3].includes(pubkey[0]);
function makeConverter(TYPE_BYTE, isValidPubkey = isValidPubKey) {
  function decode(keyVal) {
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
  function encode(data) {
    const head = Uint8Array.from([TYPE_BYTE]);
    const key = tools.concat([head, data.scanKey]);
    return {
      key,
      value: data.proof,
    };
  }
  const expected = '{ scanKey: Uint8Array; proof: Uint8Array; }';
  function check(data) {
    return (
      data.scanKey instanceof Uint8Array &&
      data.proof instanceof Uint8Array &&
      isValidPubkey(data.scanKey) &&
      data.proof.length === 64
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
exports.makeConverter = makeConverter;
