const bip66 = require('bip66');

import { fromDer } from './from_der';

const sigHashByteLength: number = 1;

export interface DecodeSignatureInput {
  signature: Buffer;
}

export interface DecodeSignatureOutput {
  hash_type: number;
  signature: Buffer;
}

/** Decode signature

  {
    signature: <Signature Buffer Object>
  }

  @returns
  {
    hash_type: <Hash Type Number>
    signature: <Signature Buffer Object>
  }
*/
export function decodeSignature({
  signature,
}: DecodeSignatureInput): DecodeSignatureOutput {
  if (!Buffer.isBuffer(signature)) {
    throw new Error('ExpectedSignatureBufferToDecode');
  }

  const buffer = signature;

  const hashType = buffer.readUInt8(buffer.length - sigHashByteLength);

  const decode = bip66.decode(buffer.slice(0, -sigHashByteLength));

  const r = fromDer({ x: decode.r });
  const s = fromDer({ x: decode.s });

  return { hash_type: hashType, signature: Buffer.concat([r, s], 64) };
}
