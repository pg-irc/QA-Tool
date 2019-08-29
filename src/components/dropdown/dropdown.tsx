import React from 'react';
import { DropdownData, URLTemplateData } from './dropdown_data/types';
import { SelectedOption } from '../url_template/url_template';

export type DropdownOptions = DropdownData;

export interface DropdownProps {
  readonly selectedOption: SelectedOption;
  readonly dropdownData: DropdownData;
}

export interface DropdownActions {
  onSetOption(event: React.ChangeEvent<HTMLSelectElement>): void;
}

type Props = DropdownProps & DropdownActions;

export const Dropdown = (props: Props): JSX.Element => (
  <select value={props.selectedOption} onChange={props.onSetOption}>
    <option value='' disabled>Select an option</option>
    {renderDropdownOptions(props.dropdownData)}
  </select>
);

// tslint:disable:typedef
const renderDropdownOptions = (options: DropdownData) => {
  return options.map((option: URLTemplateData) => drowpdownOption(option));
};

const drowpdownOption = (option: URLTemplateData): JSX.Element => (
  <option key={option.name} value={option.value}>{option.name}</option>
);