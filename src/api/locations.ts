// tslint:disable:no-expression-statement no-any
import { Location, Locations } from '../application/types';
import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { isResponseError } from './errors';
import * as R from 'ramda';
import { ValidationException } from './exceptions';

export const requestLocations = async (): Promise<AxiosResponse>  => {
    const url = buildUrlForLocations();
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse  => {
        return response;
    });
};

export const validateLocationsResponse = (response: AxiosResponse): Locations => {
    if (isResponseError(response)) {
        throw new ValidationException(response.statusText);
    }
    if (R.isEmpty(response.data)) {
        return { type: 'Locations:Empty' };
    }
    return {
        type: 'Locations:Success', locations: response.data.map((val: Location) => buildValidatedLocation(val)),
    };
};

export const buildValidatedLocation = (data: Location): Location => {
    const long_lat = buildLatLong(data);
    return {
        type: 'Location',
        id: data.id,
        name: data.name,
        long_lat: long_lat,
    };
};

const buildUrlForLocations = (): string => {
    const path = 'v1/searchlocations';
    const baseUrl = 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};

const buildLatLong = (data: any): string => {
    const latitude = data.latitude;
    const longitude = data.longitude;
    return `${longitude}, ${latitude}`;
};