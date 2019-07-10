import { KeyValue, UnsignedTx } from '../../interfaces';
import { GlobalTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): UnsignedTx {
  if (keyVal.key[0] !== GlobalTypes.UNSIGNED_TX) {
    throw new Error(
      'Decode Error: could not decode unsignedTx with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}

export function encode(data: UnsignedTx): KeyValue {
  const key = Buffer.from([GlobalTypes.UNSIGNED_TX]);
  return {
    key,
    value: data,
  };
}
