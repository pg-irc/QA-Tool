import { Dispatch, SetStateAction } from 'react';

export interface Location {
    readonly type: 'Location';
    readonly id: number;
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
    readonly type: 'Topic';
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

export type AlgorithmId = string;

export interface Algorithm {
    readonly id: AlgorithmId;
    readonly url: string;
    readonly name?: string;
    readonly notes?: string;
}

export type SetAlgorithms = Dispatch<SetStateAction<Algorithms>>;
export type SetAlgorithmId = Dispatch<SetStateAction<AlgorithmId>>;

export interface EmptyAlgorithms {
    readonly type: 'Algorithms:Empty';
}

export interface ValidAlgorithms {
    readonly type: 'Algorithms:Success';
    readonly algorithms: ReadonlyArray<Algorithm>;
}

export interface InvalidAlgorithms {
    readonly type: 'Algorithms:Error';
    readonly errorMessage: string;
}

export interface LoadingAlgorithms {
    readonly type: 'Algorithms:Loading';
}

export type Algorithms = ValidAlgorithms | InvalidAlgorithms | LoadingAlgorithms | EmptyAlgorithms;