// tslint:disable:no-any no-var-requires
// This is the documenated syntax for Ajv. Using an import here causes a runtime error.
import { serviceAtLocationArray } from './services_schemas';
const Ajv = require('ajv');

interface ValidatorResponse {
    readonly isValid: boolean;
    readonly errors?: string;
}

export const servicesAtLocationValidator = (data: any): ValidatorResponse => {
    const ajv = new Ajv();
    const response = {
        isValid: ajv.validate(serviceAtLocationArray, data) as boolean,
    };
    return response.isValid ? response : { ...response, errors: ajv.errorsText(ajv.errors) };
};

export const isValidationError = (validator: ValidatorResponse): boolean => (
    !validator.isValid
);
