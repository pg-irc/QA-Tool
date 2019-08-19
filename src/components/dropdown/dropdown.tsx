import React from 'react';
import { TopicsData, URLTemplateData } from '../../dropdown_data/topics';

export type DropdownData = TopicsData;

export interface DropdownProps {
  readonly dropdownData: DropdownData;
}

export const Dropdown = (props: DropdownProps): JSX.Element => (
  <select>
    {renderDropdownOptions(props.dropdownData)}
  </select>
);

// tslint:disable:typedef
const renderDropdownOptions = (options: DropdownData) => {
  return options.map((option: URLTemplateData) => drowpdownOption(option));
};

const drowpdownOption = (option: URLTemplateData): JSX.Element => (
  <option key={option.name} value={option.value}>{option.value}</option>
);
