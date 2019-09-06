// tslint:disable:no-expression-statement
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../dropdown/dropdown_data/topics';
import { manualLocationsForQA } from '../dropdown/dropdown_data/manual_locations';
import { Services, SetServices } from '../services/types';
import { searchServices } from '../../api/search_services';

export type SelectedOption = string;

export type SetOption = Dispatch<SetStateAction<string>>;

export interface APIQueryPickerProps {
    readonly services: Services;
}

export interface APIQueryPickerActions {
    readonly setServices: SetServices;
}

type Props = APIQueryPickerProps & APIQueryPickerActions;

export const APIQueryPicker = (props: Props): JSX.Element => {
    const [selectedTopic, setTopic]: [SelectedOption, SetOption] = useState('');
    const [selectedManualLocation, setManualLocation]: [SelectedOption, SetOption] = useState('');
    console.log(selectedManualLocation);
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => setTopic(event.target.value);
    const onSetManualLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => setManualLocation(event.target.value);
    const clearSelectedOptions = (): void => {
       setTopic('');
       setManualLocation('');
       props.setServices({type: 'Services:Empty'});
    };
    return (
        <div>
            <Dropdown title={'Topic'} selectedOption={selectedTopic} onSetOption={onSetTopic} dropdownData={topicsForQA} />
            <Dropdown title={'Location'} selectedOption={selectedManualLocation} onSetOption={onSetManualLocation}
                dropdownData={manualLocationsForQA} />
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

export type IsDisabled = boolean;

export type SetDisabled = Dispatch<SetStateAction<boolean>>;

const SendButton = (props: SendButtonProps): JSX.Element => {
    const [isDisabled, setDisabled]: [IsDisabled, SetDisabled] = useState<IsDisabled>(true);
    useEffect(() => {
        if (props.selectedTopic && props.selectedManualLocation) {
          setDisabled(false);
        }
        setDisabled(true);
      }, [props.selectedTopic, props.selectedManualLocation]);
    return (
        <button
            disabled={isDisabled}
            onClick={(): Promise<void> => updateServices(props.selectedTopic, props.selectedManualLocation, props.setServices)}>
            Send
        </button>
    );
}

const updateServices = async (topic: SelectedOption, manualLocation: SelectedOption, setServices: SetServices): Promise<void> => {
    setServices({type: 'Services:Loading'});
    const servicesAtLocationJSON = await searchServices(topic, manualLocation);
    setServices(servicesAtLocationJSON);
};