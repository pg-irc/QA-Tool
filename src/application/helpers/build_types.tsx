import { SelectedTopic, SelectedLocation  } from '../../components/api_query_picker/types';
import { LoadingServices, EmptyServices } from '../../components/services/types';
import { EmptyLocations, EmptyTopics, EmptyAlgorithms, InvalidAlgorithms, EmptyAlgorithmId } from '../types';

export const buildSelectedTopicType = (topicName: string): SelectedTopic => (
    { type: 'Topic', value: topicName }
);

export const buildEmptyTopicType = (): SelectedTopic  => (
    { type: 'Topic', value: '' }
);

export const buildSelectedLocationType = (id: number): SelectedLocation => (
    { type: 'Location', value: id }
);

export const buildEmptyLocationType = (): SelectedLocation => (
    { type: 'Location', value: 0 }
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