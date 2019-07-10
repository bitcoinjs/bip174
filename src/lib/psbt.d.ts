/// <reference types="node" />
import { Bip32Derivation, FinalScriptSig, FinalScriptWitness, GlobalXpub, KeyValue, NonWitnessUtxo, PartialSig, PorCommitment, PsbtGlobal, PsbtInput, PsbtOutput, RedeemScript, SighashType, TransactionIOCountGetter, TransactionLocktimeSetter, TransactionVersionSetter, WitnessScript, WitnessUtxo } from './interfaces';
export declare class Psbt {
    static fromTransaction<T extends typeof Psbt>(this: T, txBuf: Buffer, txCountGetter: TransactionIOCountGetter): InstanceType<T>;
    static fromBase64<T extends typeof Psbt>(this: T, data: string, txCountGetter: TransactionIOCountGetter): InstanceType<T>;
    static fromHex<T extends typeof Psbt>(this: T, data: string, txCountGetter: TransactionIOCountGetter): InstanceType<T>;
    static fromBuffer<T extends typeof Psbt>(this: T, buffer: Buffer, txCountGetter: TransactionIOCountGetter): InstanceType<T>;
    readonly inputs: PsbtInput[];
    readonly outputs: PsbtOutput[];
    readonly globalMap: PsbtGlobal;
    toBase64(): string;
    toHex(): string;
    toBuffer(): Buffer;
    setVersion(version: number, transactionVersionSetter?: TransactionVersionSetter): this;
    setLocktime(locktime: number, transactionLocktimeSetter?: TransactionLocktimeSetter): this;
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
    addInput<T>(inputData: T, transactionInputAdder: (input: T, txBuffer: Buffer) => Buffer): this;
    addOutput<T>(outputData: T, transactionOutputAdder: (output: T, txBuffer: Buffer) => Buffer, allowNoInput?: boolean): this;
    clearFinalizedInput(inputIndex: number): this;
    combine(...those: this[]): this;
    getTransaction(): Buffer;
}
