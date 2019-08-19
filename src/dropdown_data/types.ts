export type Name = string;
export type Value = string;

export type DropdownData = ReadonlyArray<URLTemplateData>;

export interface URLTemplateData {
    readonly [data: string]: Name;
}