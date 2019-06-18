import { Transaction } from 'bitcoinjs-lib';
import { KeyValue } from '../../interfaces';
export declare function decode(keyVal: KeyValue): Transaction;
export declare function encode(tx: Transaction, stripInputs?: boolean): KeyValue;
