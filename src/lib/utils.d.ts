/// <reference types="node" />
import { KeyValue, PsbtInput, PsbtOutput } from './interfaces';
import { Psbt } from './psbt';
export declare function checkForInput(inputs: PsbtInput[], inputIndex: number): PsbtInput;
export declare function checkForOutput(outputs: PsbtOutput[], outputIndex: number): PsbtOutput;
export declare function checkHasKey(checkKeyVal: KeyValue, keyVals: KeyValue[], enumLength: number): void;
export declare function getEnumLength(myenum: any): number;
export declare function inputCheckUncleanFinalized(inputIndex: number, input: PsbtInput): void;
export declare function addInputAttributes<T extends typeof Psbt>(psbt: InstanceType<T>, data: any): void;
export declare function addOutputAttributes<T extends typeof Psbt>(psbt: InstanceType<T>, data: any): void;
export declare function defaultVersionSetter(version: number, txBuf: Buffer): Buffer;
export declare function defaultLocktimeSetter(locktime: number, txBuf: Buffer): Buffer;
