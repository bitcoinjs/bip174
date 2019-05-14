/** Finalize the inputs of a PSBT
  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }

  @throws
  <Finalize PSBT Error>

  @returns
  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }
*/
export declare function finalizePsbt({ psbt }: {
    psbt: any;
}): {
    psbt: string;
};
