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

function keyValsFromMap(keyValMap: any, converterFactory: any): KeyValue[] {
  const attributes = Object.keys(keyValMap).filter(k => k !== 'keyVals');
  const keyVals = [] as KeyValue[];
  const keyHexes: Set<string> = new Set();
  for (const attrKey of attributes) {
    // We are checking for undefined anyways. So ignore TS error
    // @ts-ignore
    const converter = converterFactory[attrKey];
    if (converter === undefined) continue;
    // @ts-ignore
    const data = keyValMap[attrKey] as any;

    const keyVal = Array.isArray(data)
      ? (data.map(converter.encode) as KeyValue[])
      : (converter.encode(data) as KeyValue);

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
  const otherKeyVals = keyValMap.keyVals.filter((keyVal: KeyValue) => {
    return !keyHexes.has(keyVal.key.toString('hex'));
  });

  return keyVals.concat(otherKeyVals).sort(sortKeyVals);
}

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
  const globalKeyVals = keyValsFromMap(globalMap, convert.globals);
  const inputKeyVals = [] as KeyValue[][];
  const outputKeyVals = [] as KeyValue[][];

  for (const index of range(inputs.length)) {
    const input = inputs[index];
    const _inputKeyVals = keyValsFromMap(input, convert.inputs);
    inputKeyVals.push(_inputKeyVals);
  }

  for (const index of range(outputs.length)) {
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
