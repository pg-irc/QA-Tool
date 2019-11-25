// tslint:disable: no-expression-statement
import React, { useState } from 'react';
import { SendRelevancyScore } from '../services/services_list';
import { ScoreValue, Service, RelevancyScore, SetRelevancyScore } from '../../application/types';
import * as constants from '../../application/constants';
import { buildEmptyRelevancyScoreType } from '../../application/build_types';

export interface ScoreButtonsProps {
    readonly service: Service;
    readonly sendRelevancyScore: SendRelevancyScore;
}

export const ScoreButtons = (props: ScoreButtonsProps): JSX.Element => {
    const [relevancyScore, setRelevancyScore]: [RelevancyScore, SetRelevancyScore] = useState<RelevancyScore>(buildEmptyRelevancyScoreType());
    return (
    <div>
        {renderButton(props, 1, relevancyScore, setRelevancyScore)}
        {renderButton(props, 2, relevancyScore, setRelevancyScore)}
        {renderButton(props, 3, relevancyScore, setRelevancyScore)}
    </div>
    );
};

const renderButton = (props: ScoreButtonsProps, scoreValue: number,
        relevancyScore: RelevancyScore, setRelevancyScore: SetRelevancyScore): JSX.Element => (
    <Button {...props} scoreValue={scoreValue} relevancyScore={relevancyScore} setRelevancyScore={setRelevancyScore}/>
);

export interface ButtonProps {
    readonly service: Service;
    readonly sendRelevancyScore: SendRelevancyScore;
    readonly scoreValue: ScoreValue;
    readonly relevancyScore: RelevancyScore;
    readonly setRelevancyScore: SetRelevancyScore;
}

const Button = (props: ButtonProps): JSX.Element => {
    return (
        <button
        disabled={checkIfPreviouslyScored(props.relevancyScore, props.scoreValue)}
        onClick={(): Promise<void> =>
            updateRelevancyScore(props)}>{props.scoreValue}</button>
    );
};

const updateRelevancyScore = async (props: ButtonProps): Promise<void> => {
    const blah = await props.sendRelevancyScore(props.service, props.scoreValue);
    props.setRelevancyScore(blah);
};

const checkIfPreviouslyScored = (relevancyScore: RelevancyScore, scoreValue: ScoreValue): boolean => {
    if (relevancyScore.type !== constants.RELEVANCY_SCORE_VALID) {
        return false;
    }
    if (relevancyScore.value !== scoreValue) {
        return false;
    }
    return true;
};
