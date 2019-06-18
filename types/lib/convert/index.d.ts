import * as unsignedTx from './global/unsignedTx';
import * as finalScriptSig from './input/finalScriptSig';
import * as finalScriptWitness from './input/finalScriptWitness';
import * as nonWitnessUtxo from './input/nonWitnessUtxo';
import * as partialSig from './input/partialSig';
import * as porCommitment from './input/porCommitment';
import * as sighashType from './input/sighashType';
import * as witnessUtxo from './input/witnessUtxo';
declare const globals: {
    unsignedTx: typeof unsignedTx;
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
    };
    redeemScript: {
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").RedeemScript;
        encode: (data: import("../interfaces").RedeemScript) => import("../interfaces").KeyValue;
    };
    witnessScript: {
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").WitnessScript;
        encode: (data: import("../interfaces").WitnessScript) => import("../interfaces").KeyValue;
    };
};
declare const outputs: {
    bip32Derivation: {
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").Bip32Derivation;
        encode: (data: import("../interfaces").Bip32Derivation) => import("../interfaces").KeyValue;
    };
    redeemScript: {
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").RedeemScript;
        encode: (data: import("../interfaces").RedeemScript) => import("../interfaces").KeyValue;
    };
    witnessScript: {
        decode: (keyVal: import("../interfaces").KeyValue) => import("../interfaces").WitnessScript;
        encode: (data: import("../interfaces").WitnessScript) => import("../interfaces").KeyValue;
    };
};
export { globals, inputs, outputs };
