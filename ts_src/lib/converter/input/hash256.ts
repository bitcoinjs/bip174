import { HASH256, KeyValue } from '../../interfaces';
import { InputTypes } from '../../typeFields';
import * as crypto from 'crypto';

export function decode(keyVal: KeyValue): HASH256 {
  if (keyVal.key[0] !== InputTypes.RIPEMD160) {
    throw new Error(
      'Decore Error: could not decode ripemd160 with key 0x' +
        keyVal.key.toString('hex'),
    );
  }

  return {
    preimage: keyVal.value,
    hash: keyVal.key.slice(1),
  };
}

export function encode(data: HASH256): KeyValue {
  const head = Buffer.from([InputTypes.HASH160]);
  const key = Buffer.concat([head, data.hash]);

  const value = data.preimage;

  return {
    key,
    value,
  };
}

export const expected = `{ preimage: Buffer; hash: Buffer; }`;

export function check(data: any): data is HASH256 {
  return (
    Buffer.isBuffer(data.preimage) &&
    Buffer.isBuffer(data.hash) &&
    crypto
      .createHash('sha256')
      .update(
        crypto
          .createHash('sha256')
          .update(data.preimage)
          .digest(),
      )
      .digest()
      .compare(data.hash) == 0
  );
}
