/// <reference types="node" />
export interface DecodePsbtsInput {
    psbt: string;
}
export interface Input {
    bip32_derivations?: {
        fingerprint: string;
        path: string;
        public_key: string;
    }[];
    final_scriptsig?: string;
    final_scriptwitness?: string;
    non_witness_utxo?: string;
    partial_sig?: {
        hash_type: number;
        public_key: string;
        signature: string;
    }[];
    redeem_script?: string;
    redeem_script_hash?: Buffer;
    sighash_type?: number;
    unrecognized_attributes?: {
        type: string;
        value: string;
    }[];
    witness_script?: string;
    witness_script_hash?: Buffer;
    witness_utxo?: {
        script_pub: string;
        tokens: number;
    };
}
export interface Output {
    bip32_derivation?: {
        fingerprint: string;
        path: string;
        public_key: string;
    };
    redeem_script?: string;
    unrecognized_attributes?: {
        type: string;
        value: string;
    }[];
    witness_script?: string;
}
export interface DecodePsbtsOutput {
    inputs: Input[];
    outputs: Output[];
    pairs: {
        type: string;
        value: string;
    }[];
    unrecognized_attributes?: {
        type: string;
        value: string;
    }[];
    unsigned_transaction?: string;
}
/** Decode a BIP 174 encoded PSBT

  {
    psbt: <Hex Encoded Partially Signed Bitcoin Transaction String>
  }

  @throws
  <Invalid PSBT Error>

  @returns
  {
    inputs: [{
       [bip32_derivations]: [{
          fingerprint: <Public Key Fingerprint Hex String>
          path: <BIP 32 Child / Hardened Child / Index Derivation Path String>
          public_key: <Public Key Hex String>
      }]
      [final_scriptsig]: <Final ScriptSig Hex String>
      [final_scriptwitness]: <Final Script Witness Hex String>
      [non_witness_utxo]: <Non-Witness Hex Encoded Transaction String>
      [partial_sig]: [{
        hash_type: <Signature Hash Type Number>
        public_key: <Public Key Hex String>
        signature: <Signature Hex String>
      }]
      [redeem_script]: <Hex Encoded Redeem Script String>
      [sighash_type]: <Sighash Type Number>
      [unrecognized_attributes]: [{
        type: <Key Type Hex String>
        value: <Value Hex String>
      }]
      [witness_script]: <Witness Script Hex String>
      [witness_utxo]: {
        script_pub: <UTXO ScriptPub Hex String>
        tokens: <Tokens Number>
      }
    }]
    outputs: [{
      [bip32_derivation]: {
        fingerprint: <Public Key Fingerprint Hex String>
        path: <BIP 32 Child/HardenedChild/Index Derivation Path Hex String>
        public_key: <Public Key Hex String>
      }
      [redeem_script]: <Hex Encoded Redeem Script>
      [unrecognized_attributes]: [{
        type: <Key Type Hex String>
        value: <Value Hex String>
      }]
      [witness_script]: <Hex Encoded Witness Script>
    }]
    pairs: [{
      type: <Key Type Hex String>
      value: <Value Hex String>
    }]
    [unrecognized_attributes]: [{
      type: <Global Key Type Hex String>
      value: <Global Value Hex String>
    }]
    unsigned_transaction: <Unsigned Transaction Hex String>
  }
*/
export declare function decodePsbt({ psbt }: DecodePsbtsInput): DecodePsbtsOutput;
