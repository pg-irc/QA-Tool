// tslint:disable:no-expression-statement
import axios, { AxiosResponse } from 'axios';
import { ValidTopicId } from '../components/api_query_picker/types';
import { Services, ValidatedServiceAtLocationJSON} from '../application/types';
import { isResponseError, isValidationError } from './errors';
import * as R from 'ramda';
import buildUrl from 'build-url';
import { serviceFromValidatedJSON, validateServicesAtLocationArray } from '../pathways-frontend/src/validation/services';
import { Location } from '../application/types';
import { buildEmptyServicesType, buildInvalidServicesType } from '../application/build_types';
import * as constants from '../application/constants';

export const requestServices = async (topic: ValidTopicId, location: Location, algorithmUrl: string): Promise<Services> => {
    const url = buildUrlFromTopicIdAndLocation(topic, location, algorithmUrl);
    return await axios.get(url)
    .then(validateServicesResponse)
    .catch(buildInvalidServicesType);
};

const buildUrlFromTopicIdAndLocation = (topic: ValidTopicId, location: Location, algorithmUrl: string): string => {
    const path = 'v1/services_at_location';
    const baseUrl = algorithmUrl;
    const per_page = '100';
    const user_location =  buildLongLatParameter(location);
    return buildUrl(baseUrl, {
        path: path,
        queryParams: {
            user_location,
            related_to_topic: topic.id,
            per_page,
        },
    });
};

const buildLongLatParameter = (location: Location): string => (
    `${location.longitude}, ${location.latitude}`
);

export const validateServicesResponse = (response: AxiosResponse): Services => {
    if (isResponseError(response)) {
        return buildInvalidServicesType(response.statusText);
    }
    const validator = validateServicesAtLocationArray(response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: response data failed schema validation';
        return buildInvalidServicesType(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyServicesType();
    }
    return {
        type: constants.SERVICES_SUCCESS,
        services: response.data.map((val: ValidatedServiceAtLocationJSON) => serviceFromValidatedJSON(val)),
    };
};
