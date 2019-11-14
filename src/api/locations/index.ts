// tslint:disable:no-expression-statement no-any
import { Locations } from '../../application/types';
import { AxiosResponse, AxiosError } from 'axios';
import buildUrl from 'build-url';
import { isResponseError, isValidationError } from '../errors';
import * as R from 'ramda';
import { buildEmptyLocationsType, buildInvalidLocationsType } from '../../application/build_types';
import { validateIncomingData } from '../validation';
import * as constants from '../../application/constants';
import { locationsArray } from './schema';
import { authenticatedAxiosRequest } from '../axios_config';

export const requestLocations = async (): Promise<Locations>  => {
    const url = buildUrlForLocations();
    return await authenticatedAxiosRequest.get(url)
    .then((response: AxiosResponse): Locations  => validateLocationsResponse(response))
    .catch((error: AxiosError): Locations => buildInvalidLocationsType(error.message));
};

const buildUrlForLocations = (): string => {
    const path = 'qa/v1/searchlocations';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};

export const validateLocationsResponse = (response: AxiosResponse): Locations => {
    if (isResponseError(response)) {
        return buildInvalidLocationsType(response.statusText);
    }
    const validator = validateIncomingData(locationsArray, response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: locations response data failed schema validation';
        return buildInvalidLocationsType(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyLocationsType();
    }
    return {
        type: constants.LOCATIONS_SUCCESS, locations: response.data,
    };
};