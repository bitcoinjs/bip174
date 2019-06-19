'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const parser_1 = require('../parser');
const typeFields_1 = require('../typeFields');
/*
Possible outcomes:
1. Update TX with new inputs or outputs. Keep as much as possible never remove.
  - Check sigs and sighashes on self, depending on state, reject merge (Don't want to invalidate sigs)
  - New inputs must have WITNESS_TXOUT or NON_WITNESS_TXOUT
    - If prevoutScript is PS2H must have RedeemScript, P2WSH must have WitnessScript
    - If Redeemscript is P2WSH, must have WitnessScript
    - If no sighashType is explicitly shown, add SIGHASH_ALL
  - New outputs are copied over as-is
  - Before adding
2.

TODO:
1. Create self input and output indexes where key is txid:vout for input and scriptPubkey for output.
2. For each input in self:
  1. Get all partialSig
  2. Get SigHashType
  3. If no sigs, inputs and outputs can be added.
  4. If all inputs with sig(s) have SIGHASH_ANYONECANPAY, inputs can be added.
  5. If all inputs with sig(s) have SIGHASH_NONE, outputs can be added.
  6. If any inputs with sig(s) have SIGHASH_SINGLE,
*/
function combine(psbts) {
  const self = psbts[0];
  const selfKeyVals = parser_1.psbtToKeyVals(self);
  const others = psbts.slice(1);
  if (others.length === 0) throw new Error('Combine: Nothing to combine');
  const selfTxKeyVal = getTx(self);
  if (selfTxKeyVal === undefined) {
    throw new Error('Combine: Self missing transaction');
  }
  const selfGlobalSet = getKeySet(selfKeyVals.globalKeyVals);
  const selfInputSets = selfKeyVals.inputKeyVals.map(input => getKeySet(input));
  const selfOutputSets = selfKeyVals.outputKeyVals.map(output =>
    getKeySet(output),
  );
  for (const other of others) {
    const otherTxKeyVal = getTx(other);
    if (
      otherTxKeyVal === undefined ||
      !otherTxKeyVal.value.equals(selfTxKeyVal.value)
    ) {
      throw new Error(
        'Combine: One of the Psbts does not have the same transaction.',
      );
    }
    const otherKeyVals = parser_1.psbtToKeyVals(other);
    const otherGlobalSet = getKeySet(otherKeyVals.globalKeyVals);
    otherGlobalSet.forEach(
      keyPusher(
        selfGlobalSet,
        selfKeyVals.globalKeyVals,
        otherKeyVals.globalKeyVals,
      ),
    );
    const otherInputSets = otherKeyVals.inputKeyVals.map(input =>
      getKeySet(input),
    );
    otherInputSets.forEach((inputSet, idx) =>
      inputSet.forEach(
        keyPusher(
          selfInputSets[idx],
          selfKeyVals.inputKeyVals[idx],
          otherKeyVals.inputKeyVals[idx],
        ),
      ),
    );
    const otherOutputSets = otherKeyVals.outputKeyVals.map(output =>
      getKeySet(output),
    );
    otherOutputSets.forEach((outputSet, idx) =>
      outputSet.forEach(
        keyPusher(
          selfOutputSets[idx],
          selfKeyVals.outputKeyVals[idx],
          otherKeyVals.outputKeyVals[idx],
        ),
      ),
    );
  }
  return parser_1.psbtFromKeyVals({
    globalMapKeyVals: selfKeyVals.globalKeyVals,
    inputKeyVals: selfKeyVals.inputKeyVals,
    outputKeyVals: selfKeyVals.outputKeyVals,
  });
}
exports.combine = combine;
function keyPusher(selfGlobalSet, selfGlobalKeyVals, otherGlobalKeyVals) {
  return key => {
    if (selfGlobalSet.has(key)) return;
    const newKv = otherGlobalKeyVals.filter(
      kv => kv.key.toString('hex') === key,
    )[0];
    selfGlobalKeyVals.push(newKv);
  };
}
function getTx(psbt) {
  return psbt.globalMap.keyVals.filter(kv =>
    kv.key.equals(Buffer.from([typeFields_1.GlobalTypes.UNSIGNED_TX])),
  )[0];
}
function getKeySet(keyVals) {
  const set = new Set();
  keyVals.forEach(keyVal => {
    const hex = keyVal.key.toString('hex');
    if (set.has(hex))
      throw new Error('Combine: KeyValue Map keys should be unique');
    set.add(hex);
  });
  return set;
}
