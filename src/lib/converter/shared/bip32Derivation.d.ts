import { Bip32Derivation, KeyValue } from '../../interfaces';
export declare function makeConverter(TYPE_BYTE: number): {
    decode: (keyVal: KeyValue) => Bip32Derivation;
    encode: (data: Bip32Derivation) => KeyValue;
};
