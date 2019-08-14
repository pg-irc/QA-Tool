import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { Topic } from './index';

export type SetTopicAction = Readonly<ReturnType<typeof setTopic>>;

export type ClearTopicAction = Readonly<ReturnType<typeof clearTopic>>;

export type TopicAction = SetTopicAction | ClearTopicAction;

// tslint:disable-next-line:typedef
export const setTopic = (topic: Topic) => (
    helpers.makeAction(constants.SET_TOPIC, { topic })
);

// tslint:disable-next-line:typedef
export const clearTopic = () => (
    helpers.makeAction(constants.CLEAR_TOPIC)
);
