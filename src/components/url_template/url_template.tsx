// tslint:disable:no-expression-statement
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../dropdown_data/topics';
import { manualLocationsForQA } from '../../dropdown_data/manual_locations';
import { Services, SetServices } from '../services/types';
import { servicesAtLocation } from '../../api/get_services_at_location';

export type SelectedOption = string;

export type SetOption = Dispatch<SetStateAction<string>>;

export interface Props {
    readonly services: Services;
    readonly setServices: SetServices;
}

export const UrlTemplate = (props: Props): JSX.Element => {
    const [selectedTopic, setTopic]: [SelectedOption, SetOption] = useState('');
    const [selectedManualLocation, setManualLocation]: [SelectedOption, SetOption] = useState('');
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => setTopic(event.target.value);
    const onSetManualLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => setManualLocation(event.target.value);
    return (
        <div>
            Topics: <Dropdown selectedOption={selectedTopic} onSetOption={onSetTopic} dropdownData={topicsForQA} />
            Location: <Dropdown selectedOption={selectedManualLocation} onSetOption={onSetManualLocation} dropdownData={manualLocationsForQA} />
            <ClearButton setTopic={setTopic} setManualLocation={setManualLocation} />
            <SendButton selectedTopic={selectedTopic} selectedManualLocation={selectedManualLocation}
                services={props.services} setServices={props.setServices}/>
            <p>Topic: {selectedTopic}</p>
            <p>Location: {selectedManualLocation}</p>
        </div>
    );
};

export interface ClearButtonProps {
    readonly setTopic: SetOption;
    readonly setManualLocation: SetOption;
}

const ClearButton = (props: ClearButtonProps): JSX.Element => (
    <button onClick={(): void => clearSelectedOptions(props)}>Clear</button>
);

const clearSelectedOptions = (props: ClearButtonProps): void => {
    props.setTopic('');
    props.setManualLocation('');
};

export interface SendButtonProps {
    readonly selectedTopic: SelectedOption;
    readonly selectedManualLocation: SelectedOption;
    readonly services: Services;
    readonly setServices: SetServices;
}

const SendButton = (props: SendButtonProps): JSX.Element => (
    <button onClick={(): Promise<Services> => updateServicesAtLocation(props.selectedTopic, props.selectedManualLocation, props.setServices)}>
        Send
    </button>
 );

const updateServicesAtLocation = async (topic: SelectedOption, manualLocation: SelectedOption, setServices: SetServices): Promise<Services> => {
    const servicesAtLocationJSON = await servicesAtLocation(topic, manualLocation);
    setServices(servicesAtLocationJSON);
    return servicesAtLocationJSON;
};