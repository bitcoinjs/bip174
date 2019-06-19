/// <reference types="node" />
import { KeyValue, TransactionIOCountGetter } from '../interfaces';
import { PsbtAttributes } from './index';
export declare function psbtFromBuffer(buffer: Buffer, txCountGetter?: TransactionIOCountGetter): PsbtAttributes;
interface PsbtFromKeyValsArg {
    globalMapKeyVals: KeyValue[];
    inputKeyVals: KeyValue[][];
    outputKeyVals: KeyValue[][];
}
export declare function psbtFromKeyVals({ globalMapKeyVals, inputKeyVals, outputKeyVals, }: PsbtFromKeyValsArg): PsbtAttributes;
export {};
