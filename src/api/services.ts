// tslint:disable:no-expression-statement
import axios, { AxiosResponse } from 'axios';
import { SelectedTopic } from '../components/api_query_picker/types';
import * as ServiceTypes from '../components/services/types';
import { isResponseError, isValidationError } from './errors';
import * as R from 'ramda';
import buildUrl from 'build-url';
import { serviceFromValidatedJSON, validateServicesAtLocationArray } from '../pathways-frontend/src/validation/services';
import { Location } from '../application/types';
import { buildEmptyServicesType } from '../application/helpers/build_types';

export const requestServices = async (topic: SelectedTopic, location: Location, algorithmUrl: string): Promise<AxiosResponse> => {
    const url = buildUrlFromSelectedTopicAndLocation(topic, location, algorithmUrl);
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse => {
      return response;
  });
};

const buildUrlFromSelectedTopicAndLocation = (topic: SelectedTopic, location: Location, algorithmUrl: string): string => {
    const path = 'v1/services_at_location';
    const baseUrl = algorithmUrl;
    const numberOfRecordsToGet = '5';
    return buildUrl(baseUrl, {
        path: path,
        queryParams: {
            user_location: location.long_lat,
            related_to_topic: topic.value,
            per_page: numberOfRecordsToGet,
        },
    });
};

export const validateServicesResponse = (response: AxiosResponse): ServiceTypes.Services => {
    if (isResponseError(response)) {
        throw new Error(response.statusText);
    }
    const validator = validateServicesAtLocationArray(response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: response data failed schema validation';
        throw new Error(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyServicesType();
    }
    return {
        type: 'Services:Success', services: response.data.map((val: ServiceTypes.ValidatedServiceAtLocationJSON) => serviceFromValidatedJSON(val)),
    };
};