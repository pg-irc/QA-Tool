import React from 'react';
import { DropdownItems } from './types';
import { LocationId, TopicId } from '../api_query_picker/types';
import * as constants from '../../application/constants';
import { Location, Topic, ValidLocations, ValidTopics} from '../../application/types';
import * as R from 'ramda';
import { getDropdownValue } from './get_dropdown_value';

export type SelectedOption = TopicId | LocationId;

export interface DropdownProps {
  readonly selectedOption: SelectedOption;
  readonly dropdownItems: DropdownItems;
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
        {renderAllDropdownOptions(props.dropdownItems)}
      </select>
  </React.Fragment>
);

const renderAllDropdownOptions = (options: DropdownItems): JSX.Element => {
  switch (options.type) {
    case constants.LOCATIONS_SUCCESS:
      return renderLocationsOptions(options);
    case constants.TOPICS_SUCCESS:
      return renderTopicsOptions(options);
    default:
      return <EmptyOption />;
  }
};

const renderLocationsOptions = (locations: ValidLocations): JSX.Element => {
  return (
    <React.Fragment>
      <option value=''>Select a location</option>
      { R.map(LocationOption, locations.locations) }
    </React.Fragment>
  );
};

const renderTopicsOptions = (topics: ValidTopics): JSX.Element => {
  return (
    <React.Fragment>
      <option value=''>Select a topic</option>
      { R.map(TopicOption, topics.topics) }
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