import * as convert from '../converter';
import { keyValsToBuffer, range } from '../converter/tools';
import { KeyValue } from '../interfaces';
import { PsbtAttributes } from './index';

export function psbtToBuffer({
  globalMap,
  inputs,
  outputs,
}: PsbtAttributes): Buffer {
  const { globalKeyVals, inputKeyVals, outputKeyVals } = psbtToKeyVals({
    globalMap,
    inputs,
    outputs,
  });
  const globalBuffer = keyValsToBuffer(globalKeyVals);
  const inputBuffers = [] as Buffer[];
  const outputBuffers = [] as Buffer[];
  inputKeyVals.forEach(input => {
    inputBuffers.push(keyValsToBuffer(input));
  });
  outputKeyVals.forEach(output => {
    outputBuffers.push(keyValsToBuffer(output));
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

const sortKeyVals = (_a: KeyValue, _b: KeyValue): number => {
  const a = _a.key.toString('hex');
  const b = _b.key.toString('hex');
  if (a < b) return -1;
  else if (a > b) return 1;
  else return 0;
};

export function psbtToKeyVals({
  globalMap,
  inputs,
  outputs,
}: PsbtAttributes): {
  globalKeyVals: KeyValue[];
  inputKeyVals: KeyValue[][];
  outputKeyVals: KeyValue[][];
} {
  // First parse the global keyVals
  // Get any extra keyvals to pass along
  const globalKeyVals = globalMap.keyVals.sort(sortKeyVals);
  const inputKeyVals = [] as KeyValue[][];
  const outputKeyVals = [] as KeyValue[][];

  for (const index of range(inputs.length)) {
    const input = inputs[index];
    const attributes = Object.keys(input).filter(k => k !== 'keyVals');
    const keyVals = [] as KeyValue[];
    const keyHexes: Set<string> = new Set();
    for (const attrKey of attributes) {
      // We are checking for undefined anyways. So ignore TS error
      // @ts-ignore
      const converter = convert.inputs[attrKey];
      if (converter === undefined) continue;
      // @ts-ignore
      const data = input[attrKey] as any;

      const keyVal = Array.isArray(data)
        ? (data.map(converter.encode) as KeyValue[])
        : (converter.encode(data) as KeyValue);

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

  for (const index of range(outputs.length)) {
    const output = outputs[index];
    const attributes = Object.keys(output).filter(k => k !== 'keyVals');
    const keyVals = [] as KeyValue[];
    const keyHexes: Set<string> = new Set();
    for (const attrKey of attributes) {
      // We are checking for undefined anyways. So ignore TS error
      // @ts-ignore
      const converter = convert.outputs[attrKey];
      if (converter === undefined) continue;
      // @ts-ignore
      const data = output[attrKey] as any;

      const keyVal = Array.isArray(data)
        ? (data.map(converter.encode) as KeyValue[])
        : (converter.encode(data) as KeyValue);

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
