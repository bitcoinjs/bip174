/// <reference types="node" />
/** DER encode bytes to eliminate sign confusion in a big-endian number.

  {
    point: <Point Hex String>
  }

  @return
  <Encoded Point Buffer>
*/
export declare function derEncode({ point }: {
    point: any;
}): Buffer;
