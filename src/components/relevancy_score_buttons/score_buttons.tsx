import React, { useState } from 'react';
import { SendRelevancyScore } from '../services/services_list';
import { ScoreValue, Service, RelevancyScore, SetRelevancyScore } from '../../application/types';
import { buildEmptyRelevancyScoreType } from '../../application/build_types';
import { isPreviouslyScored, requestRelevancyScore } from './request_relevancy_score';

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
        disabled={isPreviouslyScored(props.relevancyScore, props.scoreValue)}
        onClick={(): void =>
           requestRelevancyScore(props)}>{props.scoreValue}</button>
    );
};