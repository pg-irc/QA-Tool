export type Name = string;
export type Value = string;

export type DropdownItemCollection = ReadonlyArray<DropdownItem>;

export interface DropdownItem {
    readonly [data: string]: Name;
}