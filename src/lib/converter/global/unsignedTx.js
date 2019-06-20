'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tools_1 = require('../tools');
const varuint = require('../varint');
function getInputOutputCounts(txBuffer) {
  // Skip version(4)
  let offset = 4;
  function checkAndSkipInput() {
    if (txBuffer[offset + 36] !== 0) {
      throw new Error('Format Error: Transaction ScriptSigs are not empty');
    }
    // hash(32) + vout(4) + varint of 0 (1) + sequence(4)
    offset += 41;
  }
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
  const inputCount = varuint.decode(txBuffer, offset);
  offset += varuint.encodingLength(inputCount);
  let countDown = inputCount;
  while (countDown > 0) {
    checkAndSkipInput();
    countDown--;
  }
  const outputCount = varuint.decode(txBuffer, offset);
  return {
    inputCount,
    outputCount,
  };
}
exports.getInputOutputCounts = getInputOutputCounts;
function inputToBuffer(input) {
  const result = Buffer.allocUnsafe(41);
  const prevHash = tools_1.reverseBuffer(Buffer.from(input.hashHex, 'hex'));
  prevHash.copy(result, 0);
  result.writeUInt32LE(input.index, 32);
  result.writeUInt8(0, 36);
  const sequence = input.sequence || 0xffffffff;
  result.writeUInt32LE(sequence, 37);
  return result;
}
function addInput(input, txBuffer) {
  // Skip version(4)
  let offset = 4;
  function checkAndSkipInput() {
    if (txBuffer[offset + 36] !== 0) {
      throw new Error('Format Error: Transaction ScriptSigs are not empty');
    }
    // hash(32) + vout(4) + varint of 0 (1) + sequence(4)
    offset += 41;
  }
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
  const inputCount = varuint.decode(txBuffer, offset);
  const oldInputLenByteLen = varuint.encodingLength(inputCount);
  offset += oldInputLenByteLen;
  const startInputs = offset;
  let countDown = inputCount;
  while (countDown > 0) {
    checkAndSkipInput();
    countDown--;
  }
  const endInputs = offset;
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
  const satBuf = tools_1.reverseBuffer(
    Buffer.from(
      ('0000000000000000' + output.value.toString(16)).slice(-16),
      'hex',
    ),
  );
  satBuf.copy(result, 0);
  varuint.encode(output.script.length, result, 8);
  output.script.copy(result, 8 + varLen);
  return result;
}
function addOutput(output, txBuffer) {
  // Skip version(4)
  let offset = 4;
  function checkAndSkipInput() {
    if (txBuffer[offset + 36] !== 0) {
      throw new Error('Format Error: Transaction ScriptSigs are not empty');
    }
    // hash(32) + vout(4) + varint of 0 (1) + sequence(4)
    offset += 41;
  }
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
  const inputCount = varuint.decode(txBuffer, offset);
  offset += varuint.encodingLength(inputCount);
  let countDown = inputCount;
  while (countDown > 0) {
    checkAndSkipInput();
    countDown--;
  }
  const endInputs = offset;
  const outputCount = varuint.decode(txBuffer, offset);
  const oldOutputLenByteLen = varuint.encodingLength(outputCount);
  offset += oldOutputLenByteLen;
  const startOutputs = offset;
  countDown = outputCount;
  while (countDown > 0) {
    checkAndSkipInput();
    countDown--;
  }
  const endOutputs = offset;
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
