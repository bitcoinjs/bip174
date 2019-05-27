/// <reference types="node" />
export interface EncodePsbtInput {
    pairs: {
        separator?: boolean;
        type?: Buffer;
        value?: Buffer;
    }[];
}
export interface EncodePsbtOutput {
    psbt: string;
}
/** Encode a Partially Signed Bitcoin Transaction

  {
    pairs: [{
      [separator]: <Is Separator Bool>
      [type]: <Type Buffer Object>
      [value]: <Value Buffer Object>
    }]
  }

  @throws
  <Failed To Encode Error>

  @returns
  {
    psbt: <Hex Encoded Partially Signed Bitcoin Transaction String>
  }
*/
export declare function encodePsbt({ pairs }: EncodePsbtInput): EncodePsbtOutput;
