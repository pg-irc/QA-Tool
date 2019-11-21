import { AxiosResponse } from 'axios';
import { TopicId, LocationId } from '../components/api_query_picker/types';
import { Service } from '../application/types';
import buildUrl from 'build-url';
import { ScoreValue } from '../application/types';
import { authenticatedAxiosInstance } from './axios_config';

export interface RelevancyScore {
    readonly topic: TopicId;
    readonly location: LocationId;
    readonly service: Service;
    readonly value: ScoreValue;
}

export const requestSendRelevancyScore = async (relevancyScore: RelevancyScore): Promise<AxiosResponse> => {
    const url = buildUrlFromServiceScore();
    return await authenticatedAxiosInstance.post(url, {
        topic: relevancyScore.topic,
        location: relevancyScore.location,
        service: relevancyScore.service,
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