import React from 'react';
import { SendRelevancyScore } from '../services/services_list';
import { Service } from '../services/types';

export type Score = string;

export interface ScoreButtonsProps {
    readonly service: Service;
    readonly sendRelevancyScore: SendRelevancyScore;
}

export const ScoreButtons = (props: ScoreButtonsProps): JSX.Element => (
    <div>
        {renderButton(props, '1')}
        {renderButton(props, '2')}
        {renderButton(props, '3')}
    </div>
);

const renderButton = (props: ScoreButtonsProps, scoreValue: string): JSX.Element => (
    <Button scoreButtonsProps={props} scoreValue={scoreValue}/>
);

const Button = (props: {readonly scoreButtonsProps: ScoreButtonsProps, readonly scoreValue: Score}): JSX.Element => (
    <button onClick={(): void =>
            props.scoreButtonsProps.sendRelevancyScore(props.scoreButtonsProps.service, props.scoreValue)}>{props.scoreValue}</button>
);