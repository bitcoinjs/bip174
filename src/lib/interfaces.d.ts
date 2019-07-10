/// <reference types="node" />
export interface KeyValue {
    key: Buffer;
    value: Buffer;
}
export interface PsbtGlobal {
    keyVals: KeyValue[];
    unsignedTx?: UnsignedTx;
    globalXpub?: GlobalXpub;
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
export declare type UnsignedTx = Buffer;
export interface GlobalXpub {
    extendedPubkey: Buffer;
    masterFingerprint: Buffer;
    path: string;
}
export declare function isGlobalXpub(data: any): data is GlobalXpub;
export interface PartialSig {
    pubkey: Buffer;
    signature: Buffer;
}
export declare function isPartialSig(data: any): data is PartialSig;
export interface Bip32Derivation {
    masterFingerprint: Buffer;
    pubkey: Buffer;
    path: string;
}
export declare function isBip32Derivation(data: any): data is Bip32Derivation;
export interface WitnessUtxo {
    script: Buffer;
    value: number;
}
export declare function isWitnessUtxo(data: any): data is WitnessUtxo;
export declare type NonWitnessUtxo = Buffer;
export declare type SighashType = number;
export declare type RedeemScript = Buffer;
export declare type WitnessScript = Buffer;
export declare type FinalScriptSig = Buffer;
export declare type FinalScriptWitness = Buffer;
export declare type PorCommitment = string;
export declare type TransactionIOCountGetter = (txBuffer: Buffer) => {
    inputCount: number;
    outputCount: number;
};
export interface TransactionInput {
    hash: string | Buffer;
    index: number;
    sequence?: number;
    keyVals?: KeyValue[];
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
export declare type TransactionInputAdder = (input: TransactionInput, txBuffer: Buffer) => Buffer;
interface TransactionOutputBase {
    value: number;
    keyVals?: KeyValue[];
    redeemScript?: RedeemScript;
    witnessScript?: WitnessScript;
    bip32Derivation?: Bip32Derivation[];
}
export interface TransactionOutputAddress extends TransactionOutputBase {
    address: string;
}
export interface TransactionOutputScript extends TransactionOutputBase {
    script: Buffer;
}
export declare type TransactionOutput = TransactionOutputAddress | TransactionOutputScript;
export declare type TransactionOutputAdder = (output: TransactionOutput, txBuffer: Buffer) => Buffer;
export declare type TransactionVersionSetter = (version: number, txBuffer: Buffer) => Buffer;
export declare type TransactionLocktimeSetter = (locktime: number, txBuffer: Buffer) => Buffer;
export {};
