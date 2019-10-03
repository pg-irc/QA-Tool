// tslint:disable:no-expression-statement
import axios, { AxiosResponse } from 'axios';
import { SelectedOption } from '../components/api_query_picker/api_query_picker';
import * as ServiceTypes from '../components/services/types';
import { isResponseError } from './is_response_error';
import { servicesAtLocationValidator, isValidationError } from '../components/services/schemas/validator';
import * as R from 'ramda';
import { availableServerUrls, UrlList } from './available_servers';
import buildUrl from 'build-url';
import { ValidationException } from './exceptions';
import { serviceFromValidatedJSON } from '../pathways-frontend/src/stores/services/validation';

export const requestServices = async (topic: SelectedOption, location: SelectedOption): Promise<AxiosResponse> => {
    const url = buildUrlFromSelectedTopicAndLocation(topic, location);
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse => {
      return response;
  });
};

const buildUrlFromSelectedTopicAndLocation = (topic: SelectedOption, location: SelectedOption): string => {
    const path = 'v1/services_at_location';
    const baseUrl = chooseServerUrlAtRandom(availableServerUrls);
    return buildUrl(baseUrl, {
        path: path,
        queryParams: {
            user_location: location,
            related_to_topic: topic,
        },
    });
};

export const validateServicesResponse = (response: AxiosResponse): ServiceTypes.Services => {
    if (isResponseError(response)) {
        throw new ValidationException(response.statusText);
    }
    const validator = servicesAtLocationValidator(response.data);
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