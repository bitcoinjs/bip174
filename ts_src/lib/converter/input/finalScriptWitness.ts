import { FinalScriptWitness, KeyValue } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): FinalScriptWitness {
  if (keyVal.key[0] !== InputTypes.FINAL_SCRIPTWITNESS) {
    throw new Error(
      'Decode Error: could not decode finalScriptWitness with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}

export function encode(data: FinalScriptWitness): KeyValue {
  const key = Buffer.from([InputTypes.FINAL_SCRIPTWITNESS]);
  return {
    key,
    value: data,
  };
}
