import { PsbtAttributes } from '../parser';

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

export function combine(psbts: PsbtAttributes[]): PsbtAttributes {
  const self = psbts[0];
  const others = psbts.slice(1);
  if (others.length === 0) throw new Error('Combine: Nothing to combine');

  for (const other of others) {
    const txKeyVal = other.globalMap.keyVals.filter(kv =>
      kv.key.equals(Buffer.from([0])),
    )[0];
    txKeyVal.key = Buffer.from([]);
  }
  return self;
}
