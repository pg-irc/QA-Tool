import { Locations, Topics } from '../types';
import { Algorithms } from '../../api/types';
import { requestAlgorithms, validateAlgorithmsResponse } from '../../api/available_algorithms';
import { requestLocations, validateLocationsResponse } from '../../api/locations';
import { requestTopics, validateTopicsResponse } from '../../api/topics';

export const buildAlgorithms = async (): Promise<Algorithms> => {
    try {
      const algorithmsResponse = await requestAlgorithms();
      const validatedAlgorithms = validateAlgorithmsResponse(algorithmsResponse);
      return validatedAlgorithms;
    } catch (error) {
      return error.buildErrorAlgorithmsType();
    }
  };

export const buildLocations = async (): Promise<Locations> => {
    try {
        const locationsResponse = await requestLocations();
        const validatedLocations = validateLocationsResponse(locationsResponse);
        return validatedLocations;
    } catch (error) {
        return error.buildErrorLocationsType();
    }
};

export const buildTopics = async (): Promise<Topics> => {
    try {
      const topicsResponse = await requestTopics();
      const validatedTopics = validateTopicsResponse(topicsResponse);
      return validatedTopics;
    } catch (error) {
      return error.buildErrorTopicsType();
    }
};