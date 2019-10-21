import { Dispatch, SetStateAction } from 'react';

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