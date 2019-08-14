import * as constants from '../../application/constants';
import { ManualUserLocationAction } from './actions';

export interface LatLng {
    readonly latitude: number;
    readonly longitude: number;
}

export interface ManualUserLocationStore {
    readonly manualUserLocation?: LatLng;
}

export const buildDefaultStore = (): ManualUserLocationStore => (
    {}
);

export const reducer = (store: ManualUserLocationStore = buildDefaultStore(), action?: ManualUserLocationAction ): ManualUserLocationStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_MANUAL_USER_LOCATION:
            return { ...store, manualUserLocation: action.payload.manualUserLocation};
        case constants.CLEAR_MANUAL_USER_LOCATION:
            return { ...store, manualUserLocation: undefined};
        default:
            return store;
    }
};