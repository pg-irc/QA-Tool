// tslint:disable: no-expression-statement
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ServiceRelevancyScore } from '../components/pages/service_relevancy_score';
import { Login } from '../components/pages/login_page';
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
                <PrivateRoute user={user} Component={ServiceRelevancyScore}/>
            </Switch>
        </Router>
        );
};
export interface PrivateRouteProps {
    readonly Component: React.ComponentType<RouterProps>;
    readonly user: User;
}

const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
    return (
        <Route exact path={'/'} {...props} render={(foo: RouteChildrenProps): JSX.Element =>
            props.user.type === constants.USER_VALID
            ? <props.Component {...foo} />
            : <Redirect to='/login'/>
        }
      />
    );
  };