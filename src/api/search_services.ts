// tslint:disable:no-expression-statement
import axios, { AxiosResponse } from 'axios';
import { SelectedOption } from '../components/api_query_picker/api_query_picker';
import * as ServiceTypes from '../components/services/types';
import { isResponseError } from './is_response_error';
import { servicesAtLocationValidator, isValidationError } from '../components/services/schemas/validator';
import * as R from 'ramda';
import { availableServerUrls, UrlList } from './available_servers';
import buildUrl from 'build-url';

export const searchServices = async (topic: SelectedOption, location: SelectedOption): Promise<ServiceTypes.Services> => {
    const url = buildUrlFromSelectedTopicAndLocation(topic, location);
    const response = await servicesAtLocationApiRequest(url);
    if (isResponseError(response)) {
        return { type: 'Services:Error', errorMessage: response.statusText };
    }
    const validator = servicesAtLocationValidator(response.data);
    if (isValidationError(validator)) {
        return { type: 'Services:Error', errorMessage: 'Error: response data failed schema validation' };
    }
    if (R.isEmpty(response.data)) {
        return { type: 'Services:Empty' };
    }
    return {
        type: 'Services:Success', services: response.data.map((val: ServiceTypes.ValidatedServiceAtLocationJSON) => serviceFromValidatedJSON(val)),
    };
};

const servicesAtLocationApiRequest = async (url: string): Promise<AxiosResponse> => {
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
        // These values come in the wrong order from the server see Issue #704 on pathways-frontend
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
};

const chooseServerUrlAtRandom = (urlList: UrlList ): string => {
    const randomIndex = Math.floor(Math.random() * urlList.length);
    return urlList[randomIndex];
};