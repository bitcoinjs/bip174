export declare const fixtures: {
    valid: {
        dec: number;
        hex: string;
    }[];
    invalid: ({
        dec: number;
        msg: string;
        hex?: undefined;
    } | {
        dec: number;
        hex: string;
        msg: string;
    })[];
};
