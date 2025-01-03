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
const typeFields_js_1 = require('../../typeFields.cjs');
const tools = __importStar(require('uint8array-tools'));
const isValidPubKey = pubkey =>
  pubkey.length === 33 && [2, 3].includes(pubkey[0]);
function decode(keyVal) {
  if (keyVal.key[0] !== typeFields_js_1.OutputTypes.SP_V0_INFO) {
    throw new Error(
      'Decode Error: could not decode silentPaymentV0Info with key 0x' +
        tools.toHex(keyVal.key),
    );
  }
  if (keyVal.value.length !== 66) {
    throw new Error('Decode Error: SP_V0_INFO is not proper length');
  }
  const scanKey = keyVal.value.slice(0, 33);
  if (!isValidPubKey(scanKey)) {
    throw new Error('Decode Error: SP_V0_INFO scanKey is not a valid pubkey');
  }
  const spendKey = keyVal.value.slice(33);
  if (!isValidPubKey(spendKey)) {
    throw new Error('Decode Error: SP_V0_INFO spendKey is not a valid pubkey');
  }
  return {
    scanKey,
    spendKey,
  };
}
exports.decode = decode;
function encode(data) {
  const key = new Uint8Array([typeFields_js_1.OutputTypes.SP_V0_INFO]);
  return {
    key,
    value: Uint8Array.from([...data.scanKey, ...data.spendKey]),
  };
}
exports.encode = encode;
exports.expected = '{ scanKey: Uint8Array; spendKey: Uint8Array; }';
function check(data) {
  return (
    data.scanKey instanceof Uint8Array &&
    data.spendKey instanceof Uint8Array &&
    isValidPubKey(data.scanKey) &&
    isValidPubKey(data.spendKey)
  );
}
exports.check = check;
function canAdd(currentData, newData) {
  return (
    !!currentData && !!newData && currentData.silentPaymentV0Info === undefined
  );
}
exports.canAdd = canAdd;
