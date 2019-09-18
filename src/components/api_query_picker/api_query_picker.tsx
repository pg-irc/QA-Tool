// tslint:disable:no-expression-statement
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../fixtures/dropdown_data/topics';
import { manualLocationsForQA } from '../../fixtures/dropdown_data/manual_locations';
import { Services, SetServices } from '../services/types';
import { searchServices } from '../../api/search_services';
import { useDisabledStatus } from '../hooks/use_disabled_status';

export type SelectedOption = string;

export type SetOption = Dispatch<SetStateAction<string>>;

export interface ApiQueryPickerProps {
    readonly services: Services;
}

export interface ApiQueryPickerActions {
    readonly setServices: SetServices;
}

type Props = ApiQueryPickerProps & ApiQueryPickerActions;

export const ApiQueryPicker = (props: Props): JSX.Element => {
    const [selectedTopic, setTopic]: [SelectedOption, SetOption] = useState('');
    const [selectedManualLocation, setManualLocation]: [SelectedOption, SetOption] = useState('');
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => setTopic(event.target.value);
    const onSetManualLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => setManualLocation(event.target.value);
    const clearSelectedOptions = (): void => {
       setTopic('');
       setManualLocation('');
       props.setServices({type: 'Services:Empty'});
    };
    return (
        <div>
            <Dropdown title={'Topic'} selectedOption={selectedTopic} onSetOption={onSetTopic} dropdownItemCollection={topicsForQA} />
            <Dropdown title={'Location'} selectedOption={selectedManualLocation} onSetOption={onSetManualLocation}
                dropdownItemCollection={manualLocationsForQA} />
            <ClearButton clearSelectionOptions={clearSelectedOptions}/>
            <SendButton selectedTopic={selectedTopic} selectedManualLocation={selectedManualLocation}
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
    readonly selectedTopic: SelectedOption;
    readonly selectedManualLocation: SelectedOption;
    readonly services: Services;
    readonly setServices: SetServices;
}

const SendButton = (props: SendButtonProps): JSX.Element => {
    const disabledStatus = useDisabledStatus(props.selectedTopic, props.selectedManualLocation);
    return (
        <button
            disabled={disabledStatus}
            onClick={(): Promise<void> => updateServices(props.selectedTopic, props.selectedManualLocation, props.setServices)}>
            Send
        </button>
    );
};

const updateServices = async (topic: SelectedOption, manualLocation: SelectedOption, setServices: SetServices): Promise<void> => {
    setServices({type: 'Services:Loading'});
    const servicesAtLocationJSON = await searchServices(topic, manualLocation);
    setServices(servicesAtLocationJSON);
};