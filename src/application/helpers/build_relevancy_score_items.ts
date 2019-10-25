import { Locations, Topics, Algorithms } from '../types';
import { requestAlgorithms, validateAlgorithmsResponse } from '../../api/algorithms';
import { requestLocations, validateLocationsResponse } from '../../api/locations';
import { requestTopics, validateTopicsResponse } from '../../api/topics';

export const buildAlgorithms = async (): Promise<Algorithms> => {
    try {
      const algorithmsResponse = await requestAlgorithms();
      const validatedAlgorithms = validateAlgorithmsResponse(algorithmsResponse);
      return validatedAlgorithms;
    } catch (error) {
      return { type: 'Algorithms:Error', errorMessage: error.message};
    }
  };

export const buildLocations = async (): Promise<Locations> => {
    try {
        const locationsResponse = await requestLocations();
        const validatedLocations = validateLocationsResponse(locationsResponse);
        return validatedLocations;
    } catch (error) {
      return { type: 'Locations:Error', errorMessage: error.message};
    }
};

export const buildTopics = async (): Promise<Topics> => {
    try {
      const topicsResponse = await requestTopics();
      const validatedTopics = validateTopicsResponse(topicsResponse);
      return validatedTopics;
    } catch (error) {
      return { type: 'Topics:Error', errorMessage: error.message };
    }
};