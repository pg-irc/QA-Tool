import { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { authenticatedAxiosInstance } from './axios_config';
import { ScoreForService } from '../components/services/services_list';

export const requestSendRelevancyScore = async (relevancyScore: ScoreForService): Promise<AxiosResponse> => {
    const url = buildUrlFromServiceScore();
    return await authenticatedAxiosInstance.post(url, {
        value: Number(relevancyScore.value),
        algorithm: relevancyScore.algorithmId,
        search_location: relevancyScore.location.id,
        service_at_location: relevancyScore.service.services_at_location_id,
        topic: relevancyScore.topic.id,
    })
    .then((response: AxiosResponse): AxiosResponse => {
      return response;
  });
};

const buildUrlFromServiceScore = (): string => {
    const path = 'qa/v1/relevancyscores/';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};