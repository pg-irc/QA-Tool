// tslint:disable:no-expression-statement no-any
import { Locations, Location } from '../../application/types';
import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { isResponseError, isValidationError } from '../errors';
import * as R from 'ramda';
import { buildEmptyLocationsType, buildInvalidLocationsType, buildLocationType } from '../../application/build_types';
import { validateLocationsArray } from './validate';
import * as constants from '../../application/constants';

export const requestLocations = async (): Promise<AxiosResponse>  => {
    const url = buildUrlForLocations();
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse  => {
        return response;
    });
};

const buildUrlForLocations = (): string => {
    const path = 'v1/searchlocations';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
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
        type: constants.LOCATIONS_SUCCESS, locations: response.data.map((location: Location ) => buildLocationType(location)),
    };
};

