import { Dispatch, SetStateAction } from 'react';

export interface ValidTopicId {
    readonly type: 'TOPIC_ID:SUCCESS';
    readonly id: string;
}

export interface EmptyTopicId {
    readonly type: 'TOPIC_ID:EMPTY';
}

export type TopicId = ValidTopicId | EmptyTopicId;

export interface ValidLocationId {
    readonly type: 'LOCATION_ID:SUCCESS';
    readonly id: number;
}
export interface EmptyLocationId {
    readonly type: 'LOCATION_ID:EMPTY';
}

export type LocationId = ValidLocationId | EmptyLocationId;

export type SetTopic = Dispatch<SetStateAction<TopicId>>;

export type SetLocation = Dispatch<SetStateAction<LocationId>>;