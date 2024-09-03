import { KeyValue, OutputScript } from '../../interfaces';
import { OutputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): OutputScript {
  if (keyVal.key[0] !== OutputTypes.OUTPUT_SCRIPT) {
    throw new Error(
      'Decode Error: could not decode outputAmount with key 0x' +
        keyVal.key.toString('hex'),
    );
  }

  return keyVal.value.toString('hex');
}

export function encode(script: OutputScript): KeyValue {
  const key = Buffer.from([OutputTypes.OUTPUT_SCRIPT]);

  return {
    key: key,
    value: Buffer.from(script, 'hex'),
  };
}

export const expected = 'Buffer';

export function check(data: any): data is OutputScript {
  return typeof data === 'string';
}
