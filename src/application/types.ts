import { Dispatch, SetStateAction } from 'react';
export interface Location {
    readonly id: string;
    readonly name: string;
    readonly lat_long: string;
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