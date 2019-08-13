import { createStore, compose } from 'redux';
import { buildDefaultStore, reducer } from '../stores';

// tslint:disable-next-line:no-any
export const buildStore = (): any => {
    const defaultStore = buildDefaultStore();
    const enhancers = compose();
    return createStore(reducer, defaultStore, enhancers);
};