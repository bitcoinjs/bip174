import { KeyValue, SequenceNumber } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): SequenceNumber {
  if (keyVal.key[0] !== InputTypes.SEQUENCE_NUMBER) {
    throw new Error(
      'Decode Error: could not decode spentOutputIndex with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value.readUInt32LE(0);
}

export function encode(data: SequenceNumber): KeyValue {
  const key = Buffer.from([InputTypes.SEQUENCE_NUMBER]);

  const value = Buffer.alloc(4);
  value.writeUInt32LE(data, 0);

  return {
    key,
    value,
  };
}

export const expected = 'Buffer';

export function check(data: any): data is SequenceNumber {
  return (
    typeof data === 'number' && !isNaN(data) && data < 0xffffffff && data >= 0
  );
}
