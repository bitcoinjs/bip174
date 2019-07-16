/// <reference types="node" />
export declare type TransactionFromBuffer = (buffer: Buffer) => Transaction;
export interface Transaction {
    getInputOutputCounts(): {
        inputCount: number;
        outputCount: number;
    };
    addInput(objectArg: any): void;
    addOutput(objectArg: any): void;
    toBuffer(): Buffer;
}
export interface KeyValue {
    key: Buffer;
    value: Buffer;
}
export interface PsbtGlobal {
    unsignedTx: Transaction;
    unknownKeyVals?: KeyValue[];
    globalXpub?: GlobalXpub;
}
export interface PsbtInput {
    unknownKeyVals?: KeyValue[];
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
export interface PsbtInputExtended extends PsbtInput {
    [index: string]: any;
}
export interface PsbtOutput {
    unknownKeyVals?: KeyValue[];
    redeemScript?: RedeemScript;
    witnessScript?: WitnessScript;
    bip32Derivation?: Bip32Derivation[];
}
export interface PsbtOutputExtended extends PsbtOutput {
    [index: string]: any;
    unknownKeyVals?: KeyValue[];
}
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
}
export declare type TransactionInputAdder = (input: TransactionInput, txBuffer: Buffer) => Buffer;
export interface TransactionOutput {
    script: Buffer;
    value: number;
}
export declare type TransactionOutputAdder = (output: TransactionOutput, txBuffer: Buffer) => Buffer;
export declare type TransactionVersionSetter = (version: number, txBuffer: Buffer) => Buffer;
export declare type TransactionLocktimeSetter = (locktime: number, txBuffer: Buffer) => Buffer;
