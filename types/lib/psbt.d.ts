/// <reference types="node" />
import { Transaction } from 'bitcoinjs-lib';
import { PsbtGlobal, PsbtInput, PsbtOutput } from './interfaces';
export declare class Psbt {
    static fromBase64(data: string): Psbt;
    static fromHex(data: string): Psbt;
    static fromBuffer(buffer: Buffer): Psbt;
    inputs: PsbtInput[];
    outputs: PsbtOutput[];
    globalMap: PsbtGlobal;
    unsignedTx: Transaction;
    constructor();
    toBase64(): string;
    toHex(): string;
    toBuffer(): Buffer;
    combine(...those: Psbt[]): Psbt;
    finalize(): Psbt;
    extractTransaction(): Transaction;
}
