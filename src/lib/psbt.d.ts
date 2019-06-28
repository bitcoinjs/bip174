/// <reference types="node" />
import { Bip32Derivation, FinalScriptSig, FinalScriptWitness, KeyValue, NonWitnessUtxo, PartialSig, PorCommitment, PsbtGlobal, PsbtInput, PsbtOutput, RedeemScript, SighashType, TransactionInput, TransactionIOCountGetter, TransactionOutput, WitnessScript, WitnessUtxo } from './interfaces';
export declare class Psbt {
    static fromTransaction<T extends typeof Psbt>(this: T, txBuf: Buffer, txCountGetter?: TransactionIOCountGetter): InstanceType<T>;
    static fromBase64<T extends typeof Psbt>(this: T, data: string, txCountGetter?: TransactionIOCountGetter): InstanceType<T>;
    static fromHex<T extends typeof Psbt>(this: T, data: string, txCountGetter?: TransactionIOCountGetter): InstanceType<T>;
    static fromBuffer<T extends typeof Psbt>(this: T, buffer: Buffer, txCountGetter?: TransactionIOCountGetter): InstanceType<T>;
    inputs: PsbtInput[];
    outputs: PsbtOutput[];
    globalMap: PsbtGlobal;
    constructor();
    toBase64(): string;
    toHex(): string;
    toBuffer(): Buffer;
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
    addKeyValToGlobal(keyVal: KeyValue): this;
    addKeyValToInput(inputIndex: number, keyVal: KeyValue): this;
    addKeyValToOutput(outputIndex: number, keyVal: KeyValue): this;
    addInput(inputData: TransactionInput): this;
    addInput<T>(inputData: T, transactionInputAdder?: (input: T, txBuffer: Buffer) => Buffer): this;
    addOutput(outputData: TransactionOutput, allowNoInput?: boolean): this;
    addOutput<T>(outputData: T, allowNoInput?: boolean, transactionOutputAdder?: (output: T, txBuffer: Buffer) => Buffer): this;
    combine(...those: this[]): this;
    getTransaction(): Buffer;
}
