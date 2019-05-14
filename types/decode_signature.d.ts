/// <reference types="node" />
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
export declare function decodeSignature({ signature }: {
    signature: any;
}): {
    hash_type: number;
    signature: Buffer;
};
