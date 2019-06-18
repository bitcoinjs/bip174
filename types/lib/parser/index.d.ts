import { Transaction } from 'bitcoinjs-lib';
import { PsbtGlobal, PsbtInput, PsbtOutput } from '../interfaces';
export * from './fromBuffer';
export * from './toBuffer';
export interface PsbtAttributes {
    unsignedTx: Transaction;
    globalMap: PsbtGlobal;
    inputs: PsbtInput[];
    outputs: PsbtOutput[];
}
