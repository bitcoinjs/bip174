import { KeyValue, PorCommitment } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): PorCommitment {
  if (keyVal.key[0] !== InputTypes.POR_COMMITMENT) {
    throw new Error(
      'Decode Error: could not decode porCommitment with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return {
    index: 0,
    data: keyVal.value.toString('utf8'),
  };
}

export function encode(data: PorCommitment): KeyValue {
  const key = Buffer.from([InputTypes.POR_COMMITMENT]);
  return {
    key,
    value: Buffer.from(data.data, 'utf8'),
  };
}
