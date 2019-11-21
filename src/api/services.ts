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

export const requestServices = async (topic: ValidTopicId, location: Location): Promise<Services> => {
    const url = buildUrlFromTopicIdAndLocation(topic, location);
    return await axios.get(url)
    .then(validateServicesResponse)
    .catch(buildInvalidServicesType);
};

const buildUrlFromTopicIdAndLocation = (topic: ValidTopicId, location: Location,): string => {
    const path = 'v1/services_at_location';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    // this will need to be reverted back to algorithmUrl when servers are updated with services_at_locations
    const numberOfRecordsToGet = '5';
    const longLat =  buildLongLatParameter(location);
    return buildUrl(baseUrl, {
        path: path,
        queryParams: {
            user_location: longLat,
            related_to_topic: topic.id,
            per_page: numberOfRecordsToGet,
        },
    });
};

const buildLongLatParameter = (location: Location): string => (
    `${location.longitude}, ${location.latitude}`
);

export const validateServicesResponse = (response: AxiosResponse): Services => {
    console.log(response)
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
