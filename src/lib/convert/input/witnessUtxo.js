'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../../typeFields');
const tools_1 = require('../tools');
const varuint = require('varuint-bitcoin');
function decode(keyVal) {
  if (keyVal.key[0] !== typeFields_1.InputTypes.WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode witnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const valBuf = keyVal.value.slice(0, 8);
  const revBuf = tools_1.reverseBuffer(Buffer.from(valBuf));
  const value = parseInt(revBuf.toString('hex'), 16);
  let _offset = 8;
  const scriptLen = varuint.decode(keyVal.value, _offset);
  _offset += varuint.encodingLength(scriptLen);
  const script = keyVal.value.slice(_offset);
  if (script.length !== scriptLen) {
    throw new Error('Decode Error: WITNESS_UTXO script is not proper length');
  }
  return {
    index: 0,
    data: {
      script,
      value,
    },
  };
}
exports.decode = decode;
function encode(data) {
  const { script, value } = data.data;
  const varintLen = varuint.encodingLength(script.length);
  const valueBuf = Buffer.from(
    ('0'.repeat(16) + value.toString(16)).slice(-16),
    'hex',
  );
  const reversed = tools_1.reverseBuffer(valueBuf);
  const result = Buffer.allocUnsafe(8 + varintLen + script.length);
  reversed.copy(result, 0);
  varuint.encode(script.length, result, 8);
  script.copy(result, 8 + varintLen);
  return {
    key: Buffer.from([typeFields_1.InputTypes.WITNESS_UTXO]),
    value: result,
  };
}
exports.encode = encode;
