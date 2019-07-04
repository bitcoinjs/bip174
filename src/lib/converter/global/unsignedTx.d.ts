/// <reference types="node" />
import { KeyValue, TransactionInput, TransactionOutputScript, UnsignedTx } from '../../interfaces';
export declare function decode(keyVal: KeyValue): UnsignedTx;
export declare function encode(data: UnsignedTx): KeyValue;
export declare function getInputOutputCounts(txBuffer: Buffer): {
    inputCount: number;
    outputCount: number;
};
export declare function isTransactionInput(data: any): data is TransactionInput;
export declare function addInput(input: TransactionInput, txBuffer: Buffer): Buffer;
export declare function isTransactionOutputScript(data: any): data is TransactionOutputScript;
export declare function addOutput(output: TransactionOutputScript, txBuffer: Buffer): Buffer;
