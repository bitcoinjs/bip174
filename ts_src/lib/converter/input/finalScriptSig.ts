import { FinalScriptSig, KeyValue } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): FinalScriptSig {
  if (keyVal.key[0] !== InputTypes.FINAL_SCRIPTSIG) {
    throw new Error(
      'Decode Error: could not decode finalScriptSig with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return {
    index: 0,
    data: keyVal.value,
  };
}

export function encode(data: FinalScriptSig): KeyValue {
  const key = Buffer.from([InputTypes.FINAL_SCRIPTSIG]);
  return {
    key,
    value: data.data,
  };
}
