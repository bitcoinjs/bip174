/// <reference types="node" />
import { TransactionIOCountGetter } from '../interfaces';
import { PsbtAttributes } from './index';
export declare function psbtFromBuffer(buffer: Buffer, txCountGetter?: TransactionIOCountGetter): PsbtAttributes;
