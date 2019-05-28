/// <reference types="node" />
export interface XObject {
    x: Buffer;
}
/** Get from DER

  {
    x: <Buffer Object>
  }

  @returns
  <Buffer Object>
*/
export declare function fromDer({ x }: XObject): Buffer;
