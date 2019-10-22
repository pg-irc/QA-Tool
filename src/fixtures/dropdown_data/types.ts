import { Location } from '../../application/types';
export type DropdownItemCollection = ReadonlyArray<DropdownItem>;

export type DropdownItem = Location | TopicItem;

export interface TopicItem {
    readonly name: string;
    readonly topic_id: string;
}