// tslint:disable:no-expression-statement
import { Topics } from '../../application/types';
import { AxiosResponse, AxiosError } from 'axios';
import buildUrl from 'build-url';
import { isResponseError, isValidationError } from '../errors';
import * as R from 'ramda';
import { buildEmptyTopicsType, buildInvalidTopicsType } from '../../application/build_types';
import { validateIncomingData } from '../validation';
import * as constants from '../../application/constants';
import { topicsArray } from './schema';
import { authenticatedAxiosInstance } from '../axios_config';

export const requestTopics = async (): Promise<Topics>  => {
    const url = buildUrlForTopics();
    return await authenticatedAxiosInstance.get(url)
    .then((response: AxiosResponse): Topics  => validateTopicsResponse(response))
    .catch((error: AxiosError): Topics => buildInvalidTopicsType(error.message));
};

const buildUrlForTopics = (): string => {
    const path = 'v1/topics';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    const numberOfRecordsToGet = '124';
    return buildUrl(baseUrl, {
        path,
        queryParams: {
            per_page: numberOfRecordsToGet,
        },
    });
};

export const validateTopicsResponse = (response: AxiosResponse): Topics => {
    if (isResponseError(response)) {
        return buildInvalidTopicsType(response.statusText);
    }
    const validator = validateIncomingData(topicsArray, response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: locations response data failed schema validation';
        return buildInvalidTopicsType(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyTopicsType();
    }
    return {
        type: constants.TOPICS_SUCCESS, topics: response.data,
    };
};