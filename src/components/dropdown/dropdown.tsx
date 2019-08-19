import React from 'react';
import { TopicsData, URLTemplateData } from '../../dropdown_data/topics';
import { SelectedOption } from '../url_template/url_template';

export type DropdownData = TopicsData;

export interface DropdownProps {
  readonly selectedOption: SelectedOption;
  readonly dropdownData: DropdownData;
}

export interface DropdownActions {
  onSetOption(event: React.ChangeEvent<HTMLSelectElement>): void;
}

type Props = DropdownProps & DropdownActions;

export const Dropdown = (props: Props): JSX.Element => (
  <select onChange={props.onSetOption}>
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