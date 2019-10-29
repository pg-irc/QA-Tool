import React from 'react';
import { DropdownItemsCollection, ValidLocationsCollection, ValidTopicsCollection } from './types';
import { LocationId, TopicId } from '../api_query_picker/types';
import * as constants from '../../application/constants';
import { Location, Topic} from '../../application/types';
import * as R from 'ramda';
import { getDropdownValue } from './get_dropdown_value';

export type SelectedOption = TopicId | LocationId;
export interface DropdownProps {
  readonly selectedOption: SelectedOption;
  readonly dropdownItemsCollection: DropdownItemsCollection;
  readonly title: string;
}

export interface DropdownActions {
  onSetOption(event: React.ChangeEvent<HTMLSelectElement>): void;
}

type Props = DropdownProps & DropdownActions;

export const Dropdown = (props: Props): JSX.Element => (
  <React.Fragment>
      <label>{props.title}</label>
      <select value={getDropdownValue(props.selectedOption)} onChange={props.onSetOption}>
        {renderAllDropdownOptions(props.dropdownItemsCollection)}
      </select>
  </React.Fragment>
);

const renderAllDropdownOptions = (options: DropdownItemsCollection): JSX.Element => {
  switch (options.type) {
    case constants.LOCATIONS_COLLECTION_SUCCESS:
      return renderLocationsOptions(options);
    case constants.TOPICS_COLLECTION_SUCCESS:
      return renderTopicsOptions(options);
    default:
      return <EmptyOption />;
  }
};

const renderLocationsOptions = (locations: ValidLocationsCollection): JSX.Element => {
  return (
    <React.Fragment>
      <option value={0}>Select a location</option>
      { R.map(LocationOption, locations.items) }
    </React.Fragment>
  );
};

const renderTopicsOptions = (topics: ValidTopicsCollection): JSX.Element => {
  return (
    <React.Fragment>
      <option value={0}>Select a topic</option>
      { R.map(TopicOption, topics.items) }
    </React.Fragment>
  );
};

const LocationOption = (location: Location): JSX.Element => (
  <option key={location.id} value={location.id}>{location.name}</option>
);

const TopicOption = (topic: Topic): JSX.Element => (
  <option key={topic.id} value={topic.id}>{topic.id}</option>
);

const EmptyOption = (): JSX.Element => (
  <option disabled>Nothing to select</option>
);