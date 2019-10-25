// tslint:disable:no-expression-statement
import React, { ChangeEvent } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { SelectedLocation, SelectedTopic } from './types';
import { buildEmptyLocationType, buildEmptyTopicType, buildEmptyServicesType, buildSelectedLocationType, buildSelectedTopicType} from '../../application/helpers/build_types';
import { SharedStateAndCallbacks } from '../../application';
import { Locations, Topics } from '../../application/types';
import { updateServicesAndAlgorithm, provideLocationsList, provideTopicsList } from './update_services_and_algorithm';

export interface LocationsAndTopicsProps {
    readonly locations: Locations;
    readonly topics: Topics;
}

export type ApiQueryPickerProps = LocationsAndTopicsProps & SharedStateAndCallbacks;

export type OnSetLocation = (event: ChangeEvent<HTMLSelectElement>) => void;
export type OnSetTopic = (event: ChangeEvent<HTMLSelectElement>) => void;

export const ApiQueryPicker = (props: ApiQueryPickerProps): JSX.Element => {
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setTopic(buildSelectedTopicType(event.target.value));
    };
    const onSetLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setLocation(buildSelectedLocationType(Number(event.target.value)));
    };
    const clearSelectedOptions = (): void => {
        props.setTopic(buildEmptyTopicType());
        props.setLocation(buildEmptyLocationType());
        props.setServices(buildEmptyServicesType());
    };
    return (
        <div>
            {renderTopicsDropdownOrError(props.topic, props.topics, onSetTopic)}
            {renderLocationsDropdownOrError(props.location, props.locations, onSetLocation)}
            <ClearButton clearSelectionOptions={clearSelectedOptions}/>
            <SendButton {...props} />
        </div>
    );
};

export interface ClearButtonProps {
    readonly clearSelectionOptions: () => void;
}

const ClearButton = (props: ClearButtonProps): JSX.Element => (
    <button onClick={(): void => props.clearSelectionOptions()}>Clear</button>
);

const SendButton = (props: ApiQueryPickerProps): JSX.Element => {
    const enabled = props.topic.value && props.location.value;
    return (
        <button
            disabled={!enabled}
            onClick={(): void => updateServicesAndAlgorithm(props)}>
            Send
        </button>
    );
};

const renderTopicsDropdownOrError = (topic: SelectedTopic, topics: Topics, onSetTopic: OnSetTopic): JSX.Element => {
    if (topics.type === 'Topics:Error') {
        return <div>Topics: {topics.errorMessage}. Refresh the page or contact the QA Tool administrator.</div>;
    }
    return (<Dropdown title={'Topic'} selectedOption={topic}
        onSetOption={onSetTopic} dropdownItemCollection={provideTopicsList(topics)} />
    );
};

const renderLocationsDropdownOrError = (location: SelectedLocation, locations: Locations, onSetLocation: OnSetLocation): JSX.Element => {
    if (locations.type === 'Locations:Error') {
        return <div>Locations: {locations.errorMessage}. Refresh the page or contact the QA Tool administrator.</div>;
    }
    return (<Dropdown title={'Locations'} selectedOption={location}
        onSetOption={onSetLocation} dropdownItemCollection={provideLocationsList(locations)} />
    );
};
