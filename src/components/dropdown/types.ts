import { Location, Topic } from '../../application/types';
export type DropdownItemsCollection = LocationsCollection | TopicsCollection;

export type LocationsCollection = ValidLocationsCollection | EmptyLocationsCollection;
export type TopicsCollection = ValidTopicsCollection | EmptyTopicsCollection;

export interface EmptyLocationsCollection {
    readonly type: 'LOCATIONS_COLLECTION:EMPTY';
}

export interface ValidLocationsCollection {
    readonly type: 'LOCATIONS_COLLECTION:SUCCESS';
    readonly items: ReadonlyArray<Location>;
}

export interface EmptyTopicsCollection {
    readonly type: 'TOPICS_COLLECTION:EMPTY';
}

export interface ValidTopicsCollection {
    readonly type: 'TOPICS_COLLECTION:SUCCESS';
    readonly items: ReadonlyArray<Topic>;
}
