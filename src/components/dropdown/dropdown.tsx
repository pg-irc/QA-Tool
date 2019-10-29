import React from 'react';
import { DropdownItemCollection, DropdownItem } from './types';
import { LocationId, TopicId } from '../api_query_picker/types';
import * as constants from '../../application/constants';

export type SelectedOption = TopicId | LocationId;
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
      <select value={props.selectedOption.id} onChange={props.onSetOption}>
        {renderAllDropdownOptions(props.dropdownItemCollection, props.selectedOption)}
      </select>
  </React.Fragment>
);

const renderAllDropdownOptions = (options: DropdownItemCollection, selectedOption: SelectedOption): JSX.Element => (
  <React.Fragment>
    {renderFirstDropdownOption(selectedOption)}
    {options.map((option: DropdownItem) => renderOneDropdownOption(option))}
  </React.Fragment>
);

const renderOneDropdownOption = (option: DropdownItem): JSX.Element => {
  if (option.type === constants.LOCATION) {
    return (
      <option key={option.id} value={option.id}>{option.name}</option>
    );
  }
  return (
    <option key={option.id} value={option.id}>{option.id}</option>
  );
};

const renderFirstDropdownOption = (option: SelectedOption): JSX.Element => {
  if (option.type === 'LOCATION_ID:EMPTY') {
    return (
      <option disabled>Select a location</option>
    );
  }
  return (
    <option disabled>Select a topic</option>
  );
};