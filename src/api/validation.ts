import { UnvalidatedData, ValidationResult, IncomingDataSchema } from './types';
import { objectWithToken } from './login/schema';

// tslint:disable-next-line:no-var-requires
const Ajv = require('ajv');

export const validateIncomingData = (schema: IncomingDataSchema, data: UnvalidatedData): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(schema, data) as boolean;
    return isValid ? { isValid } : { isValid, errors: ajv.errorsText(ajv.errors) };
};

export const validateIncomingToken = (data: UnvalidatedData): ValidationResult => {
    const ajv = new Ajv();
    const isValid = ajv.validate(objectWithToken, data) as boolean;
    return isValid ? { isValid } : { isValid, errors: ajv.errorsText(ajv.errors) };
};