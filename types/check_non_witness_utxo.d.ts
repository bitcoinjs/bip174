/// <reference types="node" />
export interface CheckNonWitnessUtxoInput {
    hash: Buffer;
    script: Buffer;
    utxo: Buffer;
}
/** Check that an input's non witness utxo is valid

  {
    hash: <Input Redeem Script RIPEMD160 Hash Buffer Object>
    script: <Input Redeem Script Buffer Object>
    utxo: <Non-Witness UTXO Transaction Buffer Object>
  }

  @throws
  <RedeemScriptDoesNotMatchUtxo Error>
*/
export declare function checkNonWitnessUtxo({ hash, script, utxo, }: CheckNonWitnessUtxoInput): void;
