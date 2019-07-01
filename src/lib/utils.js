'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('./typeFields');
function checkForInput(inputs, inputIndex) {
  const input = inputs[inputIndex];
  if (input === undefined) throw new Error(`No input #${inputIndex}`);
  return input;
}
exports.checkForInput = checkForInput;
function checkForOutput(outputs, outputIndex) {
  const output = outputs[outputIndex];
  if (output === undefined) throw new Error(`No output #${outputIndex}`);
  return output;
}
exports.checkForOutput = checkForOutput;
function checkHasKey(checkKeyVal, keyVals, enumLength) {
  if (checkKeyVal.key[0] < enumLength) {
    throw new Error(
      `Use the method for your specific key instead of addKeyVal*`,
    );
  }
  if (keyVals.filter(kv => kv.key.equals(checkKeyVal.key)).length !== 0) {
    throw new Error(`Duplicate Key: ${checkKeyVal.key.toString('hex')}`);
  }
}
exports.checkHasKey = checkHasKey;
function getEnumLength(myenum) {
  let count = 0;
  Object.keys(myenum).forEach(val => {
    if (Number(isNaN(Number(val)))) {
      count++;
    }
  });
  return count;
}
exports.getEnumLength = getEnumLength;
function getTransactionFromGlobalMap(globalMap) {
  const txKeyVals = globalMap.keyVals.filter(
    kv => kv.key[0] === typeFields_1.GlobalTypes.UNSIGNED_TX,
  );
  const len = txKeyVals.length;
  const tx = globalMap.unsignedTx;
  const hasTx = tx !== undefined ? 1 : 0;
  if (len + hasTx !== 1) {
    throw new Error(
      `Extract Transaction: Expected one Transaction, got ${len + hasTx}`,
    );
  }
  return tx !== undefined ? tx : txKeyVals[0].value;
}
exports.getTransactionFromGlobalMap = getTransactionFromGlobalMap;
function inputCheckUncleanFinalized(inputIndex, input) {
  let result = false;
  const isP2SH = !!input.redeemScript;
  const isP2WSH = !!input.witnessScript;
  const isNonSegwit = !!input.nonWitnessUtxo;
  const isSegwit = !!input.witnessUtxo;
  if (isSegwit !== isNonSegwit) {
    const needScriptSig = isNonSegwit || (isSegwit && isP2SH);
    const needWitnessScript = isSegwit && isP2WSH;
    const scriptSigOK = !needScriptSig || !!input.finalScriptSig;
    const witnessScriptOK = !needWitnessScript || !!input.finalScriptWitness;
    result = scriptSigOK && witnessScriptOK;
  }
  if (result === false) {
    throw new Error(
      `Input #${inputIndex} has too much or too little data to clean`,
    );
  }
}
exports.inputCheckUncleanFinalized = inputCheckUncleanFinalized;
function insertTxInGlobalMap(txBuf, globalMap) {
  const txKeyVals = globalMap.keyVals.filter(
    kv => kv.key[0] === typeFields_1.GlobalTypes.UNSIGNED_TX,
  );
  const len = txKeyVals.length;
  const tx = globalMap.unsignedTx;
  const hasTx = tx !== undefined ? 1 : 0;
  if (len + hasTx !== 1) {
    throw new Error(
      `Extract Transaction: Expected one Transaction, got ${len + hasTx}`,
    );
  }
  if (tx !== undefined) globalMap.unsignedTx = txBuf;
  else txKeyVals[0].value = txBuf;
}
exports.insertTxInGlobalMap = insertTxInGlobalMap;
