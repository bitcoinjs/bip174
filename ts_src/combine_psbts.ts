import { decodePsbt } from './decode_psbt';
import { encodeSignature } from './encode_signature';
import { updatePsbt } from './update_psbt';

export interface CombinePsbtsInput {
  psbts: string[];
}

export interface CombinePsbtsOutput {
  psbt: string;
}

interface Attribute {
  type: string;
  value: string;
  vin?: number;
  vout?: number;
}

interface Signature {
  vin: number;
  hash_type: number;
  public_key: string;
  signature: Buffer;
}

/** Combine multiple PSBTs
  {
    psbts: [<BIP 174 Encoded PSBT Hex String>]
  }
  @throws
  <Combine PSBT Error>

  @returns
  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }
*/
export function combinePsbts({ psbts }: CombinePsbtsInput): CombinePsbtsOutput {
  const additionalAttributes: Attribute[] = [];
  const globalAttributes: {} = {};
  const inputAttributes: Attribute[] = [];
  const outputAttributes: Attribute[] = [];
  const [referencePsbt] = psbts;
  const signatures: Signature[] = [];
  let tx: string;

  psbts
    .map(psbt => decodePsbt({ psbt }))
    .forEach(decoded => {
      // Transactions must be unique for all combined psbts
      if (!!tx && tx !== decoded.unsigned_transaction) {
        throw new Error('ExpectedUniqueTransaction');
      }

      tx = tx || decoded.unsigned_transaction;

      // Index unknown global attributes for preservation across combines
      (decoded.unrecognized_attributes || []).forEach(
        ({ type, value }: Attribute) => {
          globalAttributes[type] = value;
          return value;
        },
      );

      // Iterate through inputs to push signatures, index unknown attributes
      decoded.inputs.forEach((input, vin) => {
        (input.unrecognized_attributes || []).forEach(
          ({ type, value }: Attribute) => {
            inputAttributes[vin] = inputAttributes[vin] || {};

            inputAttributes[vin][type] = value;
            return value;
          },
        );

        return (input.partial_sig || []).forEach(partial => {
          return signatures.push({
            vin,
            hash_type: partial.hash_type,
            public_key: partial.public_key,
            signature: encodeSignature({
              flag: partial.hash_type,
              signature: partial.signature,
            }),
          });
        });
      });

      // Index unrecognized output attributes by vout
      decoded.outputs.forEach((output, vout) => {
        return (output.unrecognized_attributes || []).forEach(
          (pair: Attribute) => {
            outputAttributes[vout] = outputAttributes[vout] || {};

            outputAttributes[vout][pair.type] = pair.value;
            return pair.value;
          },
        );
      });
    });

  // Fold up global unrecognized attributes
  Object.keys(globalAttributes)
    .sort()
    .forEach(type => {
      return additionalAttributes.push({ type, value: globalAttributes[type] });
    });

  // Fold up input attributes
  inputAttributes.forEach((attributes, vin) => {
    return Object.keys(attributes)
      .sort()
      .forEach(type => {
        return additionalAttributes.push({
          type,
          vin,
          value: attributes[type],
        });
      });
  });

  // Fold up output attributes
  outputAttributes.forEach((attributes, vout) => {
    return Object.keys(attributes)
      .sort()
      .forEach(type => {
        return additionalAttributes.push({
          type,
          vout,
          value: attributes[type],
        });
      });
  });

  try {
    return updatePsbt({
      signatures,
      additional_attributes: additionalAttributes,
      psbt: referencePsbt,
    });
  } catch (err) {
    throw err;
  }
}
