import { Transaction } from 'bitcoinjs-lib';
import { KeyValue } from '../interfaces';
import { PsbtAttributes } from '../parser';
export declare function combine(psbts: PsbtAttributes[]): PsbtAttributes;
export declare function checkTxWithKeyVal(tx: Transaction, kv: KeyValue): boolean;
export declare function checkTxWithTx(tx1: Transaction, tx2: Transaction): boolean;
