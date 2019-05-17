interface Output {
    script: string;
    tokens: number;
}
interface Utxo {
    id: string;
    sequence?: number;
    vout: number;
}
export interface CreatePsbtsInput {
    outputs: Output[];
    utxos: Utxo[];
    timelock?: number;
    version?: number;
}
export interface CreatePsbtsOutput {
    psbt: string;
}
/** Create a PSBT

  {
    outputs: [{
      script: <Output ScriptPub Hex String>
      tokens: <Sending Tokens Number>
    }]
    utxos: [{
      id: <Transaction Id Hex String>
      [sequence]: <Sequence Number>
      vout: <Output Index Number>
    }]
    [timelock]: <Set Lock Time on Transaction To Number>
    [version]: <Transaction Version Number>
  }

  @returns
  {
    psbt: <Partially Signed Bitcoin Transaction Hex Encoded String>
  }
*/
export declare function createPsbt({ outputs, timelock, utxos, version, }: CreatePsbtsInput): CreatePsbtsOutput;
export {};
