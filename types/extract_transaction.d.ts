export interface ExtractTransactionInput {
    psbt: string;
}
export interface ExtractTransactionOutput {
    transaction: string;
}
/** Extract a transaction from a finalized PSBT

  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }

  @throws
  <Extract Transaction Error>

  @returns
  {
    transaction: <Hex Serialized Transaction String>
  }
*/
export declare function extractTransaction({ psbt, }: ExtractTransactionInput): ExtractTransactionOutput;
