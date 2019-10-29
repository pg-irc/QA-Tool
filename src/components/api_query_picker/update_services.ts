// tslint:disable:no-expression-statement
import { requestServices, validateServicesResponse } from '../../api/services';
import { ApiQueryPickerProps } from './api_query_picker';
import { ValidAlgorithms, SetAlgorithmId, Locations, Location, Topics, Algorithm } from '../../application/types';
import { LocationId } from './types';
import { buildServicesLoadingType } from '../../application/build_types';
import * as constants from '../../application/constants';
import { LocationsItemsCollection, TopicsItemsCollection } from '../dropdown/types';

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
    try {
        const selectedLocationLongLat = buildLongLatFromId(props.location, props.locations);
        const servicesResponse = await requestServices(props.topic, selectedLocationLongLat, randomAlgorithmUrl);
        props.setServices(buildServicesLoadingType());
        const successServices = validateServicesResponse(servicesResponse);
        props.setServices(successServices);
    } catch (error) {
        props.setServices(error.buildErrorServiceType());
    }
};

const buildLongLatFromId = (selectedLocation: LocationId, locations: Locations): Location => {
    const locationsList = getValidLocations(locations);
    const listOfIds = locationsList.items.map((location: Location) => location.id);
    const indexOfSelectedLocation = listOfIds.indexOf(selectedLocation.id);
    return locationsList[indexOfSelectedLocation];
};

const chooseAlgorithmAtRandom = (algorithms: ValidAlgorithms ): Algorithm => {
    const randomIndex = Math.floor(Math.random() * algorithms.algorithms.length);
    return algorithms.algorithms[randomIndex];
};

export const getValidLocations = (locations: Locations): LocationsItemsCollection => {
   if (locations.type !== constants.LOCATIONS_SUCCESS) {
       return {type: 'LOCATION', items: []};
   }
   return {type: 'LOCATION', items: locations.locations};
};

export const getValidTopics = (topics: Topics): TopicsItemsCollection => {
    if (topics.type !== constants.TOPICS_SUCCESS) {
        return {type: 'TOPIC', items: []};
    }
    return {type: 'TOPIC', items: topics.topics};
 };