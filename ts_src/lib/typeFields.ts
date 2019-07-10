export enum GlobalTypes {
  UNSIGNED_TX,
  GLOBAL_XPUB,
}
export const GLOBAL_TYPE_NAMES = ['unsignedTx', 'globalXpub'];

export enum InputTypes {
  NON_WITNESS_UTXO,
  WITNESS_UTXO,
  PARTIAL_SIG, // multiple OK, key contains pubkey
  SIGHASH_TYPE,
  REDEEM_SCRIPT,
  WITNESS_SCRIPT,
  BIP32_DERIVATION, // multiple OK, key contains pubkey
  FINAL_SCRIPTSIG,
  FINAL_SCRIPTWITNESS,
  POR_COMMITMENT,
}
export const INPUT_TYPE_NAMES = [
  'nonWitnessUtxo',
  'witnessUtxo',
  'partialSig',
  'sighashType',
  'redeemScript',
  'witnessScript',
  'bip32Derivation',
  'finalScriptSig',
  'finalScriptWitness',
  'porCommitment',
];

export enum OutputTypes {
  REDEEM_SCRIPT,
  WITNESS_SCRIPT,
  BIP32_DERIVATION, // multiple OK, key contains pubkey
}
export const OUTPUT_TYPE_NAMES = [
  'redeemScript',
  'witnessScript',
  'bip32Derivation',
];
