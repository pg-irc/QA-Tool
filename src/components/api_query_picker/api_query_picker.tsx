// tslint:disable:no-expression-statement
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../fixtures/dropdown_data/topics';
import { locationsForQA } from '../../fixtures/dropdown_data/locations';
import { Services, SetServices, LoadingServices } from '../services/types';
import { servicesApiRequest, validateServicesResponse } from '../../api/services';

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
    const [topic, setTopic]: [SelectedOption, SetOption] = useState('');
    const [location, setLocation]: [SelectedOption, SetOption] = useState('');
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => setTopic(event.target.value);
    const onSetLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => setLocation(event.target.value);
    const clearSelectedOptions = (): void => {
       setTopic('');
       setLocation('');
       props.setServices({type: 'Services:Empty'});
    };
    return (
        <div>
            <Dropdown title={'Topic'} selectedOption={topic} onSetOption={onSetTopic} dropdownItemCollection={topicsForQA} />
            <Dropdown title={'Location'} selectedOption={location} onSetOption={onSetLocation}
                dropdownItemCollection={locationsForQA} />
            <ClearButton clearSelectionOptions={clearSelectedOptions}/>
            <SendButton topic={topic} location={location}
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
    readonly topic: SelectedOption;
    readonly location: SelectedOption;
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

const updateServices = async (topic: SelectedOption, location: SelectedOption, setServices: SetServices): Promise<void> => {
    const servicesResponse = await servicesApiRequest(topic, location);
    setServices(setServicesToLoadingType());
    const errorOrSuccessServices = validateServicesResponse(servicesResponse);
    setServices(errorOrSuccessServices);
};

const setServicesToLoadingType = (): LoadingServices  => (
    { type: 'Services:Loading' }
);