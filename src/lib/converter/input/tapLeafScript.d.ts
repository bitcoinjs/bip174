import { KeyValue, TapLeafScript } from '../../interfaces';
export declare function decode(keyVal: KeyValue): TapLeafScript;
export declare function encode(tScript: TapLeafScript): KeyValue;
export declare const expected = "{ controlBlock: Buffer; leafVersion: number, script: Buffer; }";
export declare function check(data: any): data is TapLeafScript;
export declare function canAddToArray(array: TapLeafScript[], item: TapLeafScript, dupeSet: Set<string>): boolean;
