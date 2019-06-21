import { KeyValue, NonWitnessUtxo } from '../../interfaces';
export declare function decode(keyVal: KeyValue): NonWitnessUtxo;
export declare function encode(data: NonWitnessUtxo): KeyValue;
