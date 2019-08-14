import * as constants from '../../application/constants';
import { TopicAction } from './actions';

export type Topic = string;

export interface TopicStore {
    readonly topicId?: Topic;
}

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