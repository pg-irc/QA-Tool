import React from 'react';
import { DropdownData, URLTemplateData } from './dropdown_data/types';
import { SelectedOption } from '../api_query_picker/api_query_picker';

export interface DropdownProps {
  readonly selectedOption: SelectedOption;
  readonly dropdownData: DropdownData;
  readonly title: string;
}

export interface DropdownActions {
  onSetOption(event: React.ChangeEvent<HTMLSelectElement>): void;
}

type Props = DropdownProps & DropdownActions;

export const Dropdown = (props: Props): JSX.Element => (
  <React.Fragment>
      <label>{props.title}</label>
      <select value={props.selectedOption} onChange={props.onSetOption}>
        {renderDropdownOptions(props.dropdownData)}
      </select>
  </React.Fragment>
);

const renderDropdownOptions = (options: DropdownData): JSX.Element => (
  <>
    <option value='' disabled>Select an option</option>
    {options.map((option: URLTemplateData) => drowpdownOption(option))}
  </>
);

const drowpdownOption = (option: URLTemplateData): JSX.Element => (
  <option key={option.name} value={option.value}>{option.name}</option>
);