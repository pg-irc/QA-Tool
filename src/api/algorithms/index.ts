// tslint:disable:no-expression-statement
import { Algorithms } from '../../application/types';
import { AxiosResponse, AxiosError } from 'axios';
import buildUrl from 'build-url';
import { isResponseError, isValidationError } from '../errors';
import * as R from 'ramda';
import { buildEmptyAlgorithmsType, buildInvalidAlgorithmsType } from '../../application/build_types';
import { validateIncomingData } from '../validation';
import * as constants from '../../application/constants';
import { algorithmsArray } from './schema';
import { authenticatedAxiosInstance } from '../axios_config';

export const requestAlgorithms = async (): Promise<Algorithms>  => {
    const url = buildUrlForAlgorithms();
    return await authenticatedAxiosInstance.get(url)
    .then((response: AxiosResponse): Algorithms  => validateAlgorithmsResponse(response))
    .catch((error: AxiosError): Algorithms => buildInvalidAlgorithmsType(error.message));
};

const buildUrlForAlgorithms = (): string => {
    const path = 'qa/v1/algorithms';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};

export const validateAlgorithmsResponse = (response: AxiosResponse): Algorithms => {
    if (isResponseError(response)) {
        return buildInvalidAlgorithmsType(response.statusText);
    }
    const validator = validateIncomingData(algorithmsArray, response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: algorithms response data failed schema validation';
        return buildInvalidAlgorithmsType(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyAlgorithmsType();
    }
    return {
        type: constants.ALGORITHMS_SUCCESS, algorithms: response.data,
    };
};