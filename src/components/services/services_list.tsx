import React from 'react';
import { ValidServices, InvalidServices, Service, Services } from './types';
import { ServiceListItem } from './service_list_item';

export interface Props {
    readonly services: Services;
}

export const ServicesList = (props: Props): JSX.Element => (
    <div>
        <h3>Services</h3>
        {renderServicesBasedOnType(props.services)}
    </div>
);

const renderServicesBasedOnType = (services: Services): JSX.Element => {
    if (services.type === 'Services:Loading') {
        return (
            renderLoadingMessage()
        );
    }

    if (services.type === 'Services:Success') {
        return (
            renderList(services)
        );
    }

    if (services.type === 'Services:Error') {
        return (
            renderErrorMessage(services)
        );
    }
    return (
        <p>Empty</p>
    );
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
