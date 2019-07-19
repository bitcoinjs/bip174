'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const convert = require('../converter');
const tools_1 = require('../converter/tools');
function psbtToBuffer({ globalMap, inputs, outputs }) {
  const { globalKeyVals, inputKeyVals, outputKeyVals } = psbtToKeyVals({
    globalMap,
    inputs,
    outputs,
  });
  const globalBuffer = tools_1.keyValsToBuffer(globalKeyVals);
  const keyValsOrEmptyToBuffer = keyVals =>
    keyVals.length === 0
      ? [Buffer.from([0])]
      : keyVals.map(tools_1.keyValsToBuffer);
  const inputBuffers = keyValsOrEmptyToBuffer(inputKeyVals);
  const outputBuffers = keyValsOrEmptyToBuffer(outputKeyVals);
  const header = Buffer.allocUnsafe(5);
  header.writeUIntBE(0x70736274ff, 0, 5);
  return Buffer.concat(
    [header, globalBuffer].concat(inputBuffers, outputBuffers),
  );
}
exports.psbtToBuffer = psbtToBuffer;
const sortKeyVals = (a, b) => {
  return a.key.compare(b.key);
};
function keyValsFromMap(keyValMap, converterFactory) {
  const attributes = Object.keys(keyValMap).filter(k => k !== 'unknownKeyVals');
  const keyVals = [];
  const keyHexes = new Set();
  for (const attrKey of attributes) {
    // We are checking for undefined anyways. So ignore TS error
    // @ts-ignore
    const converter = converterFactory[attrKey];
    if (converter === undefined) continue;
    // @ts-ignore
    const data = keyValMap[attrKey];
    const keyVal = Array.isArray(data)
      ? data.map(converter.encode)
      : converter.encode(data);
    if (Array.isArray(keyVal)) {
      const hexes = keyVal.map(kv => kv.key.toString('hex'));
      hexes.forEach(hex => {
        if (keyHexes.has(hex))
          throw new Error('Serialize Error: Duplicate key: ' + hex);
        keyHexes.add(hex);
      });
      keyVals.push(...keyVal);
    } else {
      const hex = keyVal.key.toString('hex');
      if (keyHexes.has(hex))
        throw new Error('Serialize Error: Duplicate key: ' + hex);
      keyHexes.add(hex);
      keyVals.push(keyVal);
    }
  }
  // Get other keyVals that have not yet been gotten
  const otherKeyVals = keyValMap.unknownKeyVals
    ? keyValMap.unknownKeyVals.filter(keyVal => {
        return !keyHexes.has(keyVal.key.toString('hex'));
      })
    : [];
  return keyVals.concat(otherKeyVals).sort(sortKeyVals);
}
function psbtToKeyVals({ globalMap, inputs, outputs }) {
  // First parse the global keyVals
  // Get any extra keyvals to pass along
  const globalKeyVals = keyValsFromMap(globalMap, convert.globals);
  const inputKeyVals = [];
  const outputKeyVals = [];
  for (const index of tools_1.range(inputs.length)) {
    const input = inputs[index];
    const _inputKeyVals = keyValsFromMap(input, convert.inputs);
    inputKeyVals.push(_inputKeyVals);
  }
  for (const index of tools_1.range(outputs.length)) {
    const output = outputs[index];
    const _outputKeyVals = keyValsFromMap(output, convert.outputs);
    outputKeyVals.push(_outputKeyVals);
  }
  return {
    globalKeyVals,
    inputKeyVals,
    outputKeyVals,
  };
}
exports.psbtToKeyVals = psbtToKeyVals;
