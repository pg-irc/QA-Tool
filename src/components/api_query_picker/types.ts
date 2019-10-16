import { Dispatch, SetStateAction } from 'react';

export interface SelectedTopic {
    readonly type: 'Topic';
    readonly value: string;
}

export interface SelectedLocation {
    readonly type: 'Location';
    readonly value: string;
}

export type SetTopic = Dispatch<SetStateAction<SelectedTopic>>;

export type SetLocation = Dispatch<SetStateAction<SelectedLocation>>;