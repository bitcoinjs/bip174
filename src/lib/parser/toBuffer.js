'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const convert = require('../convert');
const tools_1 = require('../convert/tools');
function psbtToBuffer({ unsignedTx, globalMap, inputs, outputs }) {
  // First parse the global keyVals
  // Since we only support UNSIGNED_TX now, do it manually.
  const unsignedTxKeyVal = convert.globals.unsignedTx.encode(unsignedTx);
  // Get any extra keyvals to pass along
  const otherGlobals = globalMap.keyVals.filter(
    keyVal => !keyVal.key.equals(Buffer.from([0])),
  );
  const globalKeyVals = [unsignedTxKeyVal].concat(otherGlobals);
  // Global buffer of the KeyValue map with a 0x00 at the end
  const globalBuffer = tools_1.keyValsToBuffer(globalKeyVals);
  const inputBuffers = [];
  const outputBuffers = [];
  for (const index of tools_1.range(inputs.length)) {
    const input = inputs[index];
    const attributes = Object.keys(input).filter(k => k !== 'keyVals');
    const keyVals = [];
    const keyHexes = new Set();
    for (const attrKey of attributes.sort()) {
      // We are checking for undefined anyways. So ignore TS error
      // @ts-ignore
      const converter = convert.inputs[attrKey];
      if (converter === undefined) continue;
      // @ts-ignore
      const data = input[attrKey];
      const keyVal = Array.isArray(data)
        ? data.map(converter.encode)
        : converter.encode(data);
      if (Array.isArray(keyVal)) {
        keyVals.push(...keyVal);
        const hexes = keyVal.map(kv => kv.key.toString('hex'));
        hexes.forEach(hex => {
          if (keyHexes.has(hex))
            throw new Error('Serialize Error: Duplicate key: ' + hex);
          keyHexes.add(hex);
        });
      } else {
        keyVals.push(keyVal);
        const hex = keyVal.key.toString('hex');
        if (keyHexes.has(hex))
          throw new Error('Serialize Error: Duplicate key: ' + hex);
        keyHexes.add(hex);
      }
    }
    // Get other keyVals that have not yet been gotten
    const otherInputKeyVals = input.keyVals.filter(keyVal => {
      return !keyHexes.has(keyVal.key.toString('hex'));
    });
    const inputKeyVals = keyVals.concat(otherInputKeyVals);
    const isEmpty = inputKeyVals.length === 0;
    // buffer of the KeyValue map with a 0x00 at the end for one input
    if (isEmpty) {
      inputBuffers.push(Buffer.from([0]));
    } else {
      inputBuffers.push(tools_1.keyValsToBuffer(inputKeyVals));
    }
  }
  for (const index of tools_1.range(outputs.length)) {
    const output = outputs[index];
    const attributes = Object.keys(output).filter(k => k !== 'keyVals');
    const keyVals = [];
    const keyHexes = new Set();
    for (const attrKey of attributes.sort()) {
      // We are checking for undefined anyways. So ignore TS error
      // @ts-ignore
      const converter = convert.outputs[attrKey];
      if (converter === undefined) continue;
      // @ts-ignore
      const data = output[attrKey];
      const keyVal = Array.isArray(data)
        ? data.map(converter.encode)
        : converter.encode(data);
      if (Array.isArray(keyVal)) {
        keyVals.push(...keyVal);
        const hexes = keyVal.map(kv => kv.key.toString('hex'));
        hexes.forEach(hex => {
          if (keyHexes.has(hex))
            throw new Error('Serialize Error: Duplicate key: ' + hex);
          keyHexes.add(hex);
        });
      } else {
        keyVals.push(keyVal);
        const hex = keyVal.key.toString('hex');
        if (keyHexes.has(hex))
          throw new Error('Serialize Error: Duplicate key: ' + hex);
        keyHexes.add(hex);
      }
    }
    // Get other keyVals that have not yet been gotten
    const otherOutputKeyVals = output.keyVals.filter(keyVal => {
      return !keyHexes.has(keyVal.key.toString('hex'));
    });
    const outputKeyVals = keyVals.concat(otherOutputKeyVals);
    const isEmpty = outputKeyVals.length === 0;
    // buffer of the KeyValue map with a 0x00 at the end for one output
    if (isEmpty) {
      outputBuffers.push(Buffer.from([0]));
    } else {
      outputBuffers.push(tools_1.keyValsToBuffer(outputKeyVals));
    }
  }
  if (inputBuffers.length === 0) inputBuffers.push(Buffer.from([0]));
  if (outputBuffers.length === 0) outputBuffers.push(Buffer.from([0]));
  return Buffer.concat(
    [Buffer.from('70736274ff', 'hex'), globalBuffer].concat(
      inputBuffers,
      outputBuffers,
    ),
  );
}
exports.psbtToBuffer = psbtToBuffer;
