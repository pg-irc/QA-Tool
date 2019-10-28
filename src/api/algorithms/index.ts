// tslint:disable:no-expression-statement
import { Algorithms } from '../../application/types';
import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { isResponseError, isValidationError } from '../errors';
import * as R from 'ramda';
import { buildEmptyAlgorithmsType, buildInvalidAlgorithmsType } from '../../application/build_types';
import { validateAlgorithmsArray } from './validate';
import * as constants from '../../application/constants';

export const requestAlgorithms = async (): Promise<AxiosResponse>  => {
    const url = buildUrlForAlgorithms();
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse  => {
        return response;
    });
};

export const validateAlgorithmsResponse = (response: AxiosResponse): Algorithms => {
    if (isResponseError(response)) {
        return buildInvalidAlgorithmsType(response.statusText);
    }
    const validator = validateAlgorithmsArray(response.data);
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

const buildUrlForAlgorithms = (): string => {
    const path = 'v1/algorithms';
    const baseUrl = 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};