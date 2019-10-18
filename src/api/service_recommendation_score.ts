import axios, { AxiosResponse } from 'axios';
import { SelectedTopic, SelectedLocation } from '../components/api_query_picker/types';
import { Service } from '../components/services/types';
import { Score } from '../components/feedback_buttons/score_buttons';
import buildUrl from 'build-url';

export interface ServiceScore {
    readonly topic: SelectedTopic;
    readonly location: SelectedLocation;
    readonly service: Service;
    readonly score: Score;
}

export const requestSendServiceScore = async (serviceScore: ServiceScore): Promise<AxiosResponse> => {
    const url = buildUrlFromServiceScore();
    return await axios.post(url, {
        topic: serviceScore.topic,
        location: serviceScore.location,
        service: serviceScore.service,
        score: serviceScore.score,
    })
    .then((response: AxiosResponse): AxiosResponse => {
      return response;
  });
};

const buildUrlFromServiceScore = (): string => {
    const path = 'v1/foo';
    return buildUrl(path);
};