/// <reference types="node" />
import { PsbtAttributes } from './index';
export declare function psbtToBuffer({ unsignedTx, globalMap, inputs, outputs, }: PsbtAttributes): Buffer;
