export type TransactionFromBuffer = (buffer: Buffer) => Transaction;
export interface Transaction {
  getInputOutputCounts(): { inputCount: number; outputCount: number };
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

export function isGlobalXpub(data: any): data is GlobalXpub {
  return (
    Buffer.isBuffer(data.extendedPubkey) &&
    Buffer.isBuffer(data.masterFingerprint) &&
    typeof data.path === 'string' &&
    data.extendedPubkey.length === 78 &&
    [2, 3].includes(data.extendedPubkey[45]) &&
    data.masterFingerprint.length === 4
  );
}

export interface PartialSig {
  pubkey: Buffer;
  signature: Buffer;
}

export function isPartialSig(data: any): data is PartialSig {
  return (
    Buffer.isBuffer(data.pubkey) &&
    Buffer.isBuffer(data.signature) &&
    [33, 65].includes(data.pubkey.length) &&
    [2, 3, 4].includes(data.pubkey[0]) &&
    isDerSigWithSighash(data.signature)
  );
}

function isDerSigWithSighash(buf: Buffer): boolean {
  if (!Buffer.isBuffer(buf) || buf.length < 9) return false;
  if (buf[0] !== 0x30) return false;
  if (buf.length !== buf[1] + 3) return false;
  if (buf[2] !== 0x02) return false;
  const rLen = buf[3];
  if (rLen > 33 || rLen < 1) return false;
  if (buf[3 + rLen + 1] !== 0x02) return false;
  const sLen = buf[3 + rLen + 2];
  if (sLen > 33 || sLen < 1) return false;
  if (buf.length !== 3 + rLen + 2 + sLen + 2) return false;
  return true;
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
    typeof data.path === 'string' &&
    [33, 65].includes(data.pubkey.length) &&
    [2, 3, 4].includes(data.pubkey[0]) &&
    data.masterFingerprint.length === 4
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

export type TransactionVersionSetter = (
  version: number,
  txBuffer: Buffer,
) => Buffer;

export type TransactionLocktimeSetter = (
  locktime: number,
  txBuffer: Buffer,
) => Buffer;
