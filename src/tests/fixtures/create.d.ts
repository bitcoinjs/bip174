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
            value: number;
        }[];
        updateInputData: never[];
        updateOutputData: never[];
    };
    expected: string;
}[];
