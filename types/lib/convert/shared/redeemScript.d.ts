import { KeyValue, RedeemScript } from '../../interfaces';
export declare function makeConverter(TYPE_BYTE: number): {
    decode: (keyVal: KeyValue) => RedeemScript;
    encode: (data: RedeemScript) => KeyValue;
};
