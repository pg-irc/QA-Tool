// tslint:disable:no-any

export type UnvalidatedData = any;

export interface ValidationResult {
    readonly isValid: boolean;
    readonly errors?: string;
}

export interface IncomingDataSchema {
    readonly type: 'array';
    readonly items: any;
}
export interface IncomingPostResponseSchema {
    readonly type: 'object';
    readonly items: any;
}