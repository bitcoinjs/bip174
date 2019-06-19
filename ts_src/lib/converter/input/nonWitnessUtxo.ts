import { KeyValue, NonWitnessUtxo } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): NonWitnessUtxo {
  if (keyVal.key[0] !== InputTypes.NON_WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode nonWitnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}

export function encode(data: NonWitnessUtxo): KeyValue {
  return {
    key: Buffer.from([InputTypes.NON_WITNESS_UTXO]),
    value: data,
  };
}
