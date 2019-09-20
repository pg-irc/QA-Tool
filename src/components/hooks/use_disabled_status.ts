// tslint:disable:no-expression-statement
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { SelectedOption } from '../api_query_picker/api_query_picker';

export type SetDisabled = Dispatch<SetStateAction<boolean>>;

export const useDisabledStatus = (topic: SelectedOption, location: SelectedOption): boolean => {
    const [isDisabled, setDisabled]: [boolean, SetDisabled] = useState<boolean>(true);
    useEffect(() => {
        if (topic && location) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [topic, location, isDisabled]);
    return isDisabled;
};