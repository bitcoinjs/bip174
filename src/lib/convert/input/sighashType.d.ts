import { KeyValue, SighashType } from '../../interfaces';
export declare function decode(keyVal: KeyValue): SighashType;
export declare function encode(data: SighashType): KeyValue;
