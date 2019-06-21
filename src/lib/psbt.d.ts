/// <reference types="node" />
import { Bip32Derivation, FinalScriptSig, FinalScriptWitness, NonWitnessUtxo, PartialSig, PorCommitment, PsbtGlobal, PsbtInput, PsbtOutput, RedeemScript, SighashType, TransactionInput, TransactionIOCountGetter, TransactionOutput, WitnessScript, WitnessUtxo } from './interfaces';
export declare class Psbt {
    static fromTransaction(txBuf: Buffer, txCountGetter?: TransactionIOCountGetter): Psbt;
    static fromBase64(data: string, txCountGetter?: TransactionIOCountGetter): Psbt;
    static fromHex(data: string, txCountGetter?: TransactionIOCountGetter): Psbt;
    static fromBuffer(buffer: Buffer, txCountGetter?: TransactionIOCountGetter): Psbt;
    inputs: PsbtInput[];
    outputs: PsbtOutput[];
    globalMap: PsbtGlobal;
    constructor();
    toBase64(): string;
    toHex(): string;
    toBuffer(): Buffer;
    addNonWitnessUtxoToInput(inputIndex: number, nonWitnessUtxo: NonWitnessUtxo): Psbt;
    addWitnessUtxoToInput(inputIndex: number, witnessUtxo: WitnessUtxo): Psbt;
    addPartialSigToInput(inputIndex: number, partialSig: PartialSig): Psbt;
    addSighashTypeToInput(inputIndex: number, sighashType: SighashType): Psbt;
    addRedeemScriptToInput(inputIndex: number, redeemScript: RedeemScript): Psbt;
    addWitnessScriptToInput(inputIndex: number, witnessScript: WitnessScript): Psbt;
    addBip32DerivationToInput(inputIndex: number, bip32Derivation: Bip32Derivation): Psbt;
    addFinalScriptSigToInput(inputIndex: number, finalScriptSig: FinalScriptSig): Psbt;
    addFinalScriptWitnessToInput(inputIndex: number, finalScriptWitness: FinalScriptWitness): Psbt;
    addPorCommitmentToInput(inputIndex: number, porCommitment: PorCommitment): Psbt;
    addRedeemScriptToOutput(outputIndex: number, redeemScript: RedeemScript): Psbt;
    addWitnessScriptToOutput(outputIndex: number, witnessScript: WitnessScript): Psbt;
    addBip32DerivationToOutput(outputIndex: number, bip32Derivation: Bip32Derivation): Psbt;
    addInput(inputData: TransactionInput): Psbt;
    addInput<T>(inputData: T, transactionInputAdder?: (input: T, txBuffer: Buffer) => Buffer): Psbt;
    addOutput(outputData: TransactionOutput, allowNoInput?: boolean): Psbt;
    addOutput<T>(outputData: T, allowNoInput?: boolean, transactionOutputAdder?: (output: T, txBuffer: Buffer) => Buffer): Psbt;
    combine(...those: Psbt[]): Psbt;
    getTransaction(): Buffer;
}
