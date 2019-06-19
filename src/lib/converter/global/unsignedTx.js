'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const varuint = require('varuint-bitcoin');
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
