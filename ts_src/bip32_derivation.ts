import { ECPair } from 'bitcoinjs-lib';

const bip32KeyByteLength = 4;
const bip32KeyLimit = Math.pow(2, 31);
const fingerprintByteLength = 4;

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
export function bip32Derivation({ derivation, key }) {
  let childKey;

  // Derive the public key from the public key bytes
  try {
    childKey = ECPair.fromPublicKey(key);
  } catch (err) {
    throw new Error('InvalidBip32Key');
  }

  // Split derivation into 4 byte chunks of unknown length
  let splitBuffers = [];
  for (let i = 0; i < derivation.length / bip32KeyByteLength; i++) {
    let head = i * bip32KeyByteLength;
    splitBuffers.push(derivation.slice(head, head + 4));
  }

  // First 4 byte chunk is fingerprint
  let fingerPrint = derivation.slice(0, fingerprintByteLength);

  // Construct the path string by reading each 4 byte chunk
  let path = splitBuffers.slice(1).reduce((_path, buf) => {
    let index = buf.readUInt32LE(0);
    let isHardened = (index & bip32KeyLimit) !== 0;
    if (isHardened) index -= bip32KeyLimit;
    return _path + '/' + index.toString() + (isHardened ? "'" : '');
  }, 'm');

  return {
    fingerprint: fingerPrint.toString('hex'),
    path: path,
    public_key: childKey.publicKey.toString('hex'),
  };
}
