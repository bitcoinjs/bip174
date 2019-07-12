/// <reference types="node" />
import { Bip32Derivation, FinalScriptSig, FinalScriptWitness, GlobalXpub, KeyValue, NonWitnessUtxo, PartialSig, PorCommitment, PsbtGlobal, PsbtInput, PsbtInputExtended, PsbtOutput, PsbtOutputExtended, RedeemScript, SighashType, Transaction, TransactionFromBuffer, WitnessScript, WitnessUtxo } from './interfaces';
export declare class Psbt {
    static fromBase64<T extends typeof Psbt>(this: T, data: string, txFromBuffer: TransactionFromBuffer): InstanceType<T>;
    static fromHex<T extends typeof Psbt>(this: T, data: string, txFromBuffer: TransactionFromBuffer): InstanceType<T>;
    static fromBuffer<T extends typeof Psbt>(this: T, buffer: Buffer, txFromBuffer: TransactionFromBuffer): InstanceType<T>;
    readonly inputs: PsbtInput[];
    readonly outputs: PsbtOutput[];
    readonly globalMap: PsbtGlobal;
    constructor(tx: Transaction);
    toBase64(): string;
    toHex(): string;
    toBuffer(): Buffer;
    addGlobalXpubToGlobal(globalXpub: GlobalXpub): this;
    addNonWitnessUtxoToInput(inputIndex: number, nonWitnessUtxo: NonWitnessUtxo): this;
    addWitnessUtxoToInput(inputIndex: number, witnessUtxo: WitnessUtxo): this;
    addPartialSigToInput(inputIndex: number, partialSig: PartialSig): this;
    addSighashTypeToInput(inputIndex: number, sighashType: SighashType): this;
    addRedeemScriptToInput(inputIndex: number, redeemScript: RedeemScript): this;
    addWitnessScriptToInput(inputIndex: number, witnessScript: WitnessScript): this;
    addBip32DerivationToInput(inputIndex: number, bip32Derivation: Bip32Derivation): this;
    addFinalScriptSigToInput(inputIndex: number, finalScriptSig: FinalScriptSig): this;
    addFinalScriptWitnessToInput(inputIndex: number, finalScriptWitness: FinalScriptWitness): this;
    addPorCommitmentToInput(inputIndex: number, porCommitment: PorCommitment): this;
    addRedeemScriptToOutput(outputIndex: number, redeemScript: RedeemScript): this;
    addWitnessScriptToOutput(outputIndex: number, witnessScript: WitnessScript): this;
    addBip32DerivationToOutput(outputIndex: number, bip32Derivation: Bip32Derivation): this;
    addUnknownKeyValToGlobal(keyVal: KeyValue): this;
    addUnknownKeyValToInput(inputIndex: number, keyVal: KeyValue): this;
    addUnknownKeyValToOutput(outputIndex: number, keyVal: KeyValue): this;
    addInput(inputData: PsbtInputExtended): this;
    addOutput(outputData: PsbtOutputExtended): this;
    clearFinalizedInput(inputIndex: number): this;
    combine(...those: this[]): this;
    getTransaction(): Buffer;
}
