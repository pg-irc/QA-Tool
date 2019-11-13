import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';
import { UserProps } from '../../application/types';
import { ServiceRelevancyScore } from '../pages/service_relevancy_score';
import { Login } from '../pages/login/login';
import { PrivateRoute } from './private_route';

export const PageSwitcher = (props: UserProps): JSX.Element => (
    <Switch>
        <Route exact path={'/login'} render={(renderProps: RouteChildrenProps): JSX.Element =>
            <Login {...renderProps} user={props.user} setUser={props.setUser}/>} />
        <PrivateRoute user={props.user} setUser={props.setUser} Component={ServiceRelevancyScore}/>
    </Switch>
);