import { AxiosResponse } from 'axios';
import { ValidationResult } from './types';

export const isResponseError = (response: AxiosResponse): boolean => (
    response.status !== 200
);

export const isValidationError = (validator: ValidationResult): boolean => (
    !validator.isValid
);

export const isPostResponseError = (response: AxiosResponse): boolean => (
    response.status !== 201
);