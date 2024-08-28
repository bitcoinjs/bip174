/// <reference types="node" />
export declare const fixtures: {
    valid: ({
        method: string;
        addInputOutput: boolean;
        args: {
            globalXpub: {
                masterFingerprint: Buffer;
                extendedPubkey: Buffer;
                path: string;
            }[];
        }[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            nonWitnessUtxo: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            witnessUtxo: {
                script: Buffer;
                value: bigint;
            };
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            partialSig: {
                pubkey: Buffer;
                signature: Buffer;
            }[];
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            tapInternalKey: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            tapMerkleRoot: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            tapKeySig: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            tapScriptSig: {
                pubkey: Buffer;
                leafHash: Buffer;
                signature: Buffer;
            }[];
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            tapLeafScript: {
                controlBlock: Buffer;
                script: Buffer;
                leafVersion: number;
            }[];
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            sighashType: number;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            redeemScript: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            witnessScript: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            bip32Derivation: {
                masterFingerprint: Buffer;
                path: string;
                pubkey: Buffer;
            }[];
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            tapBip32Derivation: {
                leafHashes: Buffer[];
                masterFingerprint: Buffer;
                path: string;
                pubkey: Buffer;
            }[];
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            finalScriptSig: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            finalScriptWitness: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            porCommitment: string;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            tapTree: {
                leaves: {
                    depth: number;
                    script: Buffer;
                    leafVersion: number;
                }[];
            };
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            key: Buffer;
            value: Buffer;
        })[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: {
            hash: string;
            index: number;
        }[];
        expected: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: {
            script: Buffer;
            value: number;
        }[];
        expected: string;
    })[];
    invalid: ({
        method: string;
        addInputOutput: boolean;
        args: {
            globalXpub: number;
        }[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: {
            globalXpub: number[];
        }[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            nonWitnessUtxo: string;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | {
            nonWitnessUtxo: Buffer;
        })[];
        exception: string;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | {
            partialSig: {
                pubkey: Buffer;
                signature: Buffer;
            }[];
        })[];
        exception: string;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | {
            tapScriptSig: {
                pubkey: Buffer;
                leafHash: Buffer;
                signature: Buffer;
            }[];
        })[];
        exception: string;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | {
            tapLeafScript: {
                controlBlock: Buffer;
                script: Buffer;
                leafVersion: number;
            }[];
        })[];
        exception: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            witnessUtxo: {
                scripty: Buffer;
                vyalue: number;
            };
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | {
            witnessUtxo: {
                script: Buffer;
                value: bigint;
            };
        })[];
        exception: string;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            partialSig: {
                pubkdey: Buffer;
                signdature: Buffer;
            }[];
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            sighashType: string;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            redeemScript: string;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            witnessScript: string;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            bip32Derivation: {
                a: number;
            }[];
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            finalScriptSig: number;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            finalScriptWitness: number;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            porCommitment: number;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            redeemScript: number;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            witnessScript: number;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | Buffer)[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: {
            hash: string;
            index: number;
            unknownKeyVals: number;
        }[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: {
            script: Buffer;
            value: number;
            unknownKeyVals: number;
        }[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: {
            key: Buffer;
            value: Buffer;
        }[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: {
            key: Buffer;
            value: Buffer;
        }[];
        exception: string;
    })[];
};
