import { combineReducers } from 'redux';
import * as manual_user_location from './manual_user_location';
import * as topics from './topics';

export interface Store {
    readonly manualUserLocation: manual_user_location.ManualUserLocationStore;
    readonly topics: topics.TopicStore;
}

export const buildDefaultStore = (): Store => ({
    manualUserLocation: manual_user_location.buildDefaultStore(),
    topics: topics.buildDefaultStore(),
});

export const reducer = combineReducers<Store>({
    manualUserLocation: manual_user_location.reducer,
    topics: topics.reducer,
});
