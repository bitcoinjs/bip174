const BN = require('bn.js');

const bip32KeyLimit = Math.pow(2, 31);
const bip32PathSeparator = '/';
const byteLength = 4;
const decBase = 10;
const endianness = 'le';
const hardenedMarker = "'";

/** Encode a BIP32 path

  {
    path: <BIP 32 Path String>
  }

  @returns
  <BIP 32 Path Buffer Object>
*/
export function bip32Path({ path }) {
  const indices = path.split(bip32PathSeparator);

  return Buffer.concat(
    indices.slice(1).map(n => {
      const len = hardenedMarker.length;

      const isHardened = n.slice(-len) === hardenedMarker;

      const path = isHardened ? n.slice(0, -len) : n;

      const value = parseInt(path, decBase) + (isHardened ? bip32KeyLimit : 0);

      return new BN(value, decBase).toArrayLike(Buffer, endianness, byteLength);
    }),
  );
}
