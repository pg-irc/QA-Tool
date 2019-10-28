// tslint:disable: no-expression-statement
import React from 'react';
import { ValidServices, InvalidServices, Service, Services } from './types';
import { ServiceListItem } from './service_list_item';
import { SharedStateAndCallbacks } from '../../application';
import { requestSendRelevancyScore } from '../../api/relevancy_score';
import { TopicId, LocationId } from '../api_query_picker/types';
import { AlgorithmId, ScoreValue } from '../../application/types';

type Props = SharedStateAndCallbacks;

export interface ScoreForService {
    readonly topic: TopicId;
    readonly location: LocationId;
    readonly service: Service;
    readonly value: ScoreValue;
    readonly algorithmId: AlgorithmId;
}

export type SendRelevancyScore = (service: Service, score: ScoreValue) => void;

export const ServicesList = (props: Props): JSX.Element => {
    const sendRelevancyScore = (service: Service, value: ScoreValue): void => {
        const topic: TopicId = props.topic;
        const location: LocationId = props.location;
        const algorithmId: AlgorithmId = props.algorithmId;

        const scoreForService: ScoreForService = {
            topic,
            location,
            service,
            value,
            algorithmId,
        };
        requestSendRelevancyScore(scoreForService);
    };
    return (
        <div>
            <h3>Services</h3>
            {renderServicesBasedOnType(props.services, sendRelevancyScore)}
         </div>
    );
};
const renderServicesBasedOnType = (services: Services, sendRelevancyScore: SendRelevancyScore): JSX.Element => {
    switch (services.type) {
        case 'Services:Loading':
            return renderLoadingMessage();
        case 'Services:Success':
            return renderList(services, sendRelevancyScore);
        case 'Services:Error':
            return renderErrorMessage(services);
        default:
            return <p>No services</p>;
    }
};

const renderList = (validServices: ValidServices, sendRelevancyScore: SendRelevancyScore): JSX.Element => (
        <ol>
            {validServices.services.map((service: Service ) => <ServiceListItem key={service.id} service={service}
            sendRelevancyScore={sendRelevancyScore} />)}
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