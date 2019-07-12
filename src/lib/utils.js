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
      `Use the method for your specific key instead of addUnknownKeyVal*`,
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
function addInputAttributes(psbt, data) {
  const inputIndex = psbt.inputs.length - 1;
  for (const name of typeFields_1.INPUT_TYPE_NAMES) {
    const item = data[name];
    if (item) {
      const nameUpper = name.replace(/^\S/, s => s.toUpperCase());
      // @ts-ignore
      psbt[`add${nameUpper}ToInput`](inputIndex, item);
    }
  }
}
exports.addInputAttributes = addInputAttributes;
function addOutputAttributes(psbt, data) {
  const outputIndex = psbt.outputs.length - 1;
  for (const name of typeFields_1.OUTPUT_TYPE_NAMES) {
    const item = data[name];
    if (item) {
      const nameUpper = name.replace(/^\S/, s => s.toUpperCase());
      // @ts-ignore
      psbt[`add${nameUpper}ToOutput`](outputIndex, item);
    }
  }
}
exports.addOutputAttributes = addOutputAttributes;
function defaultVersionSetter(version, txBuf) {
  if (!Buffer.isBuffer(txBuf) || txBuf.length < 4) {
    throw new Error('Set Version: Invalid Transaction');
  }
  txBuf.writeUInt32LE(version, 0);
  return txBuf;
}
exports.defaultVersionSetter = defaultVersionSetter;
function defaultLocktimeSetter(locktime, txBuf) {
  if (!Buffer.isBuffer(txBuf) || txBuf.length < 4) {
    throw new Error('Set Locktime: Invalid Transaction');
  }
  txBuf.writeUInt32LE(locktime, txBuf.length - 4);
  return txBuf;
}
exports.defaultLocktimeSetter = defaultLocktimeSetter;
