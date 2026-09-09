import { KeyValue, SilentPaymentOutputLabel } from '../../interfaces';
export declare function decode(keyVal: KeyValue): SilentPaymentOutputLabel;
export declare function encode(data: SilentPaymentOutputLabel): KeyValue;
export declare const expected = "number";
export declare function check(data: any): data is SilentPaymentOutputLabel;
export declare function canAdd(currentData: any, newData: any): boolean;
