/// <reference types="node" />
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
export declare function derEncode({ point }: DerEncodePointArg): Buffer;
