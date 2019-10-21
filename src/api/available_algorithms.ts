// tslint:disable:no-expression-statement
import { Algorithms, Algorithm } from './types';
import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { isResponseError } from './errors';
import * as R from 'ramda';
import { ValidationException } from './exceptions';

export type UrlList = ReadonlyArray<string>;

export const availableServerUrls: UrlList = [
    'https://pathways-production.herokuapp.com',
    'https://fierce-ravine-89308.herokuapp.com',
];

export const requestAlgorithms = async (): Promise<AxiosResponse>  => {
    const url = buildUrlForAlgorithms();
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse  => {
        return response;
    });
};

export const validateAlgorithmsResponse = (response: AxiosResponse): Algorithms => {
    if (isResponseError(response)) {
        throw new ValidationException(response.statusText);
    }
    if (R.isEmpty(response.data)) {
        return { type: 'Algorithms:Empty' };
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