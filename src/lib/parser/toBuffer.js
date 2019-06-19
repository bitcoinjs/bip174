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
  const inputBuffers = [];
  const outputBuffers = [];
  inputKeyVals.forEach(input => {
    inputBuffers.push(tools_1.keyValsToBuffer(input));
  });
  outputKeyVals.forEach(output => {
    outputBuffers.push(tools_1.keyValsToBuffer(output));
  });
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
const sortKeyVals = (_a, _b) => {
  const a = _a.key.toString('hex');
  const b = _b.key.toString('hex');
  if (a < b) return -1;
  else if (a > b) return 1;
  else return 0;
};
function psbtToKeyVals({ globalMap, inputs, outputs }) {
  // First parse the global keyVals
  // Get any extra keyvals to pass along
  const globalKeyVals = globalMap.keyVals.sort(sortKeyVals);
  const inputKeyVals = [];
  const outputKeyVals = [];
  for (const index of tools_1.range(inputs.length)) {
    const input = inputs[index];
    const attributes = Object.keys(input).filter(k => k !== 'keyVals');
    const keyVals = [];
    const keyHexes = new Set();
    for (const attrKey of attributes) {
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
    const _inputKeyVals = keyVals.concat(otherInputKeyVals).sort(sortKeyVals);
    inputKeyVals.push(_inputKeyVals);
  }
  for (const index of tools_1.range(outputs.length)) {
    const output = outputs[index];
    const attributes = Object.keys(output).filter(k => k !== 'keyVals');
    const keyVals = [];
    const keyHexes = new Set();
    for (const attrKey of attributes) {
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
    const _outputKeyVals = keyVals.concat(otherOutputKeyVals).sort(sortKeyVals);
    outputKeyVals.push(_outputKeyVals);
  }
  return {
    globalKeyVals,
    inputKeyVals,
    outputKeyVals,
  };
}
exports.psbtToKeyVals = psbtToKeyVals;
