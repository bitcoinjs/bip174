const { encode } = require('bip66');

import { derEncode } from './der_encode';

const pointSize: number = 32;

export interface EncodeSignatureInput {
  flag: number;
  signature: string;
}

/** Encode a signature

  {
    flag: <Signature Hash Flag Number>
    signature: <Signature Hex String>
  }

  @returns
  <Encoded Signature Buffer>
*/
export function encodeSignature({
  flag,
  signature,
}: EncodeSignatureInput): Buffer {
  const hashType = Buffer.from([flag]);
  const sEnd = pointSize + pointSize;
  const sig = Buffer.from(signature, 'hex');

  const r = derEncode({ point: sig.slice(0, pointSize).toString('hex') });
  const s = derEncode({ point: sig.slice(pointSize, sEnd).toString('hex') });

  return Buffer.concat([encode(r, s), hashType]);
}
