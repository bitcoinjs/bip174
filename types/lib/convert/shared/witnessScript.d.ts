import { KeyValue, WitnessScript } from '../../interfaces';
export declare function makeConverter(TYPE_BYTE: number): {
    decode: (keyVal: KeyValue) => WitnessScript;
    encode: (data: WitnessScript) => KeyValue;
};
