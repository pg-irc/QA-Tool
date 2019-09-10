export type DropdownItemCollection = ReadonlyArray<DropdownItem>;

export type DropdownItem = LocationItem | TopicItem;

export interface LocationItem {
    readonly name: string;
    readonly lat_long: string;
}

export interface TopicItem {
    readonly name: string;
    readonly topic_id: string;
}