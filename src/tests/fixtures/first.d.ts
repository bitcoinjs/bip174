export declare const fixtures: {
    description: string;
    input: string;
    output: {
        globalMap: {
            keyVals: never[];
        };
        inputs: {
            keyVals: never[];
            witnessUtxo: {
                script: string;
                value: number;
            };
            partialSig: {
                pubkey: string;
                signature: string;
            }[];
            redeemScript: string;
            witnessScript: string;
            bip32Derivation: {
                masterFingerprint: string;
                pubkey: string;
                path: string;
            }[];
        }[];
        outputs: {
            keyVals: never[];
        }[];
        unsignedTx: {
            version: number;
            locktime: number;
            ins: {
                hash: string;
                index: number;
                script: string;
                sequence: number;
                witness: never[];
            }[];
            outs: {
                value: number;
                script: string;
            }[];
        };
    };
}[];
