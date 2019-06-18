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

export interface PartialSig {
  index: number;
  pubkey: Buffer;
  signature: Buffer;
}

export interface WitnessUtxo {
  index: number;
  data: TxOutput;
}

export interface NonWitnessUtxo {
  index: number;
  tx: Transaction;
}

export interface SighashType {
  index: number;
  data: number;
}

export interface RedeemScript {
  index: number;
  data: Buffer;
}

export interface WitnessScript {
  index: number;
  data: Buffer;
}

export interface FinalScriptSig {
  index: number;
  data: Buffer;
}

export interface FinalScriptWitness {
  index: number;
  data: Buffer;
}

export interface PorCommitment {
  index: number;
  data: string;
}

export interface Bip32Derivation {
  index: number;
  masterFingerprint: Buffer;
  pubkey: Buffer;
  path: string;
}

export interface PsbtGlobal {
  keyVals: KeyValue[];
}
