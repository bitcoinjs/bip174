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
export declare function encodePsbt({ pairs }: {
    pairs: any;
}): {
    psbt: string;
};
