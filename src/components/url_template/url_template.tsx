import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dropdown } from '../dropdown/dropdown';
import { topicsForQA } from '../../dropdown_data/topics';

export type SelectedOption = string;
export type SetOption = Dispatch<SetStateAction<string>>;

export const UrlTemplate = (): JSX.Element => {
    const [selectedOption, setOption]: [SelectedOption, SetOption] = useState('');
    const onSetOption = (event: React.ChangeEvent<HTMLSelectElement>): void => setOption(event.target.value);
    return (
    <div>
       Topics: <Dropdown selectedOption={selectedOption} onSetOption={onSetOption} dropdownData={topicsForQA}/>
    </div>
    );
};