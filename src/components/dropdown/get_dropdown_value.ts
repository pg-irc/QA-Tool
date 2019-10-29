import { SelectedOption } from './dropdown';
import * as constants from '../../application/constants';

export const getDropdownValue = (selectedOption: SelectedOption): string | number => {
    if (selectedOption.type !== constants.TOPIC_ID_SUCCESS && selectedOption.type !== constants.LOCATION_ID_SUCCESS) {
        return '';
    }
    return selectedOption.id;
};