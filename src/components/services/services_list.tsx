// tslint:disable: no-expression-statement
import React from 'react';
import { ValidServices, InvalidServices, Service, Services } from '../../application/types';
import { ServiceListItem } from './service_list_item';
import { requestSendRelevancyScore } from '../../api/relevancy_score';
import { TopicId, LocationId } from '../api_query_picker/types';
import { AlgorithmId, ScoreValue } from '../../application/types';
import * as constants from '../../application/constants';
import { SharedStateAndCallbacks } from '../pages/service_relevancy_score';

export interface ScoreForService {
    readonly topic: TopicId;
    readonly location: LocationId;
    readonly service: Service;
    readonly value: ScoreValue;
    readonly algorithmId: AlgorithmId;
}

export type SendRelevancyScore = (service: Service, score: ScoreValue) => void;

export const ServicesList = (props: SharedStateAndCallbacks): JSX.Element => {
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
        case constants.SERVICES_LOADING:
            return renderLoadingMessage();
        case constants.SERVICES_SUCCESS:
            return renderList(services, sendRelevancyScore);
        case constants.SERVICES_ERROR:
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