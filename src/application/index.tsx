// tslint:disable: no-expression-statement
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ServiceRelevancyScore } from '../components/pages/service_relevancy_score';
import { Login } from '../components/pages/login/login';
import { User, SetUser } from './types';
import { buildEmptyUserType } from './build_types';
import { RouteChildrenProps, RouterProps } from 'react-router';
import * as constants from './constants';

export const Application = (): JSX.Element => {
    const [user, setUser]: [User, SetUser] = useState<User>(buildEmptyUserType);
    return (
        <Router>
            <Switch>
                <Route exact path={'/login'} render={(props: RouteChildrenProps): JSX.Element =>
                    <Login {...props} user={user} setUser={setUser}/>} />
                <PrivateRoute user={user} setUser={setUser} Component={ServiceRelevancyScore}/>
            </Switch>
        </Router>
        );
};

export interface UserProps {
    readonly user: User;
    readonly setUser: SetUser;
}
export interface PrivateRouteProps {
    readonly Component: React.ComponentType<RouterProps&UserProps>;
}

type Props = UserProps & PrivateRouteProps;

const PrivateRoute = (props: Props): JSX.Element => {
    return (
        <Route exact path={'/'} {...props} render={(renderProps: RouteChildrenProps): JSX.Element =>
           renderComponentOrRedirect(props, renderProps)
        }
      />
    );
  };

const renderComponentOrRedirect = (props: Props, renderProps: RouteChildrenProps): JSX.Element => {
    const Component = props.Component;
    if (props.user.type !== constants.USER_VALID) {
        return <Redirect to='/login'/>;
    }
    return <Component {...props} {...renderProps}/>;
}