import React from 'react';
import { ValidServices, InvalidServices, Service, Services } from './types';
import { ServiceListItem } from './service_list_item';
import { SharedStateAndCallbacks } from '../Application';
import { requestSendServiceScore } from '../../api/service_recommendation_score';
import { Score } from '../feedback_buttons/score_buttons';
import { SelectedTopic, SelectedLocation } from '../api_query_picker/types';
import { AlgorithmId } from '../../api/types';

type Props = SharedStateAndCallbacks;

export interface ScoreForService {
    readonly topic: SelectedTopic;
    readonly location: SelectedLocation;
    readonly service: Service;
    readonly score: Score;
    readonly algorithmId: AlgorithmId;
}

export type SendServiceRecommendationScore = (service: Service, score: Score) => void;

export const ServicesList = (props: Props): JSX.Element => {
    const sendServiceRecommendationScore = (service: Service, score: Score): void => {
        const topic: SelectedTopic = props.topic;
        const location: SelectedLocation = props.location;
        const algorithmId: AlgorithmId = props.algorithmId;

        const scoreForService: ScoreForService = {
            topic,
            location,
            service,
            score,
            algorithmId,
        };
// tslint:disable-next-line: no-expression-statement
        console.log('Topic: ', topic, 'Location: ', location, 'Service: ', service, 'Score: ', score, 'AlgorithmId: ', algorithmId);
// tslint:disable-next-line: no-expression-statement
        requestSendServiceScore(scoreForService);
    };
    return (
        <div>
            <h3>Services</h3>
            {renderServicesBasedOnType(props.services, sendServiceRecommendationScore)}
         </div>
    );
};
const renderServicesBasedOnType = (services: Services, sendServiceRecommendationScore: SendServiceRecommendationScore): JSX.Element => {
    switch (services.type) {
        case 'Services:Loading':
            return renderLoadingMessage();
        case 'Services:Success':
            return renderList(services, sendServiceRecommendationScore);
        case 'Services:Error':
            return renderErrorMessage(services);
        default:
            return <p>No services</p>;
    }
};

const renderList = (validServices: ValidServices, sendServiceRecommendationScore: SendServiceRecommendationScore): JSX.Element => (
        <ol>
            {validServices.services.map((service: Service ) => <ServiceListItem key={service.id} service={service}
            sendServiceRecommendationScore={sendServiceRecommendationScore} />)}
        </ol>
);

const renderErrorMessage = (invalidServices: InvalidServices): JSX.Element => (
    <p>
        {invalidServices.errorMessage}
    </p>
);

const renderLoadingMessage = (): JSX.Element => (
    <p>
        Loading...
    </p>
);