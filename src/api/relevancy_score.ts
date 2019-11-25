import { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { authenticatedAxiosInstance } from './axios_config';
import { ScoreForService } from '../components/services/services_list';

export const requestSendRelevancyScore = async (relevancyScore: ScoreForService): Promise<AxiosResponse> => {
    const url = buildUrlFromServiceScore();
    return await authenticatedAxiosInstance.post(url, {
        topic: relevancyScore.topic.id,
        location: relevancyScore.location.id,
        service: relevancyScore.service.service_at_location,
        algorithmId: relevancyScore.algorithmId,
        value: relevancyScore.value,
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