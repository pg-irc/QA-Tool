import { RelevancyScore, ScoreValue } from '../../application/types';
import * as constants from '../../application/constants';

export const isPreviouslyScored = (relevancyScore: RelevancyScore, scoreValue: ScoreValue): boolean => {
    if (relevancyScore.type !== constants.RELEVANCY_SCORE_VALID) {
        return false;
    }
    if (relevancyScore.value !== scoreValue) {
        return false;
    }
    return true;
};
