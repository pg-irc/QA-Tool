import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { Dispatch, SetStateAction } from 'react';

export type UrlList = ReadonlyArray<string>;

export const availableServerUrls: UrlList = [
    'https://pathways-production.herokuapp.com',
    'https://fierce-ravine-89308.herokuapp.com',
];

export interface Algorithm {
    readonly id: string;
    readonly url: string;
    readonly name?: string;
    readonly notes?: string;
}

export type SetAlgorithms = Dispatch<SetStateAction<Algorithms>>;
export type SetAlgorithm = Dispatch<SetStateAction<Algorithm>>;

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


export const requestAlgorithms = async (): Promise<AxiosResponse>  => {
    const url = buildUrlForAlgorithms();
    return await axios.get(url)
    .then((response: AxiosResponse): AxiosResponse  => {
        return response;
    });
};

const buildUrlForAlgorithms = (): string => {
    const path = 'v1/algorithms';
    const baseUrl = 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};