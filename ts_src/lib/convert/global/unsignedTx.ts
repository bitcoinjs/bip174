import { Transaction } from 'bitcoinjs-lib';
import { KeyValue } from '../../interfaces';
import { GlobalTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): Transaction {
  if (keyVal.key[0] !== GlobalTypes.UNSIGNED_TX) {
    throw new Error(
      'Decode Error: could not decode unsignedTx with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  let unsignedTx: Transaction;
  try {
    unsignedTx = Transaction.fromBuffer(keyVal.value);
  } catch (err) {
    throw new Error('Decode Error: Error parsing Transaction: ' + err.message);
  }
  return unsignedTx;
}

export function encode(tx: Transaction, stripInputs: boolean = true): KeyValue {
  let newTx: Transaction;
  if (stripInputs) {
    newTx = tx.clone();
    newTx.ins.forEach(input => {
      input.script = Buffer.from([]);
      input.witness = [];
    });
  } else {
    newTx = tx;
  }
  return {
    key: Buffer.from([GlobalTypes.UNSIGNED_TX]),
    value: newTx.toBuffer(),
  };
}
