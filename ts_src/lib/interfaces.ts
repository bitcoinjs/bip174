export interface KeyValue {
  key: Buffer;
  value: Buffer;
}

export interface PsbtGlobal {
  keyVals: KeyValue[];
  unsignedTx?: UnsignedTx;
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

export type UnsignedTx = Buffer;

export interface PartialSig {
  pubkey: Buffer;
  signature: Buffer;
}

export function isPartialSig(data: any): data is PartialSig {
  return Buffer.isBuffer(data.pubkey) && Buffer.isBuffer(data.signature);
}

export interface Bip32Derivation {
  masterFingerprint: Buffer;
  pubkey: Buffer;
  path: string;
}

export function isBip32Derivation(data: any): data is Bip32Derivation {
  return (
    Buffer.isBuffer(data.pubkey) &&
    Buffer.isBuffer(data.masterFingerprint) &&
    typeof data.path === 'string'
  );
}

export interface WitnessUtxo {
  script: Buffer;
  value: number;
}

export function isWitnessUtxo(data: any): data is WitnessUtxo {
  return Buffer.isBuffer(data.script) && typeof data.value === 'number';
}

export type NonWitnessUtxo = Buffer;

export type SighashType = number;

export type RedeemScript = Buffer;

export type WitnessScript = Buffer;

export type FinalScriptSig = Buffer;

export type FinalScriptWitness = Buffer;

export type PorCommitment = string;

export type TransactionIOCountGetter = (
  txBuffer: Buffer,
) => {
  inputCount: number;
  outputCount: number;
};

export interface TransactionInput {
  hash: string | Buffer;
  index: number;
  sequence?: number;
}

export type TransactionInputAdder = (
  input: TransactionInput,
  txBuffer: Buffer,
) => Buffer;

export interface TransactionOutput {
  script: Buffer;
  value: number;
}

export type TransactionOutputAdder = (
  output: TransactionOutput,
  txBuffer: Buffer,
) => Buffer;
