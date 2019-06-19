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

export type WitnessUtxo = TxOutput;

export type NonWitnessUtxo = Transaction;

export type SighashType = number;

export type RedeemScript = Buffer;

export type WitnessScript = Buffer;

export type FinalScriptSig = Buffer;

export type FinalScriptWitness = Buffer;

export type PorCommitment = string;
