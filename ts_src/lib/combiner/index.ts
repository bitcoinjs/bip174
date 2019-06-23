import { KeyValue, UnsignedTx } from '../interfaces';
import { PsbtAttributes, psbtFromKeyVals, psbtToKeyVals } from '../parser';

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
  const selfKeyVals = psbtToKeyVals(self);
  const others = psbts.slice(1);
  if (others.length === 0) throw new Error('Combine: Nothing to combine');

  const selfTx = getTx(self);
  if (selfTx === undefined) {
    throw new Error('Combine: Self missing transaction');
  }
  const selfGlobalSet = getKeySet(selfKeyVals.globalKeyVals);
  const selfInputSets = selfKeyVals.inputKeyVals.map(input => getKeySet(input));
  const selfOutputSets = selfKeyVals.outputKeyVals.map(output =>
    getKeySet(output),
  );

  for (const other of others) {
    const otherTx = getTx(other);
    if (otherTx === undefined || !otherTx.equals(selfTx)) {
      throw new Error(
        'Combine: One of the Psbts does not have the same transaction.',
      );
    }
    const otherKeyVals = psbtToKeyVals(other);

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
  return psbtFromKeyVals({
    globalMapKeyVals: selfKeyVals.globalKeyVals,
    inputKeyVals: selfKeyVals.inputKeyVals,
    outputKeyVals: selfKeyVals.outputKeyVals,
  });
}

function keyPusher(
  selfSet: Set<string>,
  selfKeyVals: KeyValue[],
  otherKeyVals: KeyValue[],
): (key: string) => void {
  return (key: string): void => {
    if (selfSet.has(key)) return;
    const newKv = otherKeyVals.filter(kv => kv.key.toString('hex') === key)[0];
    selfKeyVals.push(newKv);
  };
}

function getTx(psbt: PsbtAttributes): UnsignedTx | undefined {
  return psbt.globalMap.unsignedTx;
}

function getKeySet(keyVals: KeyValue[]): Set<string> {
  const set: Set<string> = new Set();
  keyVals.forEach(keyVal => {
    const hex = keyVal.key.toString('hex');
    if (set.has(hex))
      throw new Error('Combine: KeyValue Map keys should be unique');
    set.add(hex);
  });
  return set;
}
