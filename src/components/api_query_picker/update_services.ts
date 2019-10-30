// tslint:disable:no-expression-statement
import { requestServices, validateServicesResponse } from '../../api/services';
import { ApiQueryPickerProps } from './api_query_picker';
import { ValidAlgorithms, SetAlgorithmId, Locations, Location, Topics, Algorithm } from '../../application/types';
import { ValidLocationId } from './types';
import * as Builders from '../../application/build_types';
import * as constants from '../../application/constants';
import { LocationsCollection, TopicsCollection } from '../dropdown/types';

export const updateServices = (props: ApiQueryPickerProps): void => {
    if (props.algorithms.type === constants.ALGORITHMS_SUCCESS) {
        const randomAlgorithmUrl = getRandomAlgorithmUrl(props.algorithms, props.setAlgorithmId);
        getServices(props, randomAlgorithmUrl);
    }
};

const getRandomAlgorithmUrl = (algorithms: ValidAlgorithms, setAlgorithm: SetAlgorithmId): string => {
    const randomAlgorithm = chooseAlgorithmAtRandom(algorithms);
    setAlgorithm(randomAlgorithm.id);
    return randomAlgorithm.url;
};

const getServices = async (props: ApiQueryPickerProps, randomAlgorithmUrl: string): Promise<void> => {
    if (props.location.type === constants.LOCATION_ID_SUCCESS && props.topic.type === constants.TOPIC_ID_SUCCESS) {
        const selectedLocationLongLat = getLocationFromId(props.location, props.locations);
        const servicesResponse = await requestServices(props.topic, selectedLocationLongLat, randomAlgorithmUrl);
        props.setServices(Builders.buildServicesLoadingType());
        const services = validateServicesResponse(servicesResponse);
        props.setServices(services);
    }
};

const getLocationFromId = (selectedLocation: ValidLocationId, locations: Locations): Location => {
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

export const getLocationsForDropdown = (locations: Locations): LocationsCollection => {
   if (locations.type !== constants.LOCATIONS_SUCCESS) {
       return Builders.buildEmptyLocationsCollectionType();
   }
   return Builders.buildSuccessLocationsCollectionType(locations.locations);
};

export const getTopicsForDropdown = (topics: Topics): TopicsCollection => {
    if (topics.type !== constants.TOPICS_SUCCESS) {
        return Builders.buildEmptyTopicsCollectionType();
    }
    return Builders.buildSuccessTopicsCollectionsType(topics.topics);
 };