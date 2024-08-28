/// <reference types="node" />
import { Transaction as BTransaction } from 'bitcoinjs-lib';
import { Transaction as ITransaction, TransactionFromBuffer } from '../../lib/interfaces';
export declare function getDefaultTx(version?: number): Transaction;
export declare const transactionFromBuffer: TransactionFromBuffer;
export declare class Transaction implements ITransaction {
    tx: BTransaction;
    constructor(buffer: Uint8Array);
    getInputOutputCounts(): {
        inputCount: number;
        outputCount: number;
    };
    addInput(input: any): void;
    addOutput(output: any): void;
    toBuffer(): Buffer;
}
