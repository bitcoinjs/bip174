// This function should throw if the scriptSig or scriptWitness section for
// any input is not empty. And it should throw if the transaction is segwit
// format. As per the BIP.
export type TransactionFromBuffer = (buffer: Uint8Array) => Transaction;
// This is a light wrapper that will give the information needed for parsing
// and modifying the Transaction internally.
// This library will have no logical understanding of the Transaction format,
// and it must be provided via the below interface
export interface Transaction {
  // Self explanatory
  getInputOutputCounts(): { inputCount: number; outputCount: number };
  // This function should check the arg for the correct info needed to add an
  // input. For example in Bitcoin it would need the hash, index, and sequence.
  // This function will modify the internal state of the transaction.
  addInput(objectArg: any): void;
  // Same as addInput. But with adding an output. For Bitcoin scriptPubkey
  // and value are all that should be needed.
  addOutput(objectArg: any): void;
  // This is primarily used when serializing the PSBT to a binary.
  // You can implement caching behind the scenes if needed and clear the cache
  // when addInput or addOutput are called.
  toBuffer(): Uint8Array;
}

export interface KeyValue {
  key: Uint8Array;
  value: Uint8Array;
}

export interface PsbtGlobal extends PsbtGlobalUpdate {
  unsignedTx: Transaction;
  unknownKeyVals?: KeyValue[];
}

export interface PsbtGlobalUpdate {
  globalXpub?: GlobalXpub[];
}

export interface PsbtInput extends PsbtInputUpdate {
  unknownKeyVals?: KeyValue[];
}

export interface PsbtInputUpdate {
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
  tapKeySig?: TapKeySig;
  tapScriptSig?: TapScriptSig[];
  tapLeafScript?: TapLeafScript[];
  tapBip32Derivation?: TapBip32Derivation[];
  tapInternalKey?: TapInternalKey;
  tapMerkleRoot?: TapMerkleRoot;
}

export interface PsbtInputExtended extends PsbtInput {
  [index: string]: any;
}

export interface PsbtOutput extends PsbtOutputUpdate {
  unknownKeyVals?: KeyValue[];
}

export interface PsbtOutputUpdate {
  redeemScript?: RedeemScript;
  witnessScript?: WitnessScript;
  bip32Derivation?: Bip32Derivation[];
  tapBip32Derivation?: TapBip32Derivation[];
  tapTree?: TapTree;
  tapInternalKey?: TapInternalKey;
}

export interface PsbtOutputExtended extends PsbtOutput {
  [index: string]: any;
}

export interface GlobalXpub {
  extendedPubkey: Uint8Array;
  masterFingerprint: Uint8Array;
  path: string;
}

export interface PartialSig {
  pubkey: Uint8Array;
  signature: Uint8Array;
}

export interface Bip32Derivation {
  masterFingerprint: Uint8Array;
  pubkey: Uint8Array;
  path: string;
}

export interface WitnessUtxo {
  script: Uint8Array;
  value: bigint;
}

export type NonWitnessUtxo = Uint8Array;

export type SighashType = number;

export type RedeemScript = Uint8Array;

export type WitnessScript = Uint8Array;

export type FinalScriptSig = Uint8Array;

export type FinalScriptWitness = Uint8Array;

export type PorCommitment = string;

export type TapKeySig = Uint8Array;

export interface TapScriptSig extends PartialSig {
  leafHash: Uint8Array;
}

interface TapScript {
  leafVersion: number;
  script: Uint8Array;
}

export type ControlBlock = Uint8Array;

export interface TapLeafScript extends TapScript {
  controlBlock: ControlBlock;
}

export interface TapBip32Derivation extends Bip32Derivation {
  leafHashes: Uint8Array[];
}

export type TapInternalKey = Uint8Array;

export type TapMerkleRoot = Uint8Array;

export interface TapLeaf extends TapScript {
  depth: number;
}

export interface TapTree {
  leaves: TapLeaf[];
}

export type TransactionIOCountGetter = (
  txBuffer: Uint8Array,
) => {
  inputCount: number;
  outputCount: number;
};

export type TransactionVersionSetter = (
  version: number,
  txBuffer: Uint8Array,
) => Uint8Array;

export type TransactionLocktimeSetter = (
  locktime: number,
  txBuffer: Uint8Array,
) => Uint8Array;
