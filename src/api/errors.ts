import { AxiosResponse } from 'axios';

interface ValidatorResponse {
    readonly isValid: boolean;
    readonly errors?: string;
}

export const isResponseError = (response: AxiosResponse): boolean => (
    response.status !== 200
);

export const isValidationError = (validator: ValidatorResponse): boolean => (
    !validator.isValid
);
