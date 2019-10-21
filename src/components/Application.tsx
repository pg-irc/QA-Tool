// tslint:disable:no-expression-statement no-let
import React, { useState, useEffect } from 'react';
import { ApiQueryPicker } from './api_query_picker/api_query_picker';
import { Services, SetServices } from './services/types';
import { ServicesList } from './services/services_list';
import { SetTopic, SelectedTopic, SetLocation, SelectedLocation } from './api_query_picker/types';
import { requestAlgorithms, validateAlgorithmsResponse } from '../api/available_algorithms';
import { Algorithms, SetAlgorithms, SetAlgorithm, Algorithm } from '../api/types';

export interface SharedStateAndCallbacks {
  readonly services: Services;
  readonly topic: SelectedTopic;
  readonly location: SelectedLocation;
  readonly setServices: SetServices;
  readonly setTopic: SetTopic;
  readonly setLocation: SetLocation;
  readonly algorithms: Algorithms;
  readonly setAlgorithms: SetAlgorithms;
  readonly algorithm: Algorithm;
  readonly setAlgorithm: SetAlgorithm;
}

export const buildAlgorithms = async (): Promise<Algorithms> => {
  try {
    const algorithmsResponse = await requestAlgorithms();
    const foo = validateAlgorithmsResponse(algorithmsResponse);
    return foo;
  } catch (error) {
    return error;
  }
};

export const Application = (): JSX.Element => {
  let selectedTopic: SelectedTopic = {
    type: 'Topic',
    value: '',
  };
  let selectedLocation: SelectedLocation = {
    type: 'Location',
    value: '',
  };
  const [services, setServices]: [Services, SetServices] = useState<Services>({type: 'Services:Empty'});
  const [topic, setTopic]: [SelectedTopic, SetTopic] = useState(selectedTopic);
  const [location, setLocation]: [SelectedLocation, SetLocation] = useState(selectedLocation);
  const [algorithms, setAlgorithms]: [Algorithms, SetAlgorithms] = useState<Algorithms>({type: 'Algorithms:Empty'});
  const [algorithm, setAlgorithm]: [Algorithm, SetAlgorithm] = useState<Algorithm>({id: '', url: ''});
  useEffect(() => {
    const buildAlgorithmsFromApi = async (): Promise<void> => {
      const algorithmsFromApi = await buildAlgorithms();
      setAlgorithms(algorithmsFromApi);
    };
    buildAlgorithmsFromApi();
  });
  const sharedStateAndCallbacks: SharedStateAndCallbacks = {
    services,
    topic,
    location,
    setServices,
    setTopic,
    setLocation,
    algorithms,
    algorithm,
    setAlgorithms,
    setAlgorithm,
  };

  return (
    <div>
      <ApiQueryPicker {...sharedStateAndCallbacks} />
      <ServicesList {...sharedStateAndCallbacks} />
    </div>
  );
};
