import { UnvalidatedData, ValidationResult } from '../types';
import { algorithmsArray } from './schema';

// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');

export const validateAlgorithmsArray = (data: UnvalidatedData): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(algorithmsArray, data) as boolean;
    return isValid ? { isValid } : { isValid, errors: ajv.errorsText(ajv.errors) };
};
