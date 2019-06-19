'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
/*

Possible outcomes:
1. Update TX with new inputs or outputs. Keep as much as possible never remove.
  - New inputs must have WITNESS_TXOUT or NON_WITNESS_TXOUT
  - New outputs must have
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
  const others = psbts.slice(1);
  if (others.length === 0) throw new Error('Combine: Nothing to combine');
  for (const other of others) {
    const txKeyVal = other.globalMap.keyVals.filter(kv =>
      kv.key.equals(Buffer.from([0])),
    )[0];
    if (!checkTxWithKeyVal(other.unsignedTx, txKeyVal)) {
      continue;
    }
  }
  return self;
}
exports.combine = combine;
function checkTxWithKeyVal(tx, kv) {
  const txBuf = tx.toBuffer();
  return txBuf.equals(kv.value);
}
exports.checkTxWithKeyVal = checkTxWithKeyVal;
function checkTxWithTx(tx1, tx2) {
  const txBuf1 = tx1.toBuffer();
  const txBuf2 = tx2.toBuffer();
  return txBuf1.equals(txBuf2);
}
exports.checkTxWithTx = checkTxWithTx;
