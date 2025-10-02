export enum GlobalTypes {
  UNSIGNED_TX,
  GLOBAL_XPUB,
  GLOBAL_SP_ECDH_SHARE = 0x07,
  GLOBAL_SP_DLEQ,
}
export const GLOBAL_TYPE_NAMES = [
  'unsignedTx',
  'globalXpub',
  'silentPaymentEcdhShare',
  'silentPaymentDleq',
];

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
  TAP_KEY_SIG = 0x13,
  TAP_SCRIPT_SIG, // multiple OK, key contains x-only pubkey
  TAP_LEAF_SCRIPT, // multiple OK, key contains controlblock
  TAP_BIP32_DERIVATION, // multiple OK, key contains x-only pubkey
  TAP_INTERNAL_KEY,
  TAP_MERKLE_ROOT,
  SP_ECDH_SHARE = 0x1d, // multiple OK, key contains silent payment scanKey
  SP_DLEQ, // multiple OK, key contains silent payment scanKey
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
  'tapKeySig',
  'tapScriptSig',
  'tapLeafScript',
  'tapBip32Derivation',
  'tapInternalKey',
  'tapMerkleRoot',
  'silentPaymentEcdhShare',
  'silentPaymentDleq',
];

export enum OutputTypes {
  REDEEM_SCRIPT,
  WITNESS_SCRIPT,
  BIP32_DERIVATION, // multiple OK, key contains pubkey
  TAP_INTERNAL_KEY = 0x05,
  TAP_TREE,
  TAP_BIP32_DERIVATION, // multiple OK, key contains x-only pubkey
  SP_V0_INFO = 0x09,
  SP_V0_LABEL,
}
export const OUTPUT_TYPE_NAMES = [
  'redeemScript',
  'witnessScript',
  'bip32Derivation',
  'tapInternalKey',
  'tapTree',
  'tapBip32Derivation',
  'silentPaymentV0Info',
  'silentPaymentV0Label',
];
