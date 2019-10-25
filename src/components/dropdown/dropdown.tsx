import React from 'react';
import { DropdownItemCollection, DropdownItem } from './types';
import { SelectedLocation, SelectedTopic } from '../api_query_picker/types';

export interface DropdownProps {
  readonly selectedOption: SelectedTopic | SelectedLocation;
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
      <select value={props.selectedOption.value} onChange={props.onSetOption}>
        {renderAllDropdownOptions(props.dropdownItemCollection, props.selectedOption)}
      </select>
  </React.Fragment>
);

const renderAllDropdownOptions = (options: DropdownItemCollection, selectedOption: SelectedTopic | SelectedLocation): JSX.Element => (
  <React.Fragment>
    {renderFirstDropdownOption(selectedOption)}
    {options.map((option: DropdownItem) => renderOneDropdownOption(option))}
  </React.Fragment>
);

const renderOneDropdownOption = (option: DropdownItem): JSX.Element => {
  if (option.type === 'Location') {
    return (
      <option key={option.id} value={option.id}>{option.name}</option>
    );
  }
  return (
    <option key={option.id} value={option.id}>{option.id}</option> 
  );
};

const renderFirstDropdownOption = (foo: SelectedTopic | SelectedLocation): JSX.Element => {
  if (foo.type === 'Location') {
    return (
      <option value={0} disabled>Select a location</option>
    );
  }
  return (
    <option value={''} disabled>Select a topic</option>
  );
};