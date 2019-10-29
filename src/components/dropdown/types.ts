import { Location, Topic } from '../../application/types';
export type DropdownItemsCollection = LocationsItemsCollection | TopicsItemsCollection;

export interface LocationsItemsCollection {
    readonly type: 'LOCATION';
    readonly items: ReadonlyArray<Location>;
// tslint:disable-next-line: no-mixed-interface
    readonly [index: number]: Location;
}
export interface TopicsItemsCollection {
    readonly type: 'TOPIC';
    readonly items: ReadonlyArray<Topic>;
}