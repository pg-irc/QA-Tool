import { SelectedTopic, SelectedLocation } from './types';
import { LoadingServices, EmptyServices } from '../services/types';

export const buildSelectedTopicType = (topicName: string): SelectedTopic => (
    { type: 'Topic', value: topicName}
);

export const buildEmptyTopicType = (): SelectedTopic  => (
    { type: 'Topic', value: '' }
);

export const buildSelectedLocationType = (locationName: string): SelectedLocation => (
    { type: 'Location', value: locationName}
);

export const buildEmptyLocationType = (): SelectedLocation => (
    { type: 'Location', value: ''}
);

export const buildServicesLoadingType = (): LoadingServices  => (
    { type: 'Services:Loading' }
);

export const buildEmptyServicesType = (): EmptyServices => (
    { type: 'Services:Empty'}
);
