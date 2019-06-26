'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../../typeFields');
const tools_1 = require('../tools');
const varuint = require('../varint');
function decode(keyVal) {
  if (keyVal.key[0] !== typeFields_1.GlobalTypes.UNSIGNED_TX) {
    throw new Error(
      'Decode Error: could not decode redeemScript with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}
exports.decode = decode;
function encode(data) {
  const key = Buffer.from([typeFields_1.GlobalTypes.UNSIGNED_TX]);
  return {
    key,
    value: data,
  };
}
exports.encode = encode;
function getInputOutputCounts(txBuffer) {
  // Skip version(4)
  let offset = 4;
  checkSegwit(txBuffer, offset);
  const parsedIn = parseInputs(txBuffer, offset);
  const { inputCount } = parsedIn;
  ({ offset } = parsedIn);
  const outputCount = varuint.decode(txBuffer, offset);
  return {
    inputCount,
    outputCount,
  };
}
exports.getInputOutputCounts = getInputOutputCounts;
function inputToBuffer(input) {
  const result = Buffer.allocUnsafe(41);
  const prevHash = Buffer.isBuffer(input.hash)
    ? input.hash
    : tools_1.reverseBuffer(Buffer.from(input.hash, 'hex'));
  if (prevHash.length !== 32)
    throw new Error('TransactionInput hash must be 32 bytes');
  prevHash.copy(result, 0);
  result.writeUInt32LE(input.index, 32);
  result.writeUInt8(0, 36);
  const sequence = input.sequence || 0xffffffff;
  result.writeUInt32LE(sequence, 37);
  return result;
}
function isTransactionInput(data) {
  return (
    (typeof data.hash === 'string' || Buffer.isBuffer(data.hash)) &&
    typeof data.index === 'number' &&
    (data.sequence === undefined || typeof data.sequence === 'number')
  );
}
exports.isTransactionInput = isTransactionInput;
function addInput(input, txBuffer) {
  // Skip version(4)
  let offset = 4;
  checkSegwit(txBuffer, offset);
  const parsed = parseInputs(txBuffer, offset);
  const { inputCount, startInputs, endInputs } = parsed;
  ({ offset } = parsed);
  const newInputLenByteLen = varuint.encodingLength(inputCount + 1);
  const versionBuf = txBuffer.slice(0, 4);
  const inputsBuf = txBuffer.slice(startInputs, endInputs);
  const restOfTxBuf = txBuffer.slice(endInputs);
  const newTxBuf = Buffer.allocUnsafe(
    4 + newInputLenByteLen + inputsBuf.length + 41 + restOfTxBuf.length,
  );
  offset = 0;
  versionBuf.copy(newTxBuf, offset);
  offset += versionBuf.length;
  varuint.encode(inputCount + 1, newTxBuf, offset);
  offset += newInputLenByteLen;
  inputsBuf.copy(newTxBuf, offset);
  offset += inputsBuf.length;
  const newInputBuf = inputToBuffer(input);
  newInputBuf.copy(newTxBuf, offset);
  offset += newInputBuf.length;
  restOfTxBuf.copy(newTxBuf, offset);
  return newTxBuf;
}
exports.addInput = addInput;
function outputToBuffer(output) {
  const varLen = varuint.encodingLength(output.script.length);
  const result = Buffer.allocUnsafe(8 + varLen + output.script.length);
  tools_1.writeUInt64LE(result, output.value, 0);
  varuint.encode(output.script.length, result, 8);
  output.script.copy(result, 8 + varLen);
  return result;
}
function isTransactionOutput(data) {
  return Buffer.isBuffer(data.script) && typeof data.value === 'number';
}
exports.isTransactionOutput = isTransactionOutput;
function addOutput(output, txBuffer) {
  // Skip version(4)
  let offset = 4;
  checkSegwit(txBuffer, offset);
  const parsedIn = parseInputs(txBuffer, offset);
  const { endInputs } = parsedIn;
  ({ offset } = parsedIn);
  const parsedOut = parseOutputs(txBuffer, offset);
  const { outputCount, startOutputs, endOutputs } = parsedOut;
  ({ offset } = parsedOut);
  const newOutputLenByteLen = varuint.encodingLength(outputCount + 1);
  const versionAndInputs = txBuffer.slice(0, endInputs);
  const outputsBuf = txBuffer.slice(startOutputs, endOutputs);
  const restOfTxBuf = txBuffer.slice(endOutputs);
  const newOutputBuf = outputToBuffer(output);
  const newTxBuf = Buffer.allocUnsafe(
    versionAndInputs.length +
      newOutputLenByteLen +
      outputsBuf.length +
      newOutputBuf.length +
      restOfTxBuf.length,
  );
  offset = 0;
  versionAndInputs.copy(newTxBuf, offset);
  offset += versionAndInputs.length;
  varuint.encode(outputCount + 1, newTxBuf, offset);
  offset += newOutputLenByteLen;
  outputsBuf.copy(newTxBuf, offset);
  offset += outputsBuf.length;
  newOutputBuf.copy(newTxBuf, offset);
  offset += newOutputBuf.length;
  restOfTxBuf.copy(newTxBuf, offset);
  return newTxBuf;
}
exports.addOutput = addOutput;
function parseInputs(txBuffer, offset) {
  const inputCount = varuint.decode(txBuffer, offset);
  const oldInputLenByteLen = varuint.encodingLength(inputCount);
  offset += oldInputLenByteLen;
  const startInputs = offset;
  let countDown = inputCount;
  while (countDown > 0) {
    offset = checkAndSkipInput(txBuffer, offset);
    countDown--;
  }
  const endInputs = offset;
  return {
    startInputs,
    endInputs,
    offset,
    inputCount,
    oldInputLenByteLen,
  };
}
function parseOutputs(txBuffer, offset) {
  const outputCount = varuint.decode(txBuffer, offset);
  const oldOutputLenByteLen = varuint.encodingLength(outputCount);
  offset += oldOutputLenByteLen;
  const startOutputs = offset;
  let countDown = outputCount;
  while (countDown > 0) {
    offset = checkAndSkipOutput(txBuffer, offset);
    countDown--;
  }
  const endOutputs = offset;
  return {
    startOutputs,
    endOutputs,
    offset,
    outputCount,
    oldOutputLenByteLen,
  };
}
function checkAndSkipInput(txBuffer, offset) {
  if (txBuffer[offset + 36] !== 0) {
    throw new Error('Format Error: Transaction ScriptSigs are not empty');
  }
  // hash(32) + vout(4) + varint of 0 (1) + sequence(4)
  offset += 41;
  return offset;
}
function checkAndSkipOutput(txBuffer, offset) {
  const scriptLen = varuint.decode(txBuffer, offset + 8);
  const varintLen = varuint.encodingLength(scriptLen);
  // satoshis(8) + scriptLenVarInty(x) + script(y)
  offset += 8 + varintLen + scriptLen;
  return offset;
}
function checkSegwit(txBuffer, offset) {
  // Has segwit marker and flag byte
  if (txBuffer[offset] === 0 && txBuffer[offset + 1] > 0) {
    throw new Error(
      'Format Error: Transaction must not be segwit serialization.\n' +
        'This error also appears if the transaction has no inputs but ' +
        'has outputs. (Since it looks like the marker and flag byte)\n' +
        'To override this error, please implement a Transaction ' +
        'input/output count getter, and passing it in.',
    );
  }
}
