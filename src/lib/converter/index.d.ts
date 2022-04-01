/// <reference types="node" />
import * as globalXpub from './global/globalXpub';
import * as unsignedTx from './global/unsignedTx';
import * as finalScriptSig from './input/finalScriptSig';
import * as finalScriptWitness from './input/finalScriptWitness';
import * as nonWitnessUtxo from './input/nonWitnessUtxo';
import * as partialSig from './input/partialSig';
import * as porCommitment from './input/porCommitment';
import * as sighashType from './input/sighashType';
import * as tapKeySig from './input/tapKeySig';
import * as tapLeafScript from './input/tapLeafScript';
import * as tapMerkleRoot from './input/tapMerkleRoot';
import * as tapScriptSig from './input/tapScriptSig';
import * as witnessUtxo from './input/witnessUtxo';
import * as tapTree from './output/tapTree';
declare const globals: {
    unsignedTx: typeof unsignedTx;
    globalXpub: typeof globalXpub;
    checkPubkey: (keyVal: import("../interfaces").KeyValue) => Buffer | undefined;
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
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").Bip32Derivation;
        encode: (data: import("../interfaces").Bip32Derivation) => import("../interfaces").KeyValue;
        check: (data: any) => data is import("../interfaces").Bip32Derivation;
        expected: string;
        canAddToArray: (array: import("../interfaces").Bip32Derivation[], item: import("../interfaces").Bip32Derivation, dupeSet: Set<string>) => boolean;
    };
    redeemScript: {
        decode: (keyVal: import("../interfaces").KeyValue) => Buffer;
        encode: (data: Buffer) => import("../interfaces").KeyValue;
        check: (data: any) => data is Buffer;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    witnessScript: {
        decode: (keyVal: import("../interfaces").KeyValue) => Buffer;
        encode: (data: Buffer) => import("../interfaces").KeyValue;
        check: (data: any) => data is Buffer;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    checkPubkey: (keyVal: import("../interfaces").KeyValue) => Buffer | undefined;
    tapKeySig: typeof tapKeySig;
    tapScriptSig: typeof tapScriptSig;
    tapLeafScript: typeof tapLeafScript;
    tapBip32Derivation: {
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").TapBip32Derivation;
        encode: (data: import("../interfaces").TapBip32Derivation) => import("../interfaces").KeyValue;
        check: (data: any) => data is import("../interfaces").TapBip32Derivation;
        expected: string;
        canAddToArray: (array: import("../interfaces").TapBip32Derivation[], item: import("../interfaces").TapBip32Derivation, dupeSet: Set<string>) => boolean;
    };
    tapInternalKey: {
        decode: (keyVal: import("../interfaces").KeyValue) => Buffer;
        encode: (data: Buffer) => import("../interfaces").KeyValue;
        check: (data: any) => data is Buffer;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    tapMerkleRoot: typeof tapMerkleRoot;
};
declare const outputs: {
    bip32Derivation: {
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").Bip32Derivation;
        encode: (data: import("../interfaces").Bip32Derivation) => import("../interfaces").KeyValue;
        check: (data: any) => data is import("../interfaces").Bip32Derivation;
        expected: string;
        canAddToArray: (array: import("../interfaces").Bip32Derivation[], item: import("../interfaces").Bip32Derivation, dupeSet: Set<string>) => boolean;
    };
    redeemScript: {
        decode: (keyVal: import("../interfaces").KeyValue) => Buffer;
        encode: (data: Buffer) => import("../interfaces").KeyValue;
        check: (data: any) => data is Buffer;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    witnessScript: {
        decode: (keyVal: import("../interfaces").KeyValue) => Buffer;
        encode: (data: Buffer) => import("../interfaces").KeyValue;
        check: (data: any) => data is Buffer;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
    checkPubkey: (keyVal: import("../interfaces").KeyValue) => Buffer | undefined;
    tapBip32Derivation: {
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").TapBip32Derivation;
        encode: (data: import("../interfaces").TapBip32Derivation) => import("../interfaces").KeyValue;
        check: (data: any) => data is import("../interfaces").TapBip32Derivation;
        expected: string;
        canAddToArray: (array: import("../interfaces").TapBip32Derivation[], item: import("../interfaces").TapBip32Derivation, dupeSet: Set<string>) => boolean;
    };
    tapTree: typeof tapTree;
    tapInternalKey: {
        decode: (keyVal: import("../interfaces").KeyValue) => Buffer;
        encode: (data: Buffer) => import("../interfaces").KeyValue;
        check: (data: any) => data is Buffer;
        expected: string;
        canAdd: (currentData: any, newData: any) => boolean;
    };
};
export { globals, inputs, outputs };
