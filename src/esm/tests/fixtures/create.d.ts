/// <reference types="node" />
export declare const fixtures: {
    description: string;
    input: {
        addInputs: {
            hash: string;
            index: number;
        }[];
        addOutputs: {
            script: Buffer;
            value: bigint;
        }[];
        updateInputData: ({
            nonWitnessUtxo: Buffer;
            redeemScript: Buffer;
            bip32Derivation: {
                masterFingerprint: Buffer;
                pubkey: Buffer;
                path: string;
            }[];
            witnessUtxo?: undefined;
            witnessScript?: undefined;
        } | {
            witnessUtxo: {
                script: Buffer;
                value: bigint;
            };
            redeemScript: Buffer;
            witnessScript: Buffer;
            bip32Derivation: {
                masterFingerprint: Buffer;
                pubkey: Buffer;
                path: string;
            }[];
            nonWitnessUtxo?: undefined;
        })[];
        updateOutputData: {
            bip32Derivation: {
                masterFingerprint: Buffer;
                pubkey: Buffer;
                path: string;
            }[];
        }[];
    };
    expectedBeforeUpdate: string;
    expectedAfterUpdate: string;
}[];
