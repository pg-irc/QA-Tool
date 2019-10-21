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
import { AlgorithmId, SetAlgorithmId, Algorithms, ValidAlgorithms, Algorithm } from '../../api/types';

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

export interface SendButtonProps {
    readonly topic: SelectedTopic;
    readonly location: SelectedLocation;
    readonly services: Services;
    readonly setServices: SetServices;
    readonly algorithms: Algorithms;
    readonly algorithmId: AlgorithmId;
    readonly setAlgorithmId: SetAlgorithmId;
}

const SendButton = (props: SendButtonProps): JSX.Element => {
    const enabled = props.topic.value && props.location.value;
    return (
        <button
            disabled={!enabled}
            onClick={(): void => updateServicesAndAlgorithm(props)}>
            Send
        </button>
    );
};

const updateServicesAndAlgorithm = (props: SendButtonProps): void => {
    if (props.algorithms.type !== 'Algorithms:Success') {
        return;
    }
    const algorithmUrl = updateAlgorithm(props.algorithms, props.setAlgorithmId);
    updateServices(props.topic, props.location, props.setServices, algorithmUrl);
};

const updateAlgorithm = (algorithms: ValidAlgorithms, setAlgorithm: SetAlgorithmId): string => {
    const algorithm = chooseAlgorithmAtRandom(algorithms);
    setAlgorithm(algorithm.id);
    return algorithm.url;
};

const updateServices = async (topic: SelectedTopic, location: SelectedLocation, setServices: SetServices, algorithmUrl: string): Promise<void> => {
    try {
        const servicesResponse = await requestServices(topic, location, algorithmUrl);
        setServices(buildServicesLoadingType());
        const successServices = validateServicesResponse(servicesResponse);
        setServices(successServices);
    } catch (error) {
        setServices(error.buildErrorServiceType());
    }
};

const chooseAlgorithmAtRandom = (algorithms: ValidAlgorithms ): Algorithm => {
    const randomIndex = Math.floor(Math.random() * algorithms.algorithms.length);
    return algorithms.algorithms[randomIndex];
};