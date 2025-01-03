import { SilentPaymentDleq, KeyValue } from '../../interfaces';
export declare function makeConverter(TYPE_BYTE: number, isValidPubkey?: (pubkey: Uint8Array) => boolean): {
    decode: (keyVal: KeyValue) => SilentPaymentDleq;
    encode: (data: SilentPaymentDleq) => KeyValue;
    check: (data: any) => data is SilentPaymentDleq;
    expected: string;
    canAddToArray: (array: SilentPaymentDleq[], item: SilentPaymentDleq, dupeSet: Set<string>) => boolean;
};
