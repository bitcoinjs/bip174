import { KeyValue, RequiredTimeLocktime } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): RequiredTimeLocktime {
  if (keyVal.key[0] !== InputTypes.REQUIRED_TIME_LOCKTIME) {
    throw new Error(
      'Decode Error: could not decode requiredTimeLocktime with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value.readUInt32LE(0);
}

export function encode(data: RequiredTimeLocktime): KeyValue {
  const key = Buffer.from([InputTypes.REQUIRED_TIME_LOCKTIME]);

  const value = Buffer.alloc(4);
  value.writeUInt32LE(data, 0);

  return {
    key,
    value,
  };
}

export const expected = 'Buffer';

export function check(data: any): data is RequiredTimeLocktime {
  return (
    typeof data === 'number' && !isNaN(data) && data < 0xffffffff && data >= 0 //add check if it's > 500000000 ?
  );
}
