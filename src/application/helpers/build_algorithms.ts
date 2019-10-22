import { Algorithms } from '../../api/types';
import { requestAlgorithms, validateAlgorithmsResponse } from '../../api/available_algorithms';

export const buildAlgorithms = async (): Promise<Algorithms> => {
    try {
      const algorithmsResponse = await requestAlgorithms();
      const validatedAlgorithms = validateAlgorithmsResponse(algorithmsResponse);
      return validatedAlgorithms;
    } catch (error) {
      return error;
    }
  };