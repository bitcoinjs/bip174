'use strict';
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_js_1 = require('../typeFields.js');
const globalXpub = __importStar(require('./global/globalXpub.js'));
const unsignedTx = __importStar(require('./global/unsignedTx.js'));
const finalScriptSig = __importStar(require('./input/finalScriptSig.js'));
const finalScriptWitness = __importStar(
  require('./input/finalScriptWitness.js'),
);
const nonWitnessUtxo = __importStar(require('./input/nonWitnessUtxo.js'));
const partialSig = __importStar(require('./input/partialSig.js'));
const porCommitment = __importStar(require('./input/porCommitment.js'));
const sighashType = __importStar(require('./input/sighashType.js'));
const tapKeySig = __importStar(require('./input/tapKeySig.js'));
const tapLeafScript = __importStar(require('./input/tapLeafScript.js'));
const tapMerkleRoot = __importStar(require('./input/tapMerkleRoot.js'));
const tapScriptSig = __importStar(require('./input/tapScriptSig.js'));
const witnessUtxo = __importStar(require('./input/witnessUtxo.js'));
const tapTree = __importStar(require('./output/tapTree.js'));
const bip32Derivation = __importStar(require('./shared/bip32Derivation.js'));
const checkPubkey = __importStar(require('./shared/checkPubkey.js'));
const redeemScript = __importStar(require('./shared/redeemScript.js'));
const tapBip32Derivation = __importStar(
  require('./shared/tapBip32Derivation.js'),
);
const tapInternalKey = __importStar(require('./shared/tapInternalKey.js'));
const witnessScript = __importStar(require('./shared/witnessScript.js'));
const globals = {
  unsignedTx,
  globalXpub,
  // pass an Array of key bytes that require pubkey beside the key
  checkPubkey: checkPubkey.makeChecker([]),
};
exports.globals = globals;
const inputs = {
  nonWitnessUtxo,
  partialSig,
  sighashType,
  finalScriptSig,
  finalScriptWitness,
  porCommitment,
  witnessUtxo,
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_js_1.InputTypes.BIP32_DERIVATION,
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_js_1.InputTypes.REDEEM_SCRIPT,
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_js_1.InputTypes.WITNESS_SCRIPT,
  ),
  checkPubkey: checkPubkey.makeChecker([
    typeFields_js_1.InputTypes.PARTIAL_SIG,
    typeFields_js_1.InputTypes.BIP32_DERIVATION,
  ]),
  tapKeySig,
  tapScriptSig,
  tapLeafScript,
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_js_1.InputTypes.TAP_BIP32_DERIVATION,
  ),
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_js_1.InputTypes.TAP_INTERNAL_KEY,
  ),
  tapMerkleRoot,
};
exports.inputs = inputs;
const outputs = {
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_js_1.OutputTypes.BIP32_DERIVATION,
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_js_1.OutputTypes.REDEEM_SCRIPT,
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_js_1.OutputTypes.WITNESS_SCRIPT,
  ),
  checkPubkey: checkPubkey.makeChecker([
    typeFields_js_1.OutputTypes.BIP32_DERIVATION,
  ]),
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_js_1.OutputTypes.TAP_BIP32_DERIVATION,
  ),
  tapTree,
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_js_1.OutputTypes.TAP_INTERNAL_KEY,
  ),
};
exports.outputs = outputs;
