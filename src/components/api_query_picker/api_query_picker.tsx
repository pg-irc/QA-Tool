// tslint:disable:no-expression-statement
import React, { ChangeEvent } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { LocationId, TopicId } from './types';
import { buildEmptyLocationIdType, buildEmptyTopicIdType, buildEmptyServicesType, buildLocationIdType, buildTopicIdType} from '../../application/build_types';
import { SharedStateAndCallbacks } from '../../application';
import { Locations, Topics } from '../../application/types';
import { updateServices, getLocationsForDropdown, getTopicsForDropdown } from './update_services';
import * as constants from '../../application/constants';
export interface LocationsAndTopicsProps {
    readonly locations: Locations;
    readonly topics: Topics;
}

export type ApiQueryPickerProps = LocationsAndTopicsProps & SharedStateAndCallbacks;

export type OnSetLocation = (event: ChangeEvent<HTMLSelectElement>) => void;
export type OnSetTopic = (event: ChangeEvent<HTMLSelectElement>) => void;

export const ApiQueryPicker = (props: ApiQueryPickerProps): JSX.Element => {
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setTopic(buildTopicIdType(event.target.value));
    };
    const onSetLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setLocation(buildLocationIdType(Number(event.target.value)));
    };
    const clearSelectedOptions = (): void => {
        props.setTopic(buildEmptyTopicIdType());
        props.setLocation(buildEmptyLocationIdType());
        props.setServices(buildEmptyServicesType());
    };
    return (
        <div>
            {renderTopicsDropdownOrError(props.topic, props.topics, onSetTopic)}
            {renderLocationsDropdownOrError(props.location, props.locations, onSetLocation)}
            <ClearButton clearSelectionOptions={clearSelectedOptions} />
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
    const enabled = props.topic.id && props.location.id;
    return (
        <button
            disabled={!enabled}
            onClick={(): void => updateServices(props)}>
            Send
        </button>
    );
};

const renderTopicsDropdownOrError = (topic: TopicId, topics: Topics, onSetTopic: OnSetTopic): JSX.Element => {
    if (topics.type === constants.TOPICS_ERROR) {
        return <div>Topics: {topics.errorMessage}. Refresh the page or contact the QA Tool administrator.</div>;
    }
    return (<Dropdown title={'Topic'} selectedOption={topic}
        onSetOption={onSetTopic} dropdownItemsCollection={getTopicsForDropdown(topics)} />
    );
};

const renderLocationsDropdownOrError = (location: LocationId, locations: Locations, onSetLocation: OnSetLocation): JSX.Element => {
    if (locations.type === constants.LOCATIONS_ERROR) {
        return <div>Locations: {locations.errorMessage}. Refresh the page or contact the QA Tool administrator.</div>;
    }
    return (<Dropdown title={'Locations'} selectedOption={location}
        onSetOption={onSetLocation} dropdownItemsCollection={getLocationsForDropdown(locations)} />
    );
};
