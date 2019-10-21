// tslint:disable:no-expression-statement
import axios, { AxiosResponse } from 'axios';
import { SelectedTopic, SelectedLocation } from '../components/api_query_picker/types';
import * as ServiceTypes from '../components/services/types';
import { isResponseError, isValidationError } from './errors';
import * as R from 'ramda';
import { availableServerUrls, UrlList } from './available_algorithms';
import buildUrl from 'build-url';
import { ValidationException } from './exceptions';
import { serviceFromValidatedJSON, validateServicesAtLocationArray } from '../pathways-frontend/src/stores/services/validation';

export const requestServices = async (topic: SelectedTopic, location: SelectedLocation): Promise<AxiosResponse> => {
    const url = buildUrlFromSelectedTopicAndLocation(topic, location);
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse => {
      return response;
  });
};

const buildUrlFromSelectedTopicAndLocation = (topic: SelectedTopic, location: SelectedLocation): string => {
    const path = 'v1/services_at_location';
    const baseUrl = chooseServerUrlAtRandom(availableServerUrls);
    const numberOfRecordsToGet = '5';
    return buildUrl(baseUrl, {
        path: path,
        queryParams: {
            user_location: location.value,
            related_to_topic: topic.value,
            per_page: numberOfRecordsToGet,
        },
    });
};

export const validateServicesResponse = (response: AxiosResponse): ServiceTypes.Services => {
    if (isResponseError(response)) {
        throw new ValidationException(response.statusText);
    }
    const validator = validateServicesAtLocationArray(response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: response data failed schema validation';
        throw new ValidationException(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return { type: 'Services:Empty' };
    }
    return {
        type: 'Services:Success', services: response.data.map((val: ServiceTypes.ValidatedServiceAtLocationJSON) => serviceFromValidatedJSON(val)),
    };
};

const chooseServerUrlAtRandom = (urlList: UrlList ): string => {
    const randomIndex = Math.floor(Math.random() * urlList.length);
    return urlList[randomIndex];
};