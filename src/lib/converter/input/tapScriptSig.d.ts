import { KeyValue, TapScriptSig } from '../../interfaces';
export declare function decode(keyVal: KeyValue): TapScriptSig;
export declare function encode(tSig: TapScriptSig): KeyValue;
export declare const expected = "{ pubkey: Buffer; leafHash: Buffer; signature: Buffer; }";
export declare function check(data: any): data is TapScriptSig;
export declare function canAddToArray(array: TapScriptSig[], item: TapScriptSig, dupeSet: Set<string>): boolean;
