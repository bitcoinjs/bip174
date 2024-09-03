import { KeyValue, SpentOutputIndex } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): SpentOutputIndex {
  if (keyVal.key[0] !== InputTypes.SPENT_OUTPUT_INDEX) {
    throw new Error(
      'Decode Error: could not decode spentOutputIndex with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value.readUInt32LE(0);
}

export function encode(data: SpentOutputIndex): KeyValue {
  const key = Buffer.from([InputTypes.SPENT_OUTPUT_INDEX]);
  const value = Buffer.alloc(4);
  value.writeUInt32LE(data, 0);

  return {
    key,
    value,
  };
}

export const expected = 'Buffer';

export function check(data: any): data is SpentOutputIndex {
  return (
    typeof data === 'number' && !isNaN(data) && data < 0xffffffff && data >= 0
  );
}
