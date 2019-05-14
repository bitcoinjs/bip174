/// <reference types="node" />
/** Encode a signature

  {
    flag: <Signature Hash Flag Number>
    signature: <Signature Hex String>
  }

  @returns
  <Encoded Signature Buffer>
*/
export declare function encodeSignature({ flag, signature }: {
    flag: any;
    signature: any;
}): Buffer;
