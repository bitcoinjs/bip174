import * as unsignedTx from './global/unsignedTx';
import * as nonWitnessUtxo from './input/nonWitnessUtxo';
import * as partialSig from './input/partialSig';
import * as witnessUtxo from './input/witnessUtxo';
import * as bip32Derivation from './shared/bip32Derivation';

const globals = {
  unsignedTx,
};

const inputs = {
  bip32Derivation,
  nonWitnessUtxo,
  partialSig,
  witnessUtxo,
};

const outputs = {
  bip32Derivation,
};

export { globals, inputs, outputs };
