import * as unsignedTx from './global/unsignedTx';
import * as nonWitnessUtxo from './input/nonWitnessUtxo';
import * as partialSig from './input/partialSig';
import * as witnessUtxo from './input/witnessUtxo';
import * as bip32Derivation from './shared/bip32Derivation';
declare const globals: {
    unsignedTx: typeof unsignedTx;
};
declare const inputs: {
    bip32Derivation: typeof bip32Derivation;
    nonWitnessUtxo: typeof nonWitnessUtxo;
    partialSig: typeof partialSig;
    witnessUtxo: typeof witnessUtxo;
};
declare const outputs: {
    bip32Derivation: typeof bip32Derivation;
};
export { globals, inputs, outputs };
