import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { LatLng } from './index';

export type SetManualUserLocationAction = Readonly<ReturnType<typeof setManualUserLocation>>;

export type ClearManualUserLocationAction = Readonly<ReturnType<typeof clearManualUserLocation>>;

export type ManualUserLocationAction = SetManualUserLocationAction | ClearManualUserLocationAction;

// tslint:disable-next-line:typedef
export const setManualUserLocation = (manualUserLocation: LatLng) => (
    helpers.makeAction(constants.SET_MANUAL_USER_LOCATION, { manualUserLocation })
);

// tslint:disable-next-line:typedef
export const clearManualUserLocation = () => (
    helpers.makeAction(constants.CLEAR_MANUAL_USER_LOCATION)
);
