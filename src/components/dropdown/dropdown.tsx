import React from 'react';
import { DropdownItemCollection, DropdownItem } from '../../fixtures/dropdown_data/types';
import { SelectedOption } from '../api_query_picker/api_query_picker';

export interface DropdownProps {
  readonly selectedOption: SelectedOption;
  readonly dropdownItemCollection: DropdownItemCollection;
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
        {renderAllDropdownOptions(props.dropdownItemCollection)}
      </select>
  </React.Fragment>
);

const renderAllDropdownOptions = (options: DropdownItemCollection): JSX.Element => (
  <React.Fragment>
    <option value='' disabled>Select an option</option>
    {options.map((option: DropdownItem) => renderOneDropdownOption(option))}
  </React.Fragment>
);

const renderOneDropdownOption = (option: DropdownItem): JSX.Element => {
  if ('lat_long' in option) {
    return (
      <option key={option.name} value={option.lat_long}>{option.name}</option>
    );
  }
  return (
    <option key={option.name} value={option.topic_id}>{option.name}</option>
  );
};
