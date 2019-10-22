import { Locations } from '../types';
import { requestLocations, validateLocationsResponse } from '../../api/locations';

export const buildLocations = async (): Promise<Locations> => {
    try {
      const locationsResponse = await requestLocations();
      const validatedLocations = validateLocationsResponse(locationsResponse);
      return validatedLocations;
    } catch (error) {
      return error;
    }
  };