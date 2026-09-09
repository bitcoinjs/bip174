import { SilentPaymentV0Info, KeyValue } from '../../interfaces';
export declare function decode(keyVal: KeyValue): SilentPaymentV0Info;
export declare function encode(data: SilentPaymentV0Info): KeyValue;
export declare const expected = "{ scanKey: Uint8Array; spendKey: Uint8Array; }";
export declare function check(data: any): data is SilentPaymentV0Info;
export declare function canAdd(currentData: any, newData: any): boolean;
