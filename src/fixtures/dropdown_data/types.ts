import { Location, Topic } from '../../application/types';
export type DropdownItemCollection = ReadonlyArray<DropdownItem>;

export type DropdownItem = Location | Topic;