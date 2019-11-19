import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';
import { UserProps } from '../../application/types';
import { ServiceRelevancyScore } from '../pages/service_relevancy_score';
import { Login } from '../pages/login';
import { PrivateRoute } from './private_route';
import * as constants from '../../application/constants';

export const PageSwitcher = (props: UserProps): JSX.Element => {
    const renderLoginOrRedirect = (renderProps: RouteChildrenProps): JSX.Element => {
        if (props.user.type !== constants.USER_VALID) {
            return <Login {...renderProps} user={props.user} setUser={props.setUser} />;
        }
        return <Redirect to='/'/>;
    };
    return (
        <Switch>
        <Route exact path={'/login'} render={renderLoginOrRedirect} />;
        <PrivateRoute user={props.user} setUser={props.setUser} Component={ServiceRelevancyScore}/>
    </Switch>
    );
};
