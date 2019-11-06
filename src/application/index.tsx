// tslint:disable:no-expression-statement no-let
import React, { useState, useEffect } from 'react';
import { ApiQueryPicker } from '../components/api_query_picker/api_query_picker';
import { ServicesList } from '../components/services/services_list';
import { SetTopic, TopicId, SetLocation, LocationId } from '../components/api_query_picker/types';
import * as Builder from './build_types'; 
import { Locations, SetLocations, Topics, SetTopics, Algorithms, SetAlgorithms, SetAlgorithmId, AlgorithmId, Services, SetServices } from './types';
import * as constants from './constants';
import { requestAlgorithms } from '../api/algorithms';
import { requestLocations } from '../api/locations';
import { requestTopics } from '../api/topics';

export interface SharedStateAndCallbacks {
  readonly services: Services;
  readonly setServices: SetServices;
  readonly topic: TopicId;
  readonly setTopic: SetTopic;
  readonly location: LocationId;
  readonly setLocation: SetLocation;
  readonly algorithms: Algorithms;
  readonly setAlgorithms: SetAlgorithms;
  readonly algorithmId: AlgorithmId;
  readonly setAlgorithmId: SetAlgorithmId;
}

export const Application = (): JSX.Element => {
  const [services, setServices]: [Services, SetServices] = useState<Services>(Builder.buildEmptyServicesType());
  const [topic, setTopic]: [TopicId, SetTopic] = useState<TopicId>(Builder.buildEmptyTopicIdType());
  const [location, setLocation]: [LocationId, SetLocation] = useState<LocationId>(Builder.buildEmptyLocationIdType());
  const [algorithms, setAlgorithms]: [Algorithms, SetAlgorithms] = useState<Algorithms>(Builder.buildEmptyAlgorithmsType());
  const [algorithmId, setAlgorithmId]: [AlgorithmId, SetAlgorithmId] = useState<AlgorithmId>(Builder.buildEmptyAlgorithmIdType());
  const [locations, setLocations]: [Locations, SetLocations] = useState<Locations>(Builder.buildEmptyLocationsType());
  const [topics, setTopics]: [Topics, SetTopics] = useState<Topics>(Builder.buildEmptyTopicsType());
  useEffect(() => {
    const buildAlgorithmsFromApi = async (): Promise<void> => {
      const algorithmsFromApi = await requestAlgorithms();
      setAlgorithms(algorithmsFromApi);
    };
    const buildLocationsFromApi = async (): Promise<void> => {
      const locationsFromApi = await requestLocations();
      setLocations(locationsFromApi);
    };
    const buildTopicsFromApi = async (): Promise<void> => {
      const topicsFromApi = await requestTopics();
      setTopics(topicsFromApi);
    };
    buildAlgorithmsFromApi();
    buildLocationsFromApi();
    buildTopicsFromApi();
  }, []);
  const sharedStateAndCallbacks: SharedStateAndCallbacks = {
    services,
    setServices,
    topic,
    setTopic,
    location,
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
  if (algorithms.type === constants.ALGORITHMS_ERROR) {
    return <div>Failed to load algorithms for use.</div>;
  }
};