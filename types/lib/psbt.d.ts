/// <reference types="node" />
import { Transaction } from 'bitcoinjs-lib';
export declare class Psbt {
    static fromBase64(data: string): Psbt;
    static fromBuffer(buffer: Buffer): Psbt;
    private inputs;
    private outputs;
    private unsignedTx;
    constructor();
    toBase64(): string;
    combine(...those: Psbt[]): Psbt;
    finalize(): Psbt;
    extractTransaction(): Transaction;
}
