// tslint:disable:no-expression-statement
import { requestServices, validateServicesResponse } from '../../api/services';
import { ApiQueryPickerProps } from './api_query_picker';
import { ValidAlgorithms, SetAlgorithmId, Locations, Location, Topics, Topic, Algorithm } from '../../application/types';
import { LocationId } from './types';
import { buildServicesLoadingType } from '../../application/build_types';
import * as constants from '../../application/constants';

export const updateServicesAndAlgorithm = (props: ApiQueryPickerProps): void => {
    if (props.algorithms.type !== constants.ALGORITHMS_SUCCESS) {
        return;
    }
    const algorithmUrl = updateAlgorithm(props.algorithms, props.setAlgorithmId);
    updateServices(props, algorithmUrl);
};

const updateAlgorithm = (algorithms: ValidAlgorithms, setAlgorithm: SetAlgorithmId): string => {
    const algorithm = chooseAlgorithmAtRandom(algorithms);
    setAlgorithm(algorithm.id);
    return algorithm.url;
};

const updateServices = async (props: ApiQueryPickerProps, algorithmUrl: string): Promise<void> => {
    try {
        const selectedLocationLongLat = buildLongLatFromId(props.location, props.locations);
        const servicesResponse = await requestServices(props.topic, selectedLocationLongLat, algorithmUrl);
        props.setServices(buildServicesLoadingType());
        const successServices = validateServicesResponse(servicesResponse);
        props.setServices(successServices);
    } catch (error) {
        props.setServices(error.buildErrorServiceType());
    }
};

const buildLongLatFromId = (selectedLocation: LocationId, locations: Locations): Location => {
    const locationsList = getValidLocations(locations);
    const listOfIds = locationsList.map((location: Location) => location.id);
    const indexOfSelectedLocation = listOfIds.indexOf(selectedLocation.id);
    return locationsList[indexOfSelectedLocation];
};

const chooseAlgorithmAtRandom = (algorithms: ValidAlgorithms ): Algorithm => {
    const randomIndex = Math.floor(Math.random() * algorithms.algorithms.length);
    return algorithms.algorithms[randomIndex];
};

export const getValidLocations = (locations: Locations): ReadonlyArray<Location> => {
   if (locations.type !== constants.LOCATIONS_SUCCESS) {
       return [];
   }
   return locations.locations;
};

export const getValidTopics = (topics: Topics): ReadonlyArray<Topic> => {
    if (topics.type !== constants.TOPICS_SUCCESS) {
        return [];
    }
    return topics.topics;
 };