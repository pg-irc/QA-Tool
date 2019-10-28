import axios, { AxiosResponse } from 'axios';
import { SelectedTopic, SelectedLocation } from '../components/api_query_picker/types';
import { Service } from '../components/services/types';
import buildUrl from 'build-url';
import { ScoreValue } from '../application/types';

export interface RelevancyScore {
    readonly topic: SelectedTopic;
    readonly location: SelectedLocation;
    readonly service: Service;
    readonly value: ScoreValue;
}

export const requestSendRelevancyScore = async (relevancyScore: RelevancyScore): Promise<AxiosResponse> => {
    const url = buildUrlFromServiceScore();
    return await axios.post(url, {
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
    const path = 'v1/foo';
    return buildUrl(path);
};