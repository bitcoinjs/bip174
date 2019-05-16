/// <reference types="node" />
export interface Bip32DerivationInput {
    derivation: Buffer;
    key: Buffer;
}
export interface Bip32DerivationOutput {
    fingerprint: string;
    path: string;
    public_key: string;
}
/** Decode BIP32 Derivation Data

  {
    derivation: <BIP 32 Derivation Buffer Object>
    key: <Public Key Buffer Object>
  }

  @throws
  <InvalidBip32Key Error>

  @returns
  {
    fingerprint: <BIP32 Fingerprint Hex String>
    path: <BIP32 Derivation Path Child/Hardened Child/Index String>
    public_key: <Public Key Hex String>
  }
*/
export declare function bip32Derivation({ derivation, key }: Bip32DerivationInput): Bip32DerivationOutput;
