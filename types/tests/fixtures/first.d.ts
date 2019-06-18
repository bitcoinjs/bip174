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
            keyVals: {
                key: string;
                value: string;
            }[];
            witnessUtxo: {
                index: number;
                data: {
                    script: string;
                    value: number;
                };
            };
            partialSigs: {
                index: number;
                pubkey: string;
                signature: string;
            }[];
            redeemScript: {
                index: number;
                data: string;
            };
            witnessScript: {
                index: number;
                data: string;
            };
            bip32Derivation: {
                index: number;
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
