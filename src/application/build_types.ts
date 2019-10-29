import { ValidTopicId, EmptyTopicId, ValidLocationId, EmptyLocationId } from '../components/api_query_picker/types';
import { LoadingServices, EmptyServices, InvalidServices } from '../components/services/types';
import { EmptyLocations, EmptyTopics, EmptyAlgorithms, InvalidAlgorithms, EmptyAlgorithmId, InvalidLocations, InvalidTopics, Location, Topic } from './types';
import * as constants from './constants';
import { ValidLocationsCollection, EmptyLocationsCollection, ValidTopicsCollection, EmptyTopicsCollection } from '../components/dropdown/types';

export const buildTopicIdType = (id: string): ValidTopicId => (
    { type: constants.TOPIC_ID_SUCCESS, id }
);

export const buildEmptyTopicIdType = (): EmptyTopicId  => (
    { type: constants.TOPIC_ID_EMPTY }
);

export const buildLocationIdType = (id: number): ValidLocationId => (
    { type: constants.LOCATION_ID_SUCCESS, id: id }
);

export const buildEmptyLocationIdType = (): EmptyLocationId => (
    { type: constants.LOCATION_ID_EMPTY }
);

export const buildServicesLoadingType = (): LoadingServices  => (
    { type: constants.SERVICES_LOADING }
);

export const buildEmptyServicesType = (): EmptyServices => (
    { type: constants.SERVICES_EMPTY }
);

export const buildEmptyAlgorithmsType = (): EmptyAlgorithms => (
    { type: constants.ALGORITHMS_EMPTY }
);

export const buildEmptyLocationsType = (): EmptyLocations => (
    { type: constants.LOCATIONS_EMPTY }
);

export const buildEmptyTopicsType = (): EmptyTopics => (
    { type: constants.TOPICS_EMPTY }
);

export const buildEmptyAlgorithmIdType = (): EmptyAlgorithmId => (
    { type: constants.ALGORITHM_EMPTY }
);

export const buildInvalidAlgorithmsType = (errorMessage: string): InvalidAlgorithms => (
    { type: constants.ALGORITHMS_ERROR, errorMessage }
);

export const buildInvalidLocationsType = (errorMessage: string): InvalidLocations => (
    { type: constants.LOCATIONS_ERROR, errorMessage }
);

export const buildInvalidTopicsType = (errorMessage: string): InvalidTopics => (
    { type: constants.TOPICS_ERROR, errorMessage }
);

export const buildInvalidServicesType = (errorMessage: string): InvalidServices => (
    { type: constants.SERVICES_ERROR, errorMessage }
);

export const buildLocationType = (location: Location): Location => (
    { type: constants.LOCATION, ...location }
);

export const buildTopicType = (topic: Topic): Topic => (
    { type: constants.TOPIC, ...topic }
);

export const buildSuccessLocationsCollectionType = (locations: ReadonlyArray<Location>): ValidLocationsCollection => (
    { type: constants.LOCATIONS_COLLECTION_SUCCESS, items: locations }
);

export const buildEmptyLocationsCollectionType = (): EmptyLocationsCollection => (
    { type: constants.LOCATIONS_COLLECTION_EMPTY }
);

export const buildSuccessTopicsCollectionsType = (topics: ReadonlyArray<Topic>): ValidTopicsCollection => (
    { type: constants.TOPICS_COLLECTION_SUCCESS, items: topics}
);

export const buildEmptyTopicsCollectionType = (): EmptyTopicsCollection => (
    { type: constants.TOPICS_COLLECTION_EMPTY }
);