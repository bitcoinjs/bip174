import { KeyValue } from '../../interfaces';
import * as tools from 'uint8array-tools';
export function makeChecker(
  pubkeyTypes: number[],
): (keyVal: KeyValue) => Uint8Array | undefined {
  return checkPubkey;
  function checkPubkey(keyVal: KeyValue): Uint8Array | undefined {
    let pubkey: Uint8Array | undefined;
    if (pubkeyTypes.includes(keyVal.key[0])) {
      pubkey = keyVal.key.slice(1);
      if (
        !(pubkey.length === 33 || pubkey.length === 65) ||
        ![2, 3, 4].includes(pubkey[0])
      ) {
        throw new Error(
          'Format Error: invalid pubkey in key 0x' + tools.toHex(keyVal.key),
        );
      }
    }
    return pubkey;
  }
}
