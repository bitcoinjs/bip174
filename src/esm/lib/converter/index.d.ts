import * as globalXpub from './global/globalXpub.js';
import * as unsignedTx from './global/unsignedTx.js';
import * as finalScriptSig from './input/finalScriptSig.js';
import * as finalScriptWitness from './input/finalScriptWitness.js';
import * as nonWitnessUtxo from './input/nonWitnessUtxo.js';
import * as partialSig from './input/partialSig.js';
import * as porCommitment from './input/porCommitment.js';
import * as sighashType from './input/sighashType.js';
import * as tapKeySig from './input/tapKeySig.js';
import * as tapLeafScript from './input/tapLeafScript.js';
import * as tapMerkleRoot from './input/tapMerkleRoot.js';
import * as tapScriptSig from './input/tapScriptSig.js';
import * as witnessUtxo from './input/witnessUtxo.js';
import * as silentPaymentOutputLabel from './output/silentPaymentOutputLabel.js';
import * as silentPaymentV0Info from './output/silentPaymentV0Info.js';
import * as tapTree from './output/tapTree.js';
declare const globals: {
    unsignedTx: typeof unsignedTx;
    globalXpub: typeof globalXpub;
    checkPubkey: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array | undefined;
    silentPaymentEcdhShare: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => import("../interfaces.js").SilentPaymentEcdhShare;
        encode: (data: import("../interfaces.js").SilentPaymentEcdhShare) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is import("../interfaces.js").SilentPaymentEcdhShare;
        expected: string;
        canAddToArray: (array: import("../interfaces.js").SilentPaymentEcdhShare[], item: import("../interfaces.js").SilentPaymentEcdhShare, dupeSet: Set<string>) => boolean;
    };
    silentPaymentDleq: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => import("../interfaces.js").SilentPaymentDleq;
        encode: (data: import("../interfaces.js").SilentPaymentDleq) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is import("../interfaces.js").SilentPaymentDleq;
        expected: string;
        canAddToArray: (array: import("../interfaces.js").SilentPaymentDleq[], item: import("../interfaces.js").SilentPaymentDleq, dupeSet: Set<string>) => boolean;
    };
};
declare const inputs: {
    nonWitnessUtxo: typeof nonWitnessUtxo;
    partialSig: typeof partialSig;
    sighashType: typeof sighashType;
    finalScriptSig: typeof finalScriptSig;
    finalScriptWitness: typeof finalScriptWitness;
    porCommitment: typeof porCommitment;
    witnessUtxo: typeof witnessUtxo;
    bip32Derivation: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => import("../interfaces.js").Bip32Derivation;
        encode: (data: import("../interfaces.js").Bip32Derivation) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is import("../interfaces.js").Bip32Derivation;
        expected: string;
        canAddToArray: (array: import("../interfaces.js").Bip32Derivation[], item: import("../interfaces.js").Bip32Derivation, dupeSet: Set<string>) => boolean;
    };
    redeemScript: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array;
        encode: (data: Uint8Array) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is Uint8Array;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    witnessScript: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array;
        encode: (data: Uint8Array) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is Uint8Array;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    checkPubkey: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array | undefined;
    tapKeySig: typeof tapKeySig;
    tapScriptSig: typeof tapScriptSig;
    tapLeafScript: typeof tapLeafScript;
    tapBip32Derivation: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => import("../interfaces.js").TapBip32Derivation;
        encode: (data: import("../interfaces.js").TapBip32Derivation) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is import("../interfaces.js").TapBip32Derivation;
        expected: string;
        canAddToArray: (array: import("../interfaces.js").TapBip32Derivation[], item: import("../interfaces.js").TapBip32Derivation, dupeSet: Set<string>) => boolean;
    };
    tapInternalKey: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array;
        encode: (data: Uint8Array) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is Uint8Array;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    tapMerkleRoot: typeof tapMerkleRoot;
    silentPaymentEcdhShare: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => import("../interfaces.js").SilentPaymentEcdhShare;
        encode: (data: import("../interfaces.js").SilentPaymentEcdhShare) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is import("../interfaces.js").SilentPaymentEcdhShare;
        expected: string;
        canAddToArray: (array: import("../interfaces.js").SilentPaymentEcdhShare[], item: import("../interfaces.js").SilentPaymentEcdhShare, dupeSet: Set<string>) => boolean;
    };
    silentPaymentDleq: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => import("../interfaces.js").SilentPaymentDleq;
        encode: (data: import("../interfaces.js").SilentPaymentDleq) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is import("../interfaces.js").SilentPaymentDleq;
        expected: string;
        canAddToArray: (array: import("../interfaces.js").SilentPaymentDleq[], item: import("../interfaces.js").SilentPaymentDleq, dupeSet: Set<string>) => boolean;
    };
};
declare const outputs: {
    bip32Derivation: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => import("../interfaces.js").Bip32Derivation;
        encode: (data: import("../interfaces.js").Bip32Derivation) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is import("../interfaces.js").Bip32Derivation;
        expected: string;
        canAddToArray: (array: import("../interfaces.js").Bip32Derivation[], item: import("../interfaces.js").Bip32Derivation, dupeSet: Set<string>) => boolean;
    };
    redeemScript: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array;
        encode: (data: Uint8Array) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is Uint8Array;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    witnessScript: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array;
        encode: (data: Uint8Array) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is Uint8Array;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    checkPubkey: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array | undefined;
    tapBip32Derivation: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => import("../interfaces.js").TapBip32Derivation;
        encode: (data: import("../interfaces.js").TapBip32Derivation) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is import("../interfaces.js").TapBip32Derivation;
        expected: string;
        canAddToArray: (array: import("../interfaces.js").TapBip32Derivation[], item: import("../interfaces.js").TapBip32Derivation, dupeSet: Set<string>) => boolean;
    };
    tapTree: typeof tapTree;
    tapInternalKey: {
        decode: (keyVal: import("../interfaces.js").KeyValue) => Uint8Array;
        encode: (data: Uint8Array) => import("../interfaces.js").KeyValue;
        check: (data: any) => data is Uint8Array;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    silentPaymentV0Info: typeof silentPaymentV0Info;
    silentPaymentOutputLabel: typeof silentPaymentOutputLabel;
};
export { globals, inputs, outputs };
