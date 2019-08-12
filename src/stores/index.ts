import { combineReducers } from 'redux';
import * as manual_user_location from './manual_user_location';

export interface Store {
    readonly manualUserLocation: manual_user_location.ManualUserLocationStore;
}

export const reducer = combineReducers<Store>({
    manualUserLocation: manual_user_location.reducer,
});