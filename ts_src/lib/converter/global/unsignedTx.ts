import { KeyValue, Transaction } from '../../interfaces';
import { GlobalTypes } from '../../typeFields.js';

export function encode(data: Transaction): KeyValue {
  return {
    key: new Uint8Array([GlobalTypes.UNSIGNED_TX]),
    value: data.toBuffer(),
  };
}
