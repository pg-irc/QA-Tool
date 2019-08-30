import React from 'react';
import { ValidServices, InvalidServices, Service, Services } from './types';
import { ServiceListItem } from './service_list_item';

export interface Props {
    readonly services: Services;
}

export const ServicesList = (props: Props): JSX.Element => {
    if (props.services.type === 'Services:Loading') {
        return (
            renderLoadingMessage()
        );
    }

    if (props.services.type === 'Services:Success') {
        return (
            renderList(props.services)
        );
    }

    if (props.services.type === 'Services:Error') {
        return (
            renderErrorMessage(props.services)
        );
    }
    return (
        <div>Empty</div>
    );
};

const renderList = (validServices: ValidServices): JSX.Element => (
        <div>
            {validServices.services.map((service: Service ) => <ServiceListItem key={service.id} service={service} />)}
        </div>
);

const renderErrorMessage = (invalidServices: InvalidServices): JSX.Element => (
    <div>
        {invalidServices.errorMessage}
    </div>
);

const renderLoadingMessage = (): JSX.Element => (
    <div>
        Loading...
    </div>
);
