import { TopicId, LocationId  } from '../../components/api_query_picker/types';
import { LoadingServices, EmptyServices, InvalidServices } from '../../components/services/types';
import { EmptyLocations, EmptyTopics, EmptyAlgorithms, InvalidAlgorithms, EmptyAlgorithmId, InvalidLocations, InvalidTopics, Location, Topic } from '../types';

export const buildTopicIdType = (id: string): TopicId => (
    { type: 'Topic:Success', id }
);

export const buildEmptyTopicIdType = (): TopicId  => (
    { type: 'Topic:Empty', id: '' }
);

export const buildLocationIdType = (id: number): LocationId => (
    { type: 'Location:Success', id: id }
);

export const buildEmptyLocationIdType = (): LocationId => (
    { type: 'Location:Empty', id: 0 }
);

export const buildServicesLoadingType = (): LoadingServices  => (
    { type: 'Services:Loading' }
);

export const buildEmptyServicesType = (): EmptyServices => (
    { type: 'Services:Empty' }
);

export const buildEmptyAlgorithmsType = (): EmptyAlgorithms => (
    { type: 'Algorithms:Empty' }
);

export const buildEmptyLocationsType = (): EmptyLocations => (
    { type: 'Locations:Empty' }
);

export const buildEmptyTopicsType = (): EmptyTopics => (
    { type: 'Topics:Empty' }
);

export const buildEmptyAlgorithmIdType = (): EmptyAlgorithmId => (
    { type: 'Algorithm:Empty' }
);

export const buildInvalidAlgorithmsType = (errorMessage: string): InvalidAlgorithms => (
    { type: 'Algorithms:Error', errorMessage }
);

export const buildInvalidLocationsType = (errorMessage: string): InvalidLocations => (
    { type: 'Locations:Error', errorMessage }
);

export const buildInvalidTopicsType = (errorMessage: string): InvalidTopics => (
    { type: 'Topics:Error', errorMessage }
);

export const buildInvalidServicesType = (errorMessage: string): InvalidServices => (
    { type: 'Services:Error', errorMessage }
);

export const buildLocationType = (location: Location): Location => (
    { type: 'Location', ...location }
);

export const buildTopicType = (topic: Topic): Topic => (
    { type: 'Topic', ...topic }
);