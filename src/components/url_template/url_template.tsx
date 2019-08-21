// tslint:disable:no-expression-statement
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../dropdown_data/topics';
import { manualLocationsForQA } from '../../dropdown_data/manual_locations';

export type SelectedOption = string;

export type SetOption = Dispatch<SetStateAction<string>>;

export const UrlTemplate = (): JSX.Element => {
    const [selectedTopic, setTopic]: [SelectedOption, SetOption] = useState('');
    const [selectedManualLocation, setManualLocation]: [SelectedOption, SetOption] = useState('');
    const onSetTopic = (event: React.ChangeEvent<HTMLSelectElement>): void => setTopic(event.target.value);
    const onSetManualLocation = (event: React.ChangeEvent<HTMLSelectElement>): void => setManualLocation(event.target.value);
    return (
        <div>
            Topics: <Dropdown selectedOption={selectedTopic} onSetOption={onSetTopic} dropdownData={topicsForQA} />
            Location: <Dropdown selectedOption={selectedManualLocation} onSetOption={onSetManualLocation} dropdownData={manualLocationsForQA} />
            <ClearButton setTopic={setTopic} setManualLocation={setManualLocation} />
            <SendButton />
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
}

const SendButton = (): JSX.Element => (
    <button>Send</button>
);