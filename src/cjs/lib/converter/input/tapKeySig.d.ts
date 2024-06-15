import { KeyValue, TapKeySig } from '../../interfaces';
export declare function decode(keyVal: KeyValue): TapKeySig;
export declare function encode(value: TapKeySig): KeyValue;
export declare const expected = "Buffer";
export declare function check(data: any): data is TapKeySig;
export declare function canAdd(currentData: any, newData: any): boolean;
