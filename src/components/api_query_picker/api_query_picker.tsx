// tslint:disable:no-expression-statement no-let
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../fixtures/dropdown_data/topics';
import { locationsForQA } from '../../fixtures/dropdown_data/locations';
import { Services, SetServices, LoadingServices } from '../services/types';
import { requestServices, validateServicesResponse } from '../../api/services';

export interface SelectedTopic {
    readonly type: 'Topic';
    readonly value: string;
}

export interface SelectedLocation {
    readonly type: 'Location';
    readonly value: string;
}

export type SetTopic = Dispatch<SetStateAction<SelectedTopic>>;

export type SetLocation = Dispatch<SetStateAction<SelectedLocation>>;

export interface ApiQueryPickerProps {
    readonly services: Services;
}

export interface ApiQueryPickerActions {
    readonly setServices: SetServices;
}

type Props = ApiQueryPickerProps & ApiQueryPickerActions;

export const ApiQueryPicker = (props: Props): JSX.Element => {

    let selectedTopic: SelectedTopic = {
        type: 'Topic',
        value: '',
    };

    let selectedLocation: SelectedLocation = {
        type: 'Location',
        value: '',
    };

    const [topic, setTopic]: [SelectedTopic, SetTopic] = useState(selectedTopic);
    const [location, setLocation]: [SelectedLocation, SetLocation] = useState(selectedLocation);
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        selectedTopic = {
            type: 'Topic',
            value: event.target.value,
        };
        setTopic(selectedTopic);
    };
    const onSetLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        selectedLocation = {
            type: 'Location',
            value: event.target.value,
        };
        setLocation(selectedLocation);
    };
        const clearSelectedOptions = (): void => {
       setTopic(selectedTopic);
       setLocation(selectedLocation);
       props.setServices({type: 'Services:Empty'});
    };
    return (
        <div>
            <Dropdown title={'Topic'} selectedOption={topic} onSetOption={onSetTopic} dropdownItemCollection={topicsForQA} />
            <Dropdown title={'Location'} selectedOption={location} onSetOption={onSetLocation}
                dropdownItemCollection={locationsForQA} />
            <ClearButton clearSelectionOptions={clearSelectedOptions}/>
            <SendButton topic={topic} location={location}
                services={props.services} setServices={props.setServices} />
        </div>
    );
};

export interface ClearButtonProps {
    readonly clearSelectionOptions: () => void;
}

const ClearButton = (props: ClearButtonProps): JSX.Element => (
    <button onClick={(): void => props.clearSelectionOptions()}>Clear</button>
);

export interface SendButtonProps {
    readonly topic: SelectedTopic;
    readonly location: SelectedLocation;
    readonly services: Services;
    readonly setServices: SetServices;
}

const SendButton = (props: SendButtonProps): JSX.Element => {
    const enabled = props.topic && props.location;
    return (
        <button
            disabled={!enabled}
            onClick={(): Promise<void> => updateServices(props.topic, props.location, props.setServices)}>
            Send
        </button>
    );
};

const updateServices = async (topic: SelectedTopic, location: SelectedLocation, setServices: SetServices): Promise<void> => {
    try {
        const servicesResponse = await requestServices(topic, location);
        setServices(buildServicesLoadingType());
        const successServices = validateServicesResponse(servicesResponse);
        setServices(successServices);
    } catch (error) {
        setServices(error.buildErrorServiceType());
    }
};

const buildServicesLoadingType = (): LoadingServices  => (
    { type: 'Services:Loading' }
);