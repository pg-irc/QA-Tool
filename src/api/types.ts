// tslint:disable:no-any

export type UnvalidatedData = any;

export interface ValidationResult {
    readonly isValid: boolean;
    readonly errors?: string;
}

export interface IncomingDataSchema {
    readonly type: string;
    readonly items: any;
}