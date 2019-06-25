/// <reference types="node" />
export declare const fixtures: {
    valid: ({
        method: string;
        addInputOutput: boolean;
        args: (Buffer | ((txBuf: any) => any))[];
        expected: string;
        twice?: undefined;
        switchTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | Buffer)[];
        expected: string;
        twice?: undefined;
        switchTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            script: Buffer;
            value: number;
        })[];
        expected: string;
        twice?: undefined;
        switchTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | {
            pubkey: Buffer;
            signature: Buffer;
        })[];
        expected: string;
        switchTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            masterFingerprint: Buffer;
            path: string;
            pubkey: Buffer;
        })[];
        expected: string;
        twice?: undefined;
        switchTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (string | number)[];
        expected: string;
        twice?: undefined;
        switchTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | {
            masterFingerprint: Buffer;
            path: string;
            pubkey: Buffer;
        })[];
        expected: string;
        switchTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            key: Buffer;
            value: Buffer;
        })[];
        expected: string;
        twice?: undefined;
        switchTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        switchTx: boolean;
        args: (((data: any, txBuf: Buffer) => Buffer) | {
            wow: number;
        })[];
        expected: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (boolean | ((data: any, txBuf: Buffer) => Buffer) | {
            wow: number;
        })[];
        expected: string;
        twice?: undefined;
        switchTx?: undefined;
    })[];
    invalid: ({
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (string | number)[];
        exception: string;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | Buffer)[];
        exception: string;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            scripty: Buffer;
            vyalue: number;
        })[];
        exception: string;
        twice?: undefined;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: (number | {
            script: Buffer;
            value: number;
        })[];
        exception: string;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            pubkdey: Buffer;
            signdature: Buffer;
        })[];
        exception: string;
        twice?: undefined;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (string | number)[];
        exception: string;
        twice?: undefined;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | {
            a: number;
        })[];
        exception: string;
        twice?: undefined;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: {
            wow: number;
        }[];
        exception: string;
        twice?: undefined;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        dupeTx: boolean;
        args: (boolean | ((data: any, txBuf: Buffer) => Buffer) | {
            wow: number;
        })[];
        exception: string;
        twice?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: (number | Buffer)[];
        exception: string;
        twice?: undefined;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        args: {
            key: Buffer;
            value: Buffer;
        }[];
        exception: string;
        twice?: undefined;
        dupeTx?: undefined;
    } | {
        method: string;
        addInputOutput: boolean;
        twice: boolean;
        args: {
            key: Buffer;
            value: Buffer;
        }[];
        exception: string;
        dupeTx?: undefined;
    })[];
};
