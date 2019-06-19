export declare const fixtures: {
    description: string;
    input: string;
    output: {
        globalMap: {
            keyVals: {
                key: string;
                value: string;
            }[];
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
    };
}[];
