// tslint:disable:no-expression-statement
import { Algorithms, Algorithm } from '../../application/types';
import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { isResponseError, isValidationError } from '../errors';
import * as R from 'ramda';
import { buildEmptyAlgorithmsType, buildInvalidAlgorithmsType } from '../../application/helpers/build_types';
import { validateAlgorithmsArray } from './validate';

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
        type: 'Algorithms:Success', algorithms: response.data.map((val: Algorithm) => buildValidatedAlgorithm(val)),
    };
};

export const buildValidatedAlgorithm = (data: Algorithm): Algorithm => {
    return {
        id: data.id,
        url: data.url,
        name: data.name,
        notes: data.notes,
    };
};

const buildUrlForAlgorithms = (): string => {
    const path = 'v1/algorithms';
    const baseUrl = 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};