// tslint:disable:no-expression-statement
import axios, { AxiosResponse } from 'axios';
import { SelectedOption } from '../components/url_template/url_template';
import * as ServiceTypes from '../components/services/types';
import { isResponseError } from './is_response_error';
import { servicesAtLocationValidator, isValidationError } from '../json_schemas/validator';
import * as R from 'ramda';

export const servicesAtLocation = async (topic: SelectedOption, manualLocation: SelectedOption): Promise<ServiceTypes.Services> => {
    const endpoint = 'services_at_location';
    const query = `user_location=${manualLocation}&related_to_topic=${topic}`;
    const url = buildUrl(endpoint, query);
    const response = await servicesAtLocationAPIRequest(url);

    if (isResponseError(response)) {
        return { errorMessage: response.statusText };
    }
    const validator = (servicesAtLocationValidator(response.data));
    if (isValidationError(validator)) {
        return { errorMessage: 'Error: response data failed schema validation' };
    }
    return response.data.map((val: ServiceTypes.ValidatedServiceAtLocationJSON) => serviceFromValidatedJSON(val));
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

const serviceFromValidatedJSON = (data: ServiceTypes.ValidatedServiceAtLocationJSON): ServiceTypes.Service => {
    const phoneNumbers = R.map((phoneNumber: ServiceTypes.ValidatedPhoneNumberJSON): ServiceTypes.PhoneNumber => ({
        type: phoneNumber.phone_number_type,
        phoneNumber: phoneNumber.phone_number,
    }), data.location.phone_numbers);

    const addresses = R.map((addressWithType: ServiceTypes.ValidatedAddressWithTypeJSON): ServiceTypes.Address => ({
        id: addressWithType.address.id,
        type: addressWithType.address_type,
        address: addressWithType.address.address,
        city: addressWithType.address.city,
        stateProvince: addressWithType.address.state_province,
        postalCode: addressWithType.address.postal_code,
        country: addressWithType.address.country,
    }), data.location.addresses);

    return {
        id: data.service.id,
        // These values come in the wrong order from the server
        latitude: data.location.longitude,
        longitude: data.location.latitude,
        name: data.service.name,
        description: data.service.description,
        phoneNumbers: phoneNumbers,
        addresses: addresses,
        website: data.service.organization_url,
        email: data.service.organization_email,
        organizationName: data.service.organization_name,
    };
}