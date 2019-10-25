// tslint:disable-next-line:no-any
export type UnvalidatedData = any;

export interface ValidationResult {
    readonly isValid: boolean;
    readonly errors?: string;
}