import { UnvalidatedData, ValidationResult } from '../types';
import { locationsArray } from './schema';

// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');

export const validateLocationsArray = (data: UnvalidatedData): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(locationsArray, data) as boolean;
    return isValid ? { isValid } : { isValid, errors: ajv.errorsText(ajv.errors) };
};