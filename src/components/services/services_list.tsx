import React from 'react';
import { ValidServices, InvalidServices, Service, Services } from './types';
import { ServiceListItem } from './service_list_item';
import { SharedStateAndCallbacks } from '../Application';

type Props = SharedStateAndCallbacks;

export const ServicesList = (props: Props): JSX.Element => (
    <div>
        <h3>Services</h3>
        {renderServicesBasedOnType(props.services)}
    </div>
);

const renderServicesBasedOnType = (services: Services): JSX.Element => {
    switch (services.type) {
        case 'Services:Loading':
            return renderLoadingMessage();
        case 'Services:Success':
            return renderList(services);
        case 'Services:Error':
            return renderErrorMessage(services);
        default:
            return <p>No services</p>;
    }
};

const renderList = (validServices: ValidServices): JSX.Element => (
        <ol>
            {validServices.services.map((service: Service ) => <ServiceListItem key={service.id} service={service} />)}
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