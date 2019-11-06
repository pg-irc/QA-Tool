import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ServiceRelevancyScore } from '../components/pages/service_relevancy_score';
import { Login } from '../components/pages/login_page';

export const Application = (): JSX.Element => (
    <Router>
        <Switch>
            <Route exact path={'/'} component={ServiceRelevancyScore}/>
            <Route exact path={'/login'} component={Login} />
        </Switch>
    </Router>
);