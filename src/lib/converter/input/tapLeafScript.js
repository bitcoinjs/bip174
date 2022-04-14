'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../../typeFields');
function decode(keyVal) {
  if (keyVal.key[0] !== typeFields_1.InputTypes.TAP_LEAF_SCRIPT) {
    throw new Error(
      'Decode Error: could not decode tapLeafScript with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if ((keyVal.key.length - 2) % 32 !== 0) {
    throw new Error(
      'Decode Error: tapLeafScript has invalid control block in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const leafVersion = keyVal.value[keyVal.value.length - 1];
  if ((keyVal.key[1] & 0xfe) !== leafVersion) {
    throw new Error(
      'Decode Error: tapLeafScript bad leaf version in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const script = keyVal.value.slice(0, -1);
  const controlBlock = keyVal.key.slice(1);
  return { controlBlock, script, leafVersion };
}
exports.decode = decode;
function encode(tScript) {
  const head = Buffer.from([typeFields_1.InputTypes.TAP_LEAF_SCRIPT]);
  const verBuf = Buffer.from([tScript.leafVersion]);
  return {
    key: Buffer.concat([head, tScript.controlBlock]),
    value: Buffer.concat([tScript.script, verBuf]),
  };
}
exports.encode = encode;
exports.expected =
  '{ controlBlock: Buffer; leafVersion: number, script: Buffer; }';
function check(data) {
  return (
    Buffer.isBuffer(data.controlBlock) &&
    (data.controlBlock.length - 1) % 32 === 0 &&
    (data.controlBlock[0] & 0xfe) === data.leafVersion &&
    Buffer.isBuffer(data.script)
  );
}
exports.check = check;
function canAddToArray(array, item, dupeSet) {
  const dupeString = item.controlBlock.toString('hex');
  if (dupeSet.has(dupeString)) return false;
  dupeSet.add(dupeString);
  return (
    array.filter(v => v.controlBlock.equals(item.controlBlock)).length === 0
  );
}
exports.canAddToArray = canAddToArray;
