// tslint:disable: no-expression-statement
import { ButtonProps } from './score_buttons';
import { ValidRelevancyScore, SetRelevancyScore, RelevancyScore, ScoreValue } from '../../application/types';
import { requestPutRelevancyScore } from '../../api/relevancy_scores/relevancy_score';
import * as constants from '../../application/constants';

export const requestRelevancyScore = (props: ButtonProps): void => {
    if (props.relevancyScore.type !== constants.RELEVANCY_SCORE_VALID) {
        postRelevancyScore(props);
    } else {
        putRelevancyScore(props.relevancyScore, props.setRelevancyScore, props.scoreValue);
    }
};

const postRelevancyScore = async (props: ButtonProps): Promise<void> => {
    const relevancyScoreResponse = await props.sendRelevancyScore(props.service, props.scoreValue);
    props.setRelevancyScore(relevancyScoreResponse);
};

const putRelevancyScore = async (relevancyScore: ValidRelevancyScore, setRelevancyScore: SetRelevancyScore,
        updatedScoreValue: ScoreValue): Promise<void> => {
    const relevancyScoreResponse = await requestPutRelevancyScore(relevancyScore, updatedScoreValue);
    setRelevancyScore(relevancyScoreResponse);
};

export const isPreviouslyScored = (relevancyScore: RelevancyScore, scoreValue: ScoreValue): boolean => {
    if (relevancyScore.type !== constants.RELEVANCY_SCORE_VALID) {
        return false;
    }
    if (relevancyScore.value !== scoreValue) {
        return false;
    }
    return true;
};
