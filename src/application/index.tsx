// tslint:disable:no-expression-statement no-let
import React, { useState, useEffect } from 'react';
import { ApiQueryPicker } from '../components/api_query_picker/api_query_picker';
import { Services, SetServices } from '../components/services/types';
import { ServicesList } from '../components/services/services_list';
import { SetTopic, SelectedTopic, SetLocation, SelectedLocation } from '../components/api_query_picker/types';
import { Algorithms, SetAlgorithms, SetAlgorithmId, AlgorithmId } from '../api/types';
import { buildAlgorithms, buildLocations, buildTopics } from './helpers/build_relevancy_score_items';
import { buildEmptyServicesType, buildEmptyAlgorithmsType, buildEmptyLocationsType, buildEmptyTopicsType } from './helpers/build_types';
import { Locations, SetLocations, Topics, SetTopics } from './types';

export interface SharedStateAndCallbacks {
  readonly services: Services;
  readonly topic: SelectedTopic;
  readonly location: SelectedLocation;
  readonly setServices: SetServices;
  readonly setTopic: SetTopic;
  readonly setLocation: SetLocation;
  readonly algorithms: Algorithms;
  readonly setAlgorithms: SetAlgorithms;
  readonly algorithmId: AlgorithmId;
  readonly setAlgorithmId: SetAlgorithmId;
}

export const Application = (): JSX.Element => {
  let selectedTopic: SelectedTopic = {
    type: 'Topic',
    value: '',
  };
  let selectedLocation: SelectedLocation = {
    type: 'Location',
    value: '',
  };
  const [services, setServices]: [Services, SetServices] = useState<Services>(buildEmptyServicesType());
  const [topic, setTopic]: [SelectedTopic, SetTopic] = useState(selectedTopic);
  const [location, setLocation]: [SelectedLocation, SetLocation] = useState(selectedLocation);
  const [algorithms, setAlgorithms]: [Algorithms, SetAlgorithms] = useState<Algorithms>(buildEmptyAlgorithmsType());
  const [algorithmId, setAlgorithmId]: [AlgorithmId, SetAlgorithmId] = useState<AlgorithmId>('');
  const [locations, setLocations]: [Locations, SetLocations] = useState<Locations>(buildEmptyLocationsType());
  const [topics, setTopics]: [Topics, SetTopics] = useState<Topics>(buildEmptyTopicsType());
  useEffect(() => {
    const buildRelevancyScoreItemsFromApi = async (): Promise<void> => {
      const algorithmsFromApi = await buildAlgorithms();
      const locationsFromApi = await buildLocations();
      const topicsFromApi = await buildTopics();
      setAlgorithms(algorithmsFromApi);
      setLocations(locationsFromApi);
      setTopics(topicsFromApi);
    };
    buildRelevancyScoreItemsFromApi();
  }, []);
  const sharedStateAndCallbacks: SharedStateAndCallbacks = {
    services,
    topic,
    location,
    setServices,
    setTopic,
    setLocation,
    algorithms,
    algorithmId,
    setAlgorithms,
    setAlgorithmId,
  };
  return (
    <div>
      <ApiQueryPicker {...sharedStateAndCallbacks} locations={locations} topics={topics}/>
      {renderErrorIfAlgorithmsErrorType(algorithms)}
      <ServicesList {...sharedStateAndCallbacks} />
    </div>
  );
};

const renderErrorIfAlgorithmsErrorType = (algorithms: Algorithms): JSX.Element|void => {
  if (algorithms.type === 'Algorithms:Error') {
    return <div>Failed to load algorithms for use.</div>;
  }
};