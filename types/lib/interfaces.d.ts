/// <reference types="node" />
import { Transaction, TxOutput } from 'bitcoinjs-lib';
export interface KeyValue {
    key: Buffer;
    value: Buffer;
}
export interface PsbtInput {
    keyVals: KeyValue[];
    partialSigs?: PartialSig[];
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
interface PartialSig {
    index: number;
    pubkey: Buffer;
    signature: Buffer;
}
interface WitnessUtxo {
    index: number;
    data: TxOutput;
}
interface NonWitnessUtxo {
    index: number;
    tx: Transaction;
}
interface SighashType {
    index: number;
    data: number;
}
interface RedeemScript {
    index: number;
    data: Buffer;
}
interface WitnessScript {
    index: number;
    data: Buffer;
}
interface FinalScriptSig {
    index: number;
    data: Buffer;
}
interface FinalScriptWitness {
    index: number;
    data: Buffer;
}
interface PorCommitment {
    index: number;
    data: string;
}
interface Bip32Derivation {
    index: number;
    masterFingerprint: Buffer;
    pubkey: Buffer;
    path: string;
}
export {};
