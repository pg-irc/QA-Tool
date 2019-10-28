// tslint:disable:no-expression-statement
import { Topic, Topics } from '../../application/types';
import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { isResponseError, isValidationError } from '../errors';
import * as R from 'ramda';
import { buildEmptyTopicsType, buildInvalidTopicsType } from '../../application/helpers/build_types';
import { validateTopicsArray } from './validate';

export const requestTopics = async (): Promise<AxiosResponse>  => {
    const url = buildUrlForTopics();
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse  => {
        return response;
    });
};

export const validateTopicsResponse = (response: AxiosResponse): Topics => {
    if (isResponseError(response)) {
        return buildInvalidTopicsType(response.statusText);
    }
    const validator = validateTopicsArray(response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: locations response data failed schema validation';
        return buildInvalidTopicsType(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyTopicsType();
    }
    return {
        type: 'Topics:Success', topics: response.data.map((val: Topic) => buildValidatedTopic(val)),
    };
};

export const buildValidatedTopic = (data: Topic): Topic => {
    return {
        type: 'Topic',
        id: data.id,
    };
};

const buildUrlForTopics = (): string => {
    const path = 'v1/topics';
    const baseUrl = 'http://127.0.0.1:8000/';
    const numberOfRecordsToGet = '124';
    return buildUrl(baseUrl, {
        path,
        queryParams: {
            per_page: numberOfRecordsToGet,
        },
    });
};