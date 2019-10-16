// tslint:disable:no-expression-statement no-let
import React from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../fixtures/dropdown_data/topics';
import { locationsForQA } from '../../fixtures/dropdown_data/locations';
import { Services, SetServices, LoadingServices, EmptyServices } from '../services/types';
import { requestServices, validateServicesResponse } from '../../api/services';
import { SelectedLocation, SelectedTopic, SetTopic, SetLocation} from './types';

export interface ApiQueryPickerProps {
    readonly services: Services;
    readonly selectedTopic: SelectedTopic;
    readonly selectedLocation: SelectedLocation;
}

export interface ApiQueryPickerActions {
    readonly setServices: SetServices;
    readonly setTopic: SetTopic;
    readonly setLocation: SetLocation;
}

type Props = ApiQueryPickerProps & ApiQueryPickerActions;

export const ApiQueryPicker = (props: Props): JSX.Element => {
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
            <Dropdown title={'Topic'} selectedOption={props.selectedTopic} onSetOption={onSetTopic} dropdownItemCollection={topicsForQA} />
            <Dropdown title={'Location'} selectedOption={props.selectedLocation} onSetOption={onSetLocation}
                dropdownItemCollection={locationsForQA} />
            <ClearButton clearSelectionOptions={clearSelectedOptions}/>
            <SendButton topic={props.selectedTopic} location={props.selectedLocation}
                services={props.services} setServices={props.setServices} />
        </div>
    );
};

const buildSelectedTopicType = (topicName: string): SelectedTopic => (
    { type: 'Topic', value: topicName}
);

const buildEmptyTopicType = (): SelectedTopic  => (
    { type: 'Topic', value: '' }
);

const buildSelectedLocationType = (locationName: string): SelectedLocation => (
    { type: 'Location', value: locationName}
);

const buildEmptyLocationType = (): SelectedLocation => (
    { type: 'Location', value: ''}
);

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

const buildEmptyServicesType = (): EmptyServices => (
    { type: 'Services:Empty'}
);