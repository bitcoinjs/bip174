import { KeyValue, OutputAmount } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): OutputAmount {
  if (keyVal.key[0] !== InputTypes.SEQUENCE_NUMBER) {
    throw new Error(
      'Decode Error: could not decode outputAmount with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return +keyVal.value.readBigInt64BE(0).toString();
}

export function encode(data: OutputAmount): KeyValue {
  const key = Buffer.from([InputTypes.SEQUENCE_NUMBER]);

  const value = Buffer.alloc(8);
  value.writeBigInt64BE(BigInt(data), 0);

  return {
    key,
    value,
  };
}

export const expected = 'Buffer';

export function check(data: any): data is OutputAmount {
  return (
    typeof data === 'number' &&
    !isNaN(data) &&
    data <= BigInt('0x7fffffffffffffff')
  );
}
