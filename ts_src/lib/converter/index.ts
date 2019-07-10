import { InputTypes, OutputTypes } from '../typeFields';

import * as globalXpub from './global/globalXpub';
import * as unsignedTx from './global/unsignedTx';

import * as finalScriptSig from './input/finalScriptSig';
import * as finalScriptWitness from './input/finalScriptWitness';
import * as nonWitnessUtxo from './input/nonWitnessUtxo';
import * as partialSig from './input/partialSig';
import * as porCommitment from './input/porCommitment';
import * as sighashType from './input/sighashType';
import * as witnessUtxo from './input/witnessUtxo';

import * as bip32Derivation from './shared/bip32Derivation';
import * as checkPubkey from './shared/checkPubkey';
import * as redeemScript from './shared/redeemScript';
import * as witnessScript from './shared/witnessScript';

const globals = {
  unsignedTx,
  globalXpub,
  // pass an Array of key bytes that require pubkey beside the key
  checkPubkey: checkPubkey.makeChecker([]),
};

const inputs = {
  nonWitnessUtxo,
  partialSig,
  sighashType,
  finalScriptSig,
  finalScriptWitness,
  porCommitment,
  witnessUtxo,
  bip32Derivation: bip32Derivation.makeConverter(InputTypes.BIP32_DERIVATION),
  redeemScript: redeemScript.makeConverter(InputTypes.REDEEM_SCRIPT),
  witnessScript: witnessScript.makeConverter(InputTypes.WITNESS_SCRIPT),
  checkPubkey: checkPubkey.makeChecker([
    InputTypes.PARTIAL_SIG,
    InputTypes.BIP32_DERIVATION,
  ]),
};

const outputs = {
  bip32Derivation: bip32Derivation.makeConverter(OutputTypes.BIP32_DERIVATION),
  redeemScript: redeemScript.makeConverter(OutputTypes.REDEEM_SCRIPT),
  witnessScript: witnessScript.makeConverter(OutputTypes.WITNESS_SCRIPT),
  checkPubkey: checkPubkey.makeChecker([OutputTypes.BIP32_DERIVATION]),
};

export { globals, inputs, outputs };
