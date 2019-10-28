// tslint:disable:no-expression-statement
import { requestServices, validateServicesResponse } from '../../api/services';
import { ApiQueryPickerProps } from './api_query_picker';
import { ValidAlgorithms, SetAlgorithmId, Locations, Location, Topics, Topic, Algorithm } from '../../application/types';
import { SelectedLocation } from './types';
import { buildServicesLoadingType } from '../../application/helpers/build_types';

export const updateServicesAndAlgorithm = (props: ApiQueryPickerProps): void => {
    if (props.algorithms.type !== 'Algorithms:Success') {
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

const buildLongLatFromId = (selectedLocation: SelectedLocation, locations: Locations): Location => {
    const locationsList = provideLocationsList(locations);
    const listOfIds = locationsList.map((location: Location) => location.id);
    const indexOfSelectedLocation = listOfIds.indexOf(selectedLocation.value);
    return locationsList[indexOfSelectedLocation];
};

const chooseAlgorithmAtRandom = (algorithms: ValidAlgorithms ): Algorithm => {
    const randomIndex = Math.floor(Math.random() * algorithms.algorithms.length);
    return algorithms.algorithms[randomIndex];
};

export const provideLocationsList = (locations: Locations): ReadonlyArray<Location> => {
   if (locations.type !== 'Locations:Success') {
       return [];
   }
   return locations.locations;
};

export const provideTopicsList = (topics: Topics): ReadonlyArray<Topic> => {
    if (topics.type !== 'Topics:Success') {
        return [];
    }
    return topics.topics;
 };