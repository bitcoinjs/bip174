import { KeyValue, SighashType } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): SighashType {
  if (keyVal.key[0] !== InputTypes.SIGHASH_TYPE) {
    throw new Error(
      'Decode Error: could not decode sighashType with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return {
    index: 0,
    data: keyVal.value.readUInt32LE(0),
  };
}

export function encode(data: SighashType): KeyValue {
  const key = Buffer.from([InputTypes.SIGHASH_TYPE]);
  const value = Buffer.allocUnsafe(4);
  value.writeUInt32LE(data.data, 0);
  return {
    key,
    value,
  };
}
