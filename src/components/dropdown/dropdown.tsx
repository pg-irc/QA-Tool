import React from 'react';
import { TopicsData } from '../../dropdown_data/topics';

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
  return options.map((value: string) => drowpdownOption(value));
};

const drowpdownOption = (value: string): JSX.Element => (
  <option key={value} value={value}>{value}</option>
);
