/// <reference types="node" />
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
export declare function encodeSignature({ flag, signature, }: EncodeSignatureInput): Buffer;
