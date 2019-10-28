import { Locations, Topics, Algorithms } from '../types';
import { requestAlgorithms, validateAlgorithmsResponse } from '../../api/algorithms';
import { requestLocations, validateLocationsResponse } from '../../api/locations';
import { requestTopics, validateTopicsResponse } from '../../api/topics';

export const buildAlgorithms = async (): Promise<Algorithms> => {
  const algorithmsResponse = await requestAlgorithms();
  const validatedAlgorithms = validateAlgorithmsResponse(algorithmsResponse);
  return validatedAlgorithms;
};

export const buildLocations = async (): Promise<Locations> => {
  const locationsResponse = await requestLocations();
  const validatedLocations = validateLocationsResponse(locationsResponse);
  return validatedLocations;
};

export const buildTopics = async (): Promise<Topics> => {
  const topicsResponse = await requestTopics();
  const validatedTopics = validateTopicsResponse(topicsResponse);
  return validatedTopics;
};