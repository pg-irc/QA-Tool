import React from 'react';
import { Service, Address } from '../services/types';
import * as R from 'ramda';

export interface Props {
    readonly service: Service;
}

export const ServiceListItem = (props: Props): JSX.Element => (
    <li key={props.service.id}>
        { renderName(props.service.name) }
        { renderDescription(props.service.description) }
        { renderAddresses(filterPhysicalAddresses(props.service.addresses))}
    </li>
);

export const renderName = (name: string): JSX.Element => (
    <h4>{ name }</h4>
);

export const renderDescription = (description: string): JSX.Element => (
    <p>{ description }</p>
);

export const renderAddresses = (addresses: ReadonlyArray<Address>): ReadonlyArray<JSX.Element> => (
    addresses.map((address: Address) =>
            <p key={address.id}>{address.address} {address.city}  {address.stateProvince} {address.postalCode ? address.postalCode : ''} </p>)
);

const filterPhysicalAddresses = R.filter(R.propEq('type', 'physical_address'));