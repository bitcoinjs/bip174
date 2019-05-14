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
export declare function createPsbt({ outputs, timelock, utxos, version }: {
    outputs: any;
    timelock: any;
    utxos: any;
    version: any;
}): {
    psbt: string;
};
