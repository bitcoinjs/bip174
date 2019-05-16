const BN = require('bn.js');

const bip32KeyLimit: number = Math.pow(2, 31);
const bip32PathSeparator: string = '/';
const byteLength: number = 4;
const decBase: number = 10;
const endianness: string = 'le';
const hardenedMarker: string = "'";

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
export function bip32Path({ path }: Bip32PathInput): Buffer {
  const indices: string[] = path.split(bip32PathSeparator);

  return Buffer.concat(
    indices.slice(1).map((n: string) => {
      const len: number = hardenedMarker.length;

      const isHardened: boolean = n.slice(-len) === hardenedMarker;

      const path: string = isHardened ? n.slice(0, -len) : n;

      const value: number = parseInt(path, decBase) + (isHardened ? bip32KeyLimit : 0);

      return new BN(value, decBase).toArrayLike(Buffer, endianness, byteLength);
    }),
  );
}
