/// <reference types="node" />
export declare const fixtures: ({
    data: {
        globalMapKeyVals: {
            key: Buffer;
            value: Buffer;
        }[];
        inputKeyVals: {
            key: Buffer;
            value: Buffer;
        }[][];
        outputKeyVals: never[];
    };
    exception: string;
    expected?: undefined;
} | {
    data: {
        globalMapKeyVals: never[];
        inputKeyVals: never[];
        outputKeyVals: {
            key: Buffer;
            value: Buffer;
        }[][];
    };
    exception: string;
    expected?: undefined;
} | {
    data: {
        globalMapKeyVals: {
            key: Buffer;
            value: Buffer;
        }[];
        inputKeyVals: never[];
        outputKeyVals: never[];
    };
    expected: string;
    exception?: undefined;
})[];
