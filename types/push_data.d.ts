/// <reference types="node" />
/** Get a push data buffer for data to push on the stack

  {
    [data]: <Data to Encode in Push Data Buffer>
    [encode]: <Data to Encode In Push Data Hex String>
  }

  @throws
  <Encode Data As Push Data Error>

  @returns
  <Push Data Buffer>
*/
export declare function pushData({ data, encode }: {
    data: any;
    encode: any;
}): Buffer;
