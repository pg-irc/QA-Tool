import { Algorithms } from '../../api/types';
import { requestAlgorithms, validateAlgorithmsResponse } from '../../api/available_algorithms';

export const buildAlgorithms = async (): Promise<Algorithms> => {
    try {
      const algorithmsResponse = await requestAlgorithms();
      const foo = validateAlgorithmsResponse(algorithmsResponse);
      return foo;
    } catch (error) {
      return error;
    }
  };