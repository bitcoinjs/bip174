"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decode_psbt_1 = require("./decode_psbt");
const encode_signature_1 = require("./encode_signature");
const update_psbt_1 = require("./update_psbt");
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
function combinePsbts({ psbts }) {
    const additionalAttributes = [];
    const globalAttributes = {};
    const inputAttributes = [];
    const outputAttributes = [];
    const [referencePsbt] = psbts;
    const signatures = [];
    let tx;
    psbts
        .map(psbt => decode_psbt_1.decodePsbt({ psbt }))
        .forEach(decoded => {
        // Transactions must be unique for all combined psbts
        if (!!tx && tx !== decoded.unsigned_transaction) {
            throw new Error('ExpectedUniqueTransaction');
        }
        tx = tx || decoded.unsigned_transaction;
        // Index unknown global attributes for preservation across combines
        (decoded.unrecognized_attributes || []).forEach(({ type, value }) => {
            globalAttributes[type] = value;
            return value;
        });
        // Iterate through inputs to push signatures, index unknown attributes
        decoded.inputs.forEach((input, vin) => {
            (input.unrecognized_attributes || []).forEach(({ type, value }) => {
                inputAttributes[vin] = inputAttributes[vin] || {};
                inputAttributes[vin][type] = value;
                return value;
            });
            return (input.partial_sig || []).forEach(partial => {
                return signatures.push({
                    vin,
                    hash_type: partial.hash_type,
                    public_key: partial.public_key,
                    signature: encode_signature_1.encodeSignature({
                        flag: partial.hash_type,
                        signature: partial.signature,
                    }),
                });
            });
        });
        // Index unrecognized output attributes by vout
        decoded.outputs.forEach((output, vout) => {
            return (output.unrecognized_attributes || []).forEach((pair) => {
                outputAttributes[vout] = outputAttributes[vout] || {};
                outputAttributes[vout][pair.type] = pair.value;
                return pair.value;
            });
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
        return update_psbt_1.updatePsbt({
            signatures,
            additional_attributes: additionalAttributes,
            psbt: referencePsbt,
        });
    }
    catch (err) {
        throw err;
    }
}
exports.combinePsbts = combinePsbts;
