/** Update a PSBT

  {
    [additional_attributes]: [{
      type: <Type Hex String>
      value: <Value Hex String>
      vin: <Input Index Number>
      vout: <Output Index Number>
    }]
    [bip32_derivations]: [{
      fingerprint: <BIP 32 Fingerprint of Parent's Key Hex String>
      path: <BIP 32 Derivation Path String>
      public_key: <Public Key String>
    }]
    psbt: <BIP 174 Encoded PSBT String>
    [redeem_scripts]: [<Hex Encoded Redeem Script String>]
    [sighashes]: [{
      id: <Transaction Id String>
      sighash: <Sighash Flag Number>
      vout: <Spending Output Index Number>
    }]
    [signatures]: [{
      vin: <Signature Input Index Number>
      hash_type: <Signature Hash Type Number>
      public_key: <BIP 32 Public Key String>
      signature: <Signature Hex String>
    }]
    [transactions]: [<Hex Encoding Transaction String>]
    [witness_scripts]: [<Witness Script String>]
  }

  @throws
  <Update PSBT Error>

  @returns
  {
    psbt: <Hex Encoded Partially Signed Bitcoin Transaction String>
  }
*/
export declare function updatePsbt(args: any): {
    psbt: string;
};
