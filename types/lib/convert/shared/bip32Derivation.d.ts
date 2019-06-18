import { Bip32Derivation, KeyValue } from '../../interfaces';
export declare function decode(keyVal: KeyValue): Bip32Derivation;
export declare function encode(data: Bip32Derivation): KeyValue;
