import * as convert from '../converter/index.js';
import { keyValsToBuffer } from '../converter/tools.js';
import { KeyValue, PsbtGlobal, PsbtInput, PsbtOutput } from '../interfaces';
import { PsbtAttributes } from './index.js';
import * as tools from 'uint8array-tools';

export function psbtToBuffer({
  globalMap,
  inputs,
  outputs,
}: PsbtAttributes): Uint8Array {
  const { globalKeyVals, inputKeyVals, outputKeyVals } = psbtToKeyVals({
    globalMap,
    inputs,
    outputs,
  });

  const globalBuffer = keyValsToBuffer(globalKeyVals);

  const keyValsOrEmptyToBuffer = (keyVals: KeyValue[][]): Uint8Array[] =>
    keyVals.length === 0
      ? [Uint8Array.from([0])]
      : keyVals.map(keyValsToBuffer);

  const inputBuffers = keyValsOrEmptyToBuffer(inputKeyVals);
  const outputBuffers = keyValsOrEmptyToBuffer(outputKeyVals);

  const header = new Uint8Array(5);
  header.set([0x70, 0x73, 0x62, 0x74, 0xff], 0);
  return tools.concat(
    [header, globalBuffer].concat(inputBuffers, outputBuffers),
  );
}

const sortKeyVals = (a: KeyValue, b: KeyValue): number => {
  return tools.compare(a.key, b.key);
};

function keyValsFromMap(
  keyValMap: PsbtGlobal | PsbtInput | PsbtOutput,
  converterFactory: any,
): KeyValue[] {
  const keyHexSet: Set<string> = new Set();

  const keyVals = Object.entries(keyValMap).reduce((result, [key, value]) => {
    if (key === 'unknownKeyVals') return result;
    // We are checking for undefined anyways. So ignore TS error
    // @ts-ignore
    const converter = converterFactory[key];
    if (converter === undefined) return result;

    const encodedKeyVals = (Array.isArray(value) ? value : [value]).map(
      converter.encode,
    ) as KeyValue[];

    const keyHexes = encodedKeyVals.map(kv => tools.toHex(kv.key));
    keyHexes.forEach(hex => {
      if (keyHexSet.has(hex))
        throw new Error('Serialize Error: Duplicate key: ' + hex);
      keyHexSet.add(hex);
    });

    return result.concat(encodedKeyVals);
  }, [] as KeyValue[]);

  // Get other keyVals that have not yet been gotten
  const otherKeyVals = keyValMap.unknownKeyVals
    ? keyValMap.unknownKeyVals.filter((keyVal: KeyValue) => {
        return !keyHexSet.has(tools.toHex(keyVal.key));
      })
    : [];

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
  return {
    globalKeyVals: keyValsFromMap(globalMap, convert.globals),
    inputKeyVals: inputs.map(i => keyValsFromMap(i, convert.inputs)),
    outputKeyVals: outputs.map(o => keyValsFromMap(o, convert.outputs)),
  };
}
