import { SilentPaymentEcdhShare, KeyValue } from '../../interfaces';
export declare function makeConverter(TYPE_BYTE: number, isValidPubkey?: (pubkey: Uint8Array) => boolean): {
    decode: (keyVal: KeyValue) => SilentPaymentEcdhShare;
    encode: (data: SilentPaymentEcdhShare) => KeyValue;
    check: (data: any) => data is SilentPaymentEcdhShare;
    expected: string;
    canAddToArray: (array: SilentPaymentEcdhShare[], item: SilentPaymentEcdhShare, dupeSet: Set<string>) => boolean;
};
