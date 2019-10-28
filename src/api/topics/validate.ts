import { UnvalidatedData, ValidationResult } from '../types';
import { topicsArray } from './schema';

// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');

export const validateTopicsArray = (data: UnvalidatedData): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(topicsArray, data) as boolean;
    return isValid ? { isValid } : { isValid, errors: ajv.errorsText(ajv.errors) };
};
