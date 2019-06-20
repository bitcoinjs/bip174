/// <reference types="node" />
import { TransactionInput, TransactionOutput } from '../../interfaces';
export declare function getInputOutputCounts(txBuffer: Buffer): {
    inputCount: number;
    outputCount: number;
};
export declare function addInput(input: TransactionInput, txBuffer: Buffer): Buffer;
export declare function addOutput(output: TransactionOutput, txBuffer: Buffer): Buffer;
