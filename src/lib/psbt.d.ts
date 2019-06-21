/// <reference types="node" />
import { PsbtGlobal, PsbtInput, PsbtOutput, TransactionInput, TransactionIOCountGetter, TransactionOutput } from './interfaces';
export declare class Psbt {
    static fromTransaction(txBuf: Buffer, txCountGetter?: TransactionIOCountGetter): Psbt;
    static fromBase64(data: string, txCountGetter?: TransactionIOCountGetter): Psbt;
    static fromHex(data: string, txCountGetter?: TransactionIOCountGetter): Psbt;
    static fromBuffer(buffer: Buffer, txCountGetter?: TransactionIOCountGetter): Psbt;
    inputs: PsbtInput[];
    outputs: PsbtOutput[];
    globalMap: PsbtGlobal;
    constructor();
    toBase64(): string;
    toHex(): string;
    toBuffer(): Buffer;
    addInput(inputData: TransactionInput): Psbt;
    addInput<T>(inputData: T, transactionInputAdder?: (input: T, txBuffer: Buffer) => Buffer): Psbt;
    addOutput(outputData: TransactionOutput, allowNoInput?: boolean): Psbt;
    addOutput<T>(outputData: T, allowNoInput?: boolean, transactionOutputAdder?: (output: T, txBuffer: Buffer) => Buffer): Psbt;
    combine(...those: Psbt[]): Psbt;
    extractTransaction(): Buffer;
}
