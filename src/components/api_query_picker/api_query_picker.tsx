// tslint:disable:no-expression-statement no-let
import React from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../fixtures/dropdown_data/topics';
import { locationsForQA } from '../../fixtures/dropdown_data/locations';
import { Services, SetServices } from '../services/types';
import { requestServices, validateServicesResponse } from '../../api/services';
import { SelectedLocation, SelectedTopic } from './types';
import { buildEmptyLocationType, buildEmptyTopicType, buildEmptyServicesType, buildSelectedLocationType,
    buildSelectedTopicType, buildServicesLoadingType} from './build_types';
import { SharedStateAndCallbacks } from '../Application';

export type ApiQueryPickerProps = SharedStateAndCallbacks;

export const ApiQueryPicker = (props: ApiQueryPickerProps): JSX.Element => {
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setTopic(buildSelectedTopicType(event.target.value));
    };
    const onSetLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setLocation(buildSelectedLocationType(event.target.value));
    };
    const clearSelectedOptions = (): void => {
        props.setTopic(buildEmptyTopicType());
        props.setLocation(buildEmptyLocationType());
        props.setServices(buildEmptyServicesType());
    };
    return (
        <div>
            <Dropdown title={'Topic'} selectedOption={props.topic}
            onSetOption={onSetTopic} dropdownItemCollection={topicsForQA} />
            <Dropdown title={'Location'} selectedOption={props.location} onSetOption={onSetLocation}
                dropdownItemCollection={locationsForQA} />
            <ClearButton clearSelectionOptions={clearSelectedOptions}/>
            <SendButton topic={props.topic} location={props.location}
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
    const enabled = props.topic.value && props.location.value;
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