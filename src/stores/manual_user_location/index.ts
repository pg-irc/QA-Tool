import * as constants from '../../application/constants';
import { ManualUserLocationStore } from './types';
import { ManualUserLocationAction } from './actions';
export { ManualUserLocationStore };

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