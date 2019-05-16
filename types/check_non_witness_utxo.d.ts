/// <reference types="node" />
export interface CheckNonWitnessUtxoInput {
    hash: Buffer;
    utxo: Buffer;
}
/** Check that an input's non witness utxo is valid

  {
    hash: <Input Redeem Script RIPEMD160 Hash Buffer Object>
    utxo: <Non-Witness UTXO Transaction Buffer Object>
  }

  @throws
  <RedeemScriptDoesNotMatchUtxo Error>
*/
export declare function checkNonWitnessUtxo({ hash, utxo }: CheckNonWitnessUtxoInput): void;
