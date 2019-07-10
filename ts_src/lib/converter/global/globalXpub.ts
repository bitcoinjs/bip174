import { GlobalXpub, KeyValue } from '../../interfaces';
import { GlobalTypes } from '../../typeFields';
const range = (n: number): number[] => [...Array(n).keys()];

export function decode(keyVal: KeyValue): GlobalXpub {
  if (keyVal.key[0] !== GlobalTypes.GLOBAL_XPUB) {
    throw new Error(
      'Decode Error: could not decode globalXpub with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (keyVal.key.length !== 79 || ![2, 3].includes(keyVal.key[46])) {
    throw new Error(
      'Decode Error: globalXpub has invalid extended pubkey in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if ((keyVal.value.length / 4) % 1 !== 0) {
    throw new Error(
      'Decode Error: Global GLOBAL_XPUB value length should be multiple of 4',
    );
  }
  const extendedPubkey = keyVal.key.slice(1);
  const data = {
    masterFingerprint: keyVal.value.slice(0, 4),
    extendedPubkey,
    path: 'm',
  };
  for (const i of range(keyVal.value.length / 4 - 1)) {
    const val = keyVal.value.readUInt32LE(i * 4 + 4);
    const isHard = !!(val & 0x80000000);
    const idx = val & 0x7fffffff;
    data.path += '/' + idx.toString(10) + (isHard ? "'" : '');
  }
  return data;
}

export function encode(data: GlobalXpub): KeyValue {
  const head = Buffer.from([GlobalTypes.GLOBAL_XPUB]);
  const key = Buffer.concat([head, data.extendedPubkey]);

  const splitPath = data.path.split('/');
  const value = Buffer.allocUnsafe(splitPath.length * 4);

  data.masterFingerprint.copy(value, 0);
  let offset = 4;
  splitPath.slice(1).forEach(level => {
    const isHard = level.slice(-1) === "'";
    let num = 0x7fffffff & parseInt(isHard ? level.slice(0, -1) : level, 10);
    if (isHard) num += 0x80000000;

    value.writeUInt32LE(num, offset);
    offset += 4;
  });

  return {
    key,
    value,
  };
}
