export interface SignPsbtInput {
    network: string;
    psbt: string;
    signing_keys: string[];
}
export interface SignPsbtOutput {
    psbt: string;
}
/** Update a PSBT with signatures

  {
    network: <Network Name String>
    psbt: <BIP 174 Encoded PSBT Hex String>
    signing_keys: [<WIF Encoded Private Key String>]
  }

  @throws
  <Sign PSBT Error>

  @returns
  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }
*/
export declare function signPsbt(args: SignPsbtInput): SignPsbtOutput;
