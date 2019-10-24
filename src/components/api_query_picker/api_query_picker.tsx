// tslint:disable:no-expression-statement no-let
import React, { ChangeEvent } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { requestServices, validateServicesResponse } from '../../api/services';
import { SelectedLocation, SelectedTopic } from './types';
import { buildEmptyLocationType, buildEmptyTopicType, buildEmptyServicesType, buildSelectedLocationType,
    buildSelectedTopicType, buildServicesLoadingType} from '../../application/helpers/build_types';
import { SharedStateAndCallbacks } from '../../application';
import { SetAlgorithmId, ValidAlgorithms, Algorithm } from '../../api/types';
import { Locations, Location, Topics, Topic } from '../../application/types';

export interface ApiQueryPickerProps {
    readonly locations: Locations;
    readonly topics: Topics;
}
type Props = ApiQueryPickerProps & SharedStateAndCallbacks;
export type OnSetLocation = (event: ChangeEvent<HTMLSelectElement>) => void;
export type OnSetTopic = (event: ChangeEvent<HTMLSelectElement>) => void;

export const ApiQueryPicker = (props: Props): JSX.Element => {
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setTopic(buildSelectedTopicType(event.target.value));
    };
    const onSetLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        props.setLocation(buildSelectedLocationType((event.target.value)));
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

const SendButton = (props: Props): JSX.Element => {
    const enabled = props.topic.value;
    return (
        <button
            disabled={!enabled}
            onClick={(): void => updateServicesAndAlgorithm(props)}>
            Send
        </button>
    );
};

const updateServicesAndAlgorithm = (props: Props): void => {
    if (props.algorithms.type !== 'Algorithms:Success') {
        return;
    }
    const algorithmUrl = updateAlgorithm(props.algorithms, props.setAlgorithmId);
    updateServices(props, algorithmUrl);
};

const updateAlgorithm = (algorithms: ValidAlgorithms, setAlgorithm: SetAlgorithmId): string => {
    const algorithm = chooseAlgorithmAtRandom(algorithms);
    setAlgorithm(algorithm.id);
    return algorithm.url;
};

const updateServices = async (props: Props, algorithmUrl: string): Promise<void> => {
    try {
        const selectedLocationLongLat = buildLongLatFromId(props.location, props.locations);
        const servicesResponse = await requestServices(props.topic, selectedLocationLongLat, algorithmUrl);
        props.setServices(buildServicesLoadingType());
        const successServices = validateServicesResponse(servicesResponse);
        props.setServices(successServices);
    } catch (error) {
        props.setServices(error.buildErrorServiceType());
    }
};

const buildLongLatFromId = (selectedLocation: SelectedLocation, locations: Locations): Location => {
    const locationsList = passLocationsList(locations);
    const listOfIds = locationsList.map((location: Location) => location.id);
    const indexOfSelectedLocation = listOfIds.indexOf(Number(selectedLocation.value));
    return locationsList[indexOfSelectedLocation];
};

const chooseAlgorithmAtRandom = (algorithms: ValidAlgorithms ): Algorithm => {
    const randomIndex = Math.floor(Math.random() * algorithms.algorithms.length);
    return algorithms.algorithms[randomIndex];
};

const passLocationsList = (locations: Locations): ReadonlyArray<Location> => {
   if (locations.type !== 'Locations:Success') {
       return [];
   }
   return locations.locations;
};

const passTopicsList = (topics: Topics): ReadonlyArray<Topic> => {
    if (topics.type !== 'Topics:Success') {
        return [];
    }
    return topics.topics;
 };

 const renderTopicsDropdownOrError = (topic: SelectedTopic, topics: Topics, onSetTopic: OnSetTopic): JSX.Element => {
    if (topics.type === 'Topics:Error') {
        return <div>Topics: {topics.errorMessage}. Refresh the page or contact the QA Tool administrator.</div>;
    }
    return (<Dropdown title={'Topic'} selectedOption={topic}
        onSetOption={onSetTopic} dropdownItemCollection={passTopicsList(topics)} />
    );
};

const renderLocationsDropdownOrError = (location: SelectedLocation, locations: Locations, onSetLocation: OnSetLocation): JSX.Element => {
    if (locations.type === 'Locations:Error') {
        return <div>Locations: {locations.errorMessage}. Refresh the page or contact the QA Tool administrator.</div>;
    }
    return (<Dropdown title={'Locations'} selectedOption={location}
        onSetOption={onSetLocation} dropdownItemCollection={passLocationsList(locations)} />
    );
};
