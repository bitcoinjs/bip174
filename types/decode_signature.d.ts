/// <reference types="node" />
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
export declare function decodeSignature({ signature, }: DecodeSignatureInput): DecodeSignatureOutput;
