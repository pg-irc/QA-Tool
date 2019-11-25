import { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { authenticatedAxiosInstance } from '../axios_config';
import { ScoreForService } from '../../components/services/services_list';
import { RelevancyScore } from '../../application/types';
import { isPostResponseError, isValidationError } from '../errors';
import { buildInvalidRelevancyScoreType, buildEmptyRelevancyScoreType } from '../../application/build_types';
import { validateIncomingData } from '../validation';
import { relevancyScoreData } from './schema';
import * as constants from '../../application/constants';
import * as R from 'ramda';

export const requestSendRelevancyScore = async (relevancyScore: ScoreForService): Promise<RelevancyScore> => {
    const url = buildUrlFromServiceScore();
    return await authenticatedAxiosInstance.post(url, {
        value: relevancyScore.value,
        algorithm: relevancyScore.algorithmId,
        search_location: relevancyScore.location.id,
        service_at_location: relevancyScore.service.services_at_location_id,
        topic: relevancyScore.topic.id,
    })
    .then(validateRelevancyScoreResponse)
    .catch(buildInvalidRelevancyScoreType);
};

const buildUrlFromServiceScore = (): string => {
    const path = 'qa/v1/relevancyscores/';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};

export const validateRelevancyScoreResponse = (response: AxiosResponse): RelevancyScore => {
    if (isPostResponseError(response)) {
        return buildInvalidRelevancyScoreType(response.statusText);
    }
    const validator = validateIncomingData(relevancyScoreData, response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: locations response data failed schema validation';
        return buildInvalidRelevancyScoreType(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyRelevancyScoreType();
    }
    return {
        type: constants.RELEVANCY_SCORE_VALID,
        value: response.data.value,
    };
};
