import { SelectedTopic, SelectedLocation } from '../../components/api_query_picker/types';
import { LoadingServices, EmptyServices } from '../../components/services/types';
import { LoadingAlgorithms } from '../../api/types';

export const buildSelectedTopicType = (topicName: string): SelectedTopic => (
    { type: 'Topic', value: topicName }
);

export const buildEmptyTopicType = (): SelectedTopic  => (
    { type: 'Topic', value: '' }
);

export const buildSelectedLocationType = (locationName: string): SelectedLocation => (
    { type: 'Location', value: locationName }
);

export const buildEmptyLocationType = (): SelectedLocation => (
    { type: 'Location', value: '' }
);

export const buildServicesLoadingType = (): LoadingServices  => (
    { type: 'Services:Loading' }
);

export const buildEmptyServicesType = (): EmptyServices => (
    { type: 'Services:Empty' }
);

export const buildEmptyAlgorithmsType = (): LoadingAlgorithms => (
    { type: 'Algorithms:Loading' }
);