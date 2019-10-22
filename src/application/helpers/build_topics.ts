import { Topics } from '../types';
import { requestTopics, validateTopicsResponse } from '../../api/topics';

export const buildTopics = async (): Promise<Topics> => {
    try {
      const topicsResponse = await requestTopics();
      const validatedTopics = validateTopicsResponse(topicsResponse);
      return validatedTopics;
    } catch (error) {
      return error;
    }
  };