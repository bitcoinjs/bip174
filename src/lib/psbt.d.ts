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
    addNonWitnessUtxoToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, nonWitnessUtxo: NonWitnessUtxo): T;
    addWitnessUtxoToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, witnessUtxo: WitnessUtxo): T;
    addPartialSigToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, partialSig: PartialSig): T;
    addSighashTypeToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, sighashType: SighashType): T;
    addRedeemScriptToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, redeemScript: RedeemScript): T;
    addWitnessScriptToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, witnessScript: WitnessScript): T;
    addBip32DerivationToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, bip32Derivation: Bip32Derivation): T;
    addFinalScriptSigToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, finalScriptSig: FinalScriptSig): T;
    addFinalScriptWitnessToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, finalScriptWitness: FinalScriptWitness): T;
    addPorCommitmentToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, porCommitment: PorCommitment): T;
    addRedeemScriptToOutput<T extends InstanceType<typeof Psbt>>(this: T, outputIndex: number, redeemScript: RedeemScript): T;
    addWitnessScriptToOutput<T extends InstanceType<typeof Psbt>>(this: T, outputIndex: number, witnessScript: WitnessScript): T;
    addBip32DerivationToOutput<T extends InstanceType<typeof Psbt>>(this: T, outputIndex: number, bip32Derivation: Bip32Derivation): T;
    addKeyValToGlobal<T extends InstanceType<typeof Psbt>>(this: T, keyVal: KeyValue): T;
    addKeyValToInput<T extends InstanceType<typeof Psbt>>(this: T, inputIndex: number, keyVal: KeyValue): T;
    addKeyValToOutput<T extends InstanceType<typeof Psbt>>(this: T, outputIndex: number, keyVal: KeyValue): T;
    addInput<V extends InstanceType<typeof Psbt>>(this: V, inputData: TransactionInput): V;
    addInput<T, V extends InstanceType<typeof Psbt>>(this: V, inputData: T, transactionInputAdder?: (input: T, txBuffer: Buffer) => Buffer): V;
    addOutput<V extends InstanceType<typeof Psbt>>(this: V, outputData: TransactionOutput, allowNoInput?: boolean): V;
    addOutput<T, V extends InstanceType<typeof Psbt>>(this: V, outputData: T, allowNoInput?: boolean, transactionOutputAdder?: (output: T, txBuffer: Buffer) => Buffer): V;
    combine<T extends InstanceType<typeof Psbt>>(this: T, ...those: Psbt[]): T;
    getTransaction(): Buffer;
}
