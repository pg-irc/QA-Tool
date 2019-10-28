import { Dispatch, SetStateAction } from 'react';

export interface ValidTopicId {
    readonly type: 'Topic:Success';
    readonly id: string;
}

export interface EmptyTopicId {
    readonly type: 'Topic:Empty';
    readonly id: '';
}

export type TopicId = ValidTopicId | EmptyTopicId;

export interface ValidLocationId {
    readonly type: 'Location:Success';
    readonly id: number;
}
export interface EmptyLocationId {
    readonly type: 'Location:Empty';
    readonly id: 0;
}

export type LocationId = ValidLocationId | EmptyLocationId;

export type SetTopic = Dispatch<SetStateAction<TopicId>>;

export type SetLocation = Dispatch<SetStateAction<LocationId>>;