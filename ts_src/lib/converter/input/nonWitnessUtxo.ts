import { Transaction } from 'bitcoinjs-lib';
import { KeyValue, NonWitnessUtxo } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): NonWitnessUtxo {
  if (keyVal.key[0] !== InputTypes.NON_WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode nonWitnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  try {
    return {
      tx: Transaction.fromBuffer(keyVal.value),
      index: 0,
    };
  } catch (err) {
    throw new Error(
      'Decode Error: Error parsing NON_WITNESS_UTXO: ' + err.message,
    );
  }
}

export function encode(data: NonWitnessUtxo): KeyValue {
  return {
    key: Buffer.from([InputTypes.NON_WITNESS_UTXO]),
    value: data.tx.toBuffer(),
  };
}
