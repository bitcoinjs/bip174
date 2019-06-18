import { KeyValue, WitnessUtxo } from '../../interfaces';
export declare function decode(keyVal: KeyValue): WitnessUtxo;
export declare function encode(data: WitnessUtxo): KeyValue;
