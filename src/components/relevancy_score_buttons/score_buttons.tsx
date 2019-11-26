import React, { useState } from 'react';
import { SendRelevancyScore } from '../services/services_list';
import { ScoreValue, Service, RelevancyScore, SetRelevancyScore } from '../../application/types';
import { buildEmptyRelevancyScoreType } from '../../application/build_types';
import { requestRelevancyScore } from './request_relevancy_score';
import { isPreviouslyScored } from './is_previously_scored';

export interface ScoreButtonsProps {
    readonly service: Service;
    readonly sendRelevancyScore: SendRelevancyScore;
}

export const ScoreButtons = (props: ScoreButtonsProps): JSX.Element => {
    const [relevancyScore, setRelevancyScore]: [RelevancyScore, SetRelevancyScore] = useState<RelevancyScore>(buildEmptyRelevancyScoreType());
    return (
    <div>
        <Button {...props} relevancyScore={relevancyScore} setRelevancyScore={setRelevancyScore} scoreValue={1} />
        <Button {...props} relevancyScore={relevancyScore} setRelevancyScore={setRelevancyScore} scoreValue={2} />
        <Button {...props} relevancyScore={relevancyScore} setRelevancyScore={setRelevancyScore} scoreValue={3} />
    </div>
    );
};

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