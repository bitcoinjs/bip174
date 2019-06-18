import { KeyValue } from '../interfaces';

const varuint = require('varuint-bitcoin');
export const range = (n: number): number[] => [...Array(n).keys()];

export function reverseBuffer(buffer: Buffer): Buffer {
  if (buffer.length < 1) return buffer;
  let j = buffer.length - 1;
  let tmp = 0;
  for (let i = 0; i < buffer.length / 2; i++) {
    tmp = buffer[i];
    buffer[i] = buffer[j];
    buffer[j] = tmp;
    j--;
  }
  return buffer;
}

export function keyValsToBuffer(keyVals: KeyValue[]): Buffer {
  const buffers = keyVals.map(keyVal => keyValToBuffer(keyVal));
  buffers.push(Buffer.from([0]));
  return Buffer.concat(buffers);
}

export function keyValToBuffer(keyVal: KeyValue): Buffer {
  const keyLen = keyVal.key.length;
  const valLen = keyVal.value.length;
  const keyVarIntLen = varuint.encodingLength(keyLen);
  const valVarIntLen = varuint.encodingLength(valLen);

  const buffer = Buffer.allocUnsafe(
    keyVarIntLen + keyLen + valVarIntLen + valLen,
  );

  varuint.encode(keyLen, buffer, 0);
  keyVal.key.copy(buffer, keyVarIntLen);
  varuint.encode(valLen, buffer, keyVarIntLen + keyLen);
  keyVal.value.copy(buffer, keyVarIntLen + keyLen + valVarIntLen);

  return buffer;
}
