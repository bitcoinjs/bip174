/// <reference types="node" />
export interface CheckWitnessUtxoInput {
    hash: Buffer;
    redeem: string;
    script: string;
}
/** Check that an input's witness UTXO is valid

  {
    hash: <Witness Script Hash Buffer Object>
    [redeem]: <Redeem Script Hex String>
    [script]: <Witness UTXO Script PubKey Hex String>
  }

  @throws
  <Error>
*/
export declare function checkWitnessUtxo({ hash, redeem, script, }: CheckWitnessUtxoInput): void;
