import React from 'react';

export const ScoreButtons = (): JSX.Element => (
    <div>
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
    </div>
);

const renderButton = (scoreValue: string): JSX.Element => (
    <Button scoreValue = {scoreValue}/>
);

const Button = (props: { readonly scoreValue: string}): JSX.Element => (
    <button>{props.scoreValue}</button>
);