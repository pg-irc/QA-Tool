import { Dispatch, SetStateAction } from 'react';

export interface Location {
    readonly id: string;
    readonly name: string;
    readonly long_lat: string;
}

export interface EmptyLocations {
    readonly type: 'Locations:Empty';
}

export interface ValidLocations {
    readonly type: 'Locations:Success';
    readonly locations: ReadonlyArray<Location>;
}

export interface InvalidLocations {
    readonly type: 'Locations:Error';
    readonly errorMessage: string;
}

export interface LoadingLocations {
    readonly type: 'Locations:Loading';
}

export type Locations = ValidLocations | InvalidLocations | LoadingLocations | EmptyLocations;

export type SetLocations = Dispatch<SetStateAction<Locations>>;

export interface Topic {
    readonly id: string;
}

export interface EmptyTopics {
    readonly type: 'Topics:Empty';
}

export interface ValidTopics {
    readonly type: 'Topics:Success';
    readonly topics: ReadonlyArray<Topic>;
}

export interface InvalidTopics {
    readonly type: 'Topics:Error';
    readonly errorMessage: string;
}

export interface LoadingTopics {
    readonly type: 'Topics:Loading';
}

export type Topics = ValidTopics | InvalidTopics | LoadingTopics | EmptyTopics;

export type SetTopics = Dispatch<SetStateAction<Topics>>;