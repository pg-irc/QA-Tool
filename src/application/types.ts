import { Dispatch, SetStateAction } from 'react';

export interface Location {
    readonly type: 'LOCATION';
    readonly id: number;
    readonly name: string;
    readonly latitude: number;
    readonly longitude: number;
}

export interface EmptyLocations {
    readonly type: 'LOCATIONS:EMPTY';
}

export interface ValidLocations {
    readonly type: 'LOCATIONS:SUCCESS';
    readonly locations: ReadonlyArray<Location>;
}

export interface InvalidLocations {
    readonly type: 'LOCATIONS:ERROR';
    readonly errorMessage: string;
}

export interface LoadingLocations {
    readonly type: 'LOCATIONS:LOADING';
}

export type Locations = ValidLocations | InvalidLocations | LoadingLocations | EmptyLocations;

export type SetLocations = Dispatch<SetStateAction<Locations>>;

export interface Topic {
    readonly type: 'TOPIC';
    readonly id: string;
}

export interface EmptyTopics {
    readonly type: 'TOPICS:EMPTY';
}

export interface ValidTopics {
    readonly type: 'TOPICS:SUCCESS';
    readonly topics: ReadonlyArray<Topic>;
}

export interface InvalidTopics {
    readonly type: 'TOPICS:ERROR';
    readonly errorMessage: string;
}

export interface LoadingTopics {
    readonly type: 'TOPICS:LOADING';
}

export type Topics = ValidTopics | InvalidTopics | LoadingTopics | EmptyTopics;

export type SetTopics = Dispatch<SetStateAction<Topics>>;

export interface EmptyAlgorithmId {
    readonly type: 'ALGORITHM:EMPTY';
}

export interface ValidAlgorithmId {
    readonly type: 'ALGORITHM:SUCCESS';
    readonly id: number;
}

export type AlgorithmId = EmptyAlgorithmId | ValidAlgorithmId;

export interface Algorithm {
    readonly id: AlgorithmId;
    readonly url: string;
    readonly name?: string;
    readonly notes?: string;
}

export type SetAlgorithms = Dispatch<SetStateAction<Algorithms>>;
export type SetAlgorithmId = Dispatch<SetStateAction<AlgorithmId>>;

export interface EmptyAlgorithms {
    readonly type: 'ALGORITHMS:EMPTY';
}

export interface ValidAlgorithms {
    readonly type: 'ALGORITHMS:SUCCESS';
    readonly algorithms: ReadonlyArray<Algorithm>;
}

export interface InvalidAlgorithms {
    readonly type: 'ALGORITHMS:ERROR';
    readonly errorMessage: string;
}

export interface LoadingAlgorithms {
    readonly type: 'ALGORITHMS:LOADING';
}

export type Algorithms = ValidAlgorithms | InvalidAlgorithms | LoadingAlgorithms | EmptyAlgorithms;

export type ScoreValue = string;