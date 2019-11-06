// tslint:disable:no-expression-statement
import * as Builder from './build_types';
import { requestAlgorithms } from '../api/algorithms';
import { requestLocations } from '../api/locations';
import { requestTopics } from '../api/topics';
import { SetAlgorithms, SetLocations, SetTopics } from './types';

export const buildAlgorithmsFromApi = async (setAlgorithms: SetAlgorithms): Promise<void> => {
    setAlgorithms(Builder.buildAlgorithmsLoadingType());
    const algorithmsFromApi = await requestAlgorithms();
    setAlgorithms(algorithmsFromApi);
};

export const buildLocationsFromApi = async (setLocations: SetLocations): Promise<void> => {
    setLocations(Builder.buildLocationsLoadingType());
    const locationsFromApi = await requestLocations();
    setLocations(locationsFromApi);
};

export const buildTopicsFromApi = async (setTopics: SetTopics): Promise<void> => {
    setTopics(Builder.buildTopicsLoadingType());
    const topicsFromApi = await requestTopics();
    setTopics(topicsFromApi);
};