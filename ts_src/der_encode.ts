const zero: Buffer = Buffer.from('00', 'hex');

export interface DerEncodePointArg {
  point: string;
}

/** DER encode bytes to eliminate sign confusion in a big-endian number.

  {
    point: <Point Hex String>
  }

  @return
  <Encoded Point Buffer>
*/
export function derEncode({ point }: DerEncodePointArg): Buffer {
  let i: number = 0;
  let x: Buffer = Buffer.from(point, 'hex');

  while (x[i] === 0) {
    ++i;
  }

  if (i === x.length) {
    return zero;
  }

  x = x.slice(i);

  if (x[0] & 0x80) {
    return Buffer.concat([zero, x], x.length + 1);
  } else {
    return x;
  }
}
