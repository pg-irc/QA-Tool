import * as constants from '../../application/constants';
import { TopicStore } from './types';
import { TopicAction } from './actions';
export { TopicStore };

export const buildDefaultStore = (): TopicStore => {
    return {
        topicId: undefined,
    };
};

export const reducer = (store: TopicStore = buildDefaultStore(), action?: TopicAction ): TopicStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_TOPIC:
            return { ...store, topicId: action.payload.topic};
        case constants.CLEAR_TOPIC:
            return { ...store, topicId: undefined};
        default:
            return store;
    }
};