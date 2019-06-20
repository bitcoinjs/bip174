/// <reference types="node" />
import { PsbtGlobal, PsbtInput, PsbtOutput, TransactionInput, TransactionInputAdder, TransactionIOCountGetter, TransactionOutput, TransactionOutputAdder } from './interfaces';
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
    addInput(inputData: TransactionInput, transactionInputAdder?: TransactionInputAdder): Psbt;
    addOutput(outputData: TransactionOutput, transactionInputAdder?: TransactionOutputAdder): Psbt;
    combine(...those: Psbt[]): Psbt;
    extractTransaction(): Buffer;
}
