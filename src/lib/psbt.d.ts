/// <reference types="node" />
import { PsbtGlobal, PsbtInput, PsbtOutput, TransactionIOCountGetter } from './interfaces';
export declare class Psbt {
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
    combine(...those: Psbt[]): Psbt;
    finalize(): Psbt;
    extractTransaction(): Buffer;
}
