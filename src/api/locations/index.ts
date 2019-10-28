// tslint:disable:no-expression-statement no-any
import { Locations, Location } from '../../application/types';
import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { isResponseError, isValidationError } from '../errors';
import * as R from 'ramda';
import { buildEmptyLocationsType, buildInvalidLocationsType, buildLocationType } from '../../application/helpers/build_types';
import { validateLocationsArray } from './validate';

export const requestLocations = async (): Promise<AxiosResponse>  => {
    const url = buildUrlForLocations();
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse  => {
        return response;
    });
};

export const validateLocationsResponse = (response: AxiosResponse): Locations => {
    if (isResponseError(response)) {
        return buildInvalidLocationsType(response.statusText);
    }
    const validator = validateLocationsArray(response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: locations response data failed schema validation';
        return buildInvalidLocationsType(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyLocationsType();
    }
    return {
        type: 'Locations:Success', locations: response.data.map((location: Location ) => buildLocationType(location)),
    };
};

const buildUrlForLocations = (): string => {
    const path = 'v1/searchlocations';
    const baseUrl = 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};