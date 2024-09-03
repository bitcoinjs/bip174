import { KeyValue, PreviousTxId } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): PreviousTxId {
  if (keyVal.key[0] !== InputTypes.PREVIOUS_TXID) {
    throw new Error(
      'Decode Error: could not decode previousTxid with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  return keyVal.value;
}

export function encode(data: PreviousTxId): KeyValue {
  const key = Buffer.from([InputTypes.PREVIOUS_TXID]);
  return {
    key,
    value: data,
  };
}

export const expected = 'Buffer';

export function check(data: any): data is PreviousTxId {
  return Buffer.isBuffer(data);
}
