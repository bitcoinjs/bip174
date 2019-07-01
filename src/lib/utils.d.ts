/// <reference types="node" />
import { KeyValue, PsbtGlobal, PsbtInput, PsbtOutput } from './interfaces';
export declare function checkForInput(inputs: PsbtInput[], inputIndex: number): PsbtInput;
export declare function checkForOutput(outputs: PsbtOutput[], outputIndex: number): PsbtOutput;
export declare function checkHasKey(checkKeyVal: KeyValue, keyVals: KeyValue[], enumLength: number): void;
export declare function getEnumLength(myenum: any): number;
export declare function inputIsUncleanFinalized(input: PsbtInput): boolean;
export declare function insertTxInGlobalMap(txBuf: Buffer, globalMap: PsbtGlobal): void;
