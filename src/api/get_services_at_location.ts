// tslint:disable:no-expression-statement
import axios, { AxiosResponse } from 'axios';
import { SelectedOption } from '../components/url_template/url_template';
import { ServiceMap } from '../components/services/types';
import { isResponseError } from './is_response_error';
import { servicesAtLocationValidator, isValidationError } from '../json_schemas/validator';

export const servicesAtLocation = async (topic: SelectedOption, manualLocation: SelectedOption): Promise<ServiceMap> => {
    const endpoint = 'services_at_location';
    const query = `user_location=${manualLocation}&related_to_topic=${topic}`;
    const url = buildUrl(endpoint, query);
    const response = await servicesAtLocationAPIRequest(url);

    if (isResponseError(response)) {
        console.log('Error, pass error values');
    }
    const validator = (servicesAtLocationValidator(response.data));
    if (isValidationError(validator)) {
        console.log('Fails schema validation, pass error values');
    }
    return response.data;
};

const servicesAtLocationAPIRequest = async (url: string): Promise<AxiosResponse> => {
    const data = await axios.get(url)
      .then((response: AxiosResponse): AxiosResponse => {
        return response;
    });
    return data;
};

const buildUrl = (endpoint: string, query: string): string => {
    const baseUrl = 'https://fierce-ravine-89308.herokuapp.com';
    const version = 'v1';
    return `${baseUrl}/${version}/${endpoint}?${query}`;
};