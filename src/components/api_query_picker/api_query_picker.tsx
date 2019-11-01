// tslint:disable:no-expression-statement
import React, { ChangeEvent } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { LocationId, TopicId } from './types';
import { buildEmptyLocationIdType, buildEmptyTopicIdType, buildEmptyServicesType, buildLocationIdType, buildTopicIdType} from '../../application/build_types';
import { SharedStateAndCallbacks } from '../../application';
import { Locations, Topics } from '../../application/types';
import { updateServices } from './update_services';
import * as constants from '../../application/constants';
import { isDisabled } from './helpers/is_disabled';

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
            {renderTopicsDropdownOrStatus(props.topic, props.topics, onSetTopic)}
            {renderLocationsDropdownOrStatus(props.location, props.locations, onSetLocation)}
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
    return (
        <button
        disabled={isDisabled(props)}
        onClick={(): void => updateServices(props)}>
            Send
        </button>
    );
};

const renderTopicsDropdownOrStatus = (topic: TopicId, topics: Topics, onSetTopic: OnSetTopic): JSX.Element => {
    switch (topics.type) {
        case constants.TOPICS_SUCCESS:
            return <Dropdown title={'Topics'} selectedOption={topic} onSetOption={onSetTopic} dropdownItems={topics} />;
        case constants.TOPICS_ERROR:
            return <p>Topics: {topics.errorMessage}. Refresh the page or contact the QA Tool administrator.</p>;
        case constants.TOPICS_LOADING:
            return <p>Topics: ...Loading</p>;
        default:
            return <p>Topics: Empty</p>;
    }
};

const renderLocationsDropdownOrStatus = (location: LocationId, locations: Locations, onSetLocation: OnSetLocation): JSX.Element => {
    switch (locations.type) {
        case constants.LOCATIONS_SUCCESS:
            return <Dropdown title={'Locations'} selectedOption={location} onSetOption={onSetLocation}
                dropdownItems={locations} />;
        case constants.LOCATIONS_ERROR:
            return <p>Locations: {locations.errorMessage}. Refresh the page or contact the QA Tool administrator.</p>;
        case constants.LOCATIONS_EMPTY:
            return <p>Locations: ...Loading</p>;
        default:
            return <p>Locations: Empty</p>;
    }
};
