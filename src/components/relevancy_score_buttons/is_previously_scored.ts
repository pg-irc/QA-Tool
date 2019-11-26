import { RelevancyScore, ScoreValue } from '../../application/types';
import * as constants from '../../application/constants';

export const isPreviouslyScored = (relevancyScore: RelevancyScore, scoreValue: ScoreValue): boolean => (
    relevancyScore.type === constants.RELEVANCY_SCORE_VALID && relevancyScore.value === scoreValue
);
