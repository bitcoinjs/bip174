/// <reference types="node" />
import { Transaction, TxOutput } from 'bitcoinjs-lib';
export interface KeyValue {
    key: Buffer;
    value: Buffer;
}
export interface PsbtGlobal {
    keyVals: KeyValue[];
}
export interface PsbtInput {
    keyVals: KeyValue[];
    partialSig?: PartialSig[];
    nonWitnessUtxo?: NonWitnessUtxo;
    witnessUtxo?: WitnessUtxo;
    sighashType?: SighashType;
    redeemScript?: RedeemScript;
    witnessScript?: WitnessScript;
    bip32Derivation?: Bip32Derivation[];
    finalScriptSig?: FinalScriptSig;
    finalScriptWitness?: FinalScriptWitness;
    porCommitment?: PorCommitment;
}
export interface PsbtOutput {
    keyVals: KeyValue[];
    redeemScript?: RedeemScript;
    witnessScript?: WitnessScript;
    bip32Derivation?: Bip32Derivation[];
}
export interface PartialSig {
    pubkey: Buffer;
    signature: Buffer;
}
export interface Bip32Derivation {
    masterFingerprint: Buffer;
    pubkey: Buffer;
    path: string;
}
export declare type WitnessUtxo = TxOutput;
export declare type NonWitnessUtxo = Transaction;
export declare type SighashType = number;
export declare type RedeemScript = Buffer;
export declare type WitnessScript = Buffer;
export declare type FinalScriptSig = Buffer;
export declare type FinalScriptWitness = Buffer;
export declare type PorCommitment = string;
