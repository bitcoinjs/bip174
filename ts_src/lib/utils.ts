import { KeyValue, PsbtInput, PsbtOutput } from './interfaces';
import { Psbt } from './psbt';
import { INPUT_TYPE_NAMES, OUTPUT_TYPE_NAMES } from './typeFields';

export function checkForInput(
  inputs: PsbtInput[],
  inputIndex: number,
): PsbtInput {
  const input = inputs[inputIndex];
  if (input === undefined) throw new Error(`No input #${inputIndex}`);
  return input;
}

export function checkForOutput(
  outputs: PsbtOutput[],
  outputIndex: number,
): PsbtOutput {
  const output = outputs[outputIndex];
  if (output === undefined) throw new Error(`No output #${outputIndex}`);
  return output;
}

export function checkHasKey(
  checkKeyVal: KeyValue,
  keyVals: KeyValue[] | undefined,
  enumLength: number,
): void {
  if (checkKeyVal.key[0] < enumLength) {
    throw new Error(
      `Use the method for your specific key instead of addUnknownKeyVal*`,
    );
  }
  if (
    keyVals &&
    keyVals.filter(kv => kv.key.equals(checkKeyVal.key)).length !== 0
  ) {
    throw new Error(`Duplicate Key: ${checkKeyVal.key.toString('hex')}`);
  }
}

export function getEnumLength(myenum: any): number {
  let count = 0;
  Object.keys(myenum).forEach(val => {
    if (Number(isNaN(Number(val)))) {
      count++;
    }
  });
  return count;
}

export function inputCheckUncleanFinalized(
  inputIndex: number,
  input: PsbtInput,
): void {
  let result: boolean = false;
  const isP2SH = !!input.redeemScript;
  const isP2WSH = !!input.witnessScript;
  const isNonSegwit = !!input.nonWitnessUtxo;
  const isSegwit = !!input.witnessUtxo;
  if (isSegwit !== isNonSegwit) {
    const needScriptSig = isNonSegwit || (isSegwit && isP2SH);
    const needWitnessScript = isSegwit && isP2WSH;
    const scriptSigOK = !needScriptSig || !!input.finalScriptSig;
    const witnessScriptOK = !needWitnessScript || !!input.finalScriptWitness;
    result = scriptSigOK && witnessScriptOK;
  }
  if (result === false) {
    throw new Error(
      `Input #${inputIndex} has too much or too little data to clean`,
    );
  }
}

export function addInputAttributes<T extends typeof Psbt>(
  psbt: InstanceType<T>,
  data: any,
): void {
  const inputIndex = psbt.inputs.length - 1;
  for (const name of INPUT_TYPE_NAMES) {
    const item = data[name];
    if (item) {
      const nameUpper = name.replace(/^\S/, s => s.toUpperCase());
      // @ts-ignore
      psbt[`add${nameUpper}ToInput`](inputIndex, item);
    }
  }
}

export function addOutputAttributes<T extends typeof Psbt>(
  psbt: InstanceType<T>,
  data: any,
): void {
  const outputIndex = psbt.outputs.length - 1;
  for (const name of OUTPUT_TYPE_NAMES) {
    const item = data[name];
    if (item) {
      const nameUpper = name.replace(/^\S/, s => s.toUpperCase());
      // @ts-ignore
      psbt[`add${nameUpper}ToOutput`](outputIndex, item);
    }
  }
}

export function defaultVersionSetter(version: number, txBuf: Buffer): Buffer {
  if (!Buffer.isBuffer(txBuf) || txBuf.length < 4) {
    throw new Error('Set Version: Invalid Transaction');
  }
  txBuf.writeUInt32LE(version, 0);
  return txBuf;
}

export function defaultLocktimeSetter(locktime: number, txBuf: Buffer): Buffer {
  if (!Buffer.isBuffer(txBuf) || txBuf.length < 4) {
    throw new Error('Set Locktime: Invalid Transaction');
  }
  txBuf.writeUInt32LE(locktime, txBuf.length - 4);
  return txBuf;
}
