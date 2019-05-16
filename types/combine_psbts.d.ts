/** Combine multiple PSBTs
  {
    psbts: [<BIP 174 Encoded PSBT Hex String>]
  }
  @throws
  <Combine PSBT Error>

  @returns
  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }
*/
export declare function combinePsbts({ psbts }: {
    psbts: any;
}): {
    psbt: string;
};