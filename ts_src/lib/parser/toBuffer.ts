import * as convert from '../convert';
import { keyValsToBuffer, range } from '../convert/tools';
import { KeyValue } from '../interfaces';
import { PsbtAttributes } from './index';

const sortKeyVals = (_a: KeyValue, _b: KeyValue): number => {
  const a = _a.key.toString('hex');
  const b = _b.key.toString('hex');
  if (a < b) return -1;
  else if (a > b) return 1;
  else return 0;
};

export function psbtToBuffer({
  unsignedTx,
  globalMap,
  inputs,
  outputs,
}: PsbtAttributes): Buffer {
  // First parse the global keyVals
  // Since we only support UNSIGNED_TX now, do it manually.
  const unsignedTxKeyVal = convert.globals.unsignedTx.encode(unsignedTx);
  // Get any extra keyvals to pass along
  const otherGlobals = globalMap.keyVals.filter(
    keyVal => !keyVal.key.equals(Buffer.from([0])),
  );
  const globalKeyVals = [unsignedTxKeyVal]
    .concat(otherGlobals)
    .sort(sortKeyVals);
  // Global buffer of the KeyValue map with a 0x00 at the end
  const globalBuffer: Buffer = keyValsToBuffer(globalKeyVals);
  const inputBuffers = [] as Buffer[];
  const outputBuffers = [] as Buffer[];

  for (const index of range(inputs.length)) {
    const input = inputs[index];
    const attributes = Object.keys(input).filter(k => k !== 'keyVals');
    const keyVals = [] as KeyValue[];
    const keyHexes: Set<string> = new Set();
    for (const attrKey of attributes.sort()) {
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

    const inputKeyVals = keyVals.concat(otherInputKeyVals).sort(sortKeyVals);
    const isEmpty = inputKeyVals.length === 0;
    // buffer of the KeyValue map with a 0x00 at the end for one input
    if (isEmpty) {
      inputBuffers.push(Buffer.from([0]));
    } else {
      inputBuffers.push(keyValsToBuffer(inputKeyVals));
    }
  }

  for (const index of range(outputs.length)) {
    const output = outputs[index];
    const attributes = Object.keys(output).filter(k => k !== 'keyVals');
    const keyVals = [] as KeyValue[];
    const keyHexes: Set<string> = new Set();
    for (const attrKey of attributes.sort()) {
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

    const outputKeyVals = keyVals.concat(otherOutputKeyVals).sort(sortKeyVals);
    const isEmpty = outputKeyVals.length === 0;
    // buffer of the KeyValue map with a 0x00 at the end for one output
    if (isEmpty) {
      outputBuffers.push(Buffer.from([0]));
    } else {
      outputBuffers.push(keyValsToBuffer(outputKeyVals));
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
