/// <reference types="node" />
export interface Bip32PathInput {
    path: string;
}
/** Encode a BIP32 path

  {
    path: <BIP 32 Path String>
  }

  @returns
  <BIP 32 Path Buffer Object>
*/
export declare function bip32Path({ path }: Bip32PathInput): Buffer;
