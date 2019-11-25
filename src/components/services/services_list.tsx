// tslint:disable: no-expression-statement
import React from 'react';
import { ValidServices, InvalidServices, Service, Services, SetServices } from '../../application/types';
import { ServiceListItem } from './service_list_item';
import { requestSendRelevancyScore } from '../../api/relevancy_score';
import { ValidTopicId, ValidLocationId } from '../api_query_picker/types';
import { AlgorithmId, ScoreValue } from '../../application/types';
import * as constants from '../../application/constants';

export interface ScoreForService {
    readonly topic: ValidTopicId;
    readonly location: ValidLocationId;
    readonly service: Service;
    readonly value: ScoreValue;
    readonly algorithmId: AlgorithmId;
}

export interface ServicesListProps {
    readonly topic: ValidTopicId;
    readonly location: ValidLocationId;
    readonly algorithmId: AlgorithmId;
    readonly services: Services;
    readonly setServices: SetServices;
}

export type SendRelevancyScore = (service: Service, score: ScoreValue) => void;

export const ServicesList = (props: ServicesListProps): JSX.Element => {
    const sendRelevancyScore = (service: Service, value: ScoreValue): void => {
        const topic = props.topic;
        const location = props.location;
        const algorithmId = props.algorithmId;

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