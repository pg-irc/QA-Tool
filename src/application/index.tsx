import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ServiceRelevancyScore } from '../components/pages/service_relevancy_score';
import { Login } from '../components/pages/login_page';
import { User, SetUser } from './types';
import { buildEmptyUserType } from './build_types';
import { RouteChildrenProps } from 'react-router';

export const Application = (): JSX.Element => {
    const [user, setUser]: [User, SetUser] = useState<User>(buildEmptyUserType);
    return (
        <Router>
            <Switch>
                <Route exact path={'/'} component={ServiceRelevancyScore}/>
                <Route exact path={'/login'} render={(props: RouteChildrenProps): JSX.Element =>
                    <Login {...props} user={user} setUser={setUser}/>} />
            </Switch>
        </Router>
        );
};