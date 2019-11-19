// tslint:disable: no-expression-statement
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { User, SetUser } from './types';
import { buildEmptyUserType } from './build_types';
import { PageSwitcher } from '../components/page_switcher/page_switcher';
import { buildInitialUserType } from './build_initial_states';

export const Application = (): JSX.Element => {
    const [user, setUser]: [User, SetUser] = useState<User>(buildEmptyUserType);
    useEffect(() => {
        buildInitialUserType(setUser);
      }, []);
    return (
        <Router>
            <PageSwitcher user={user} setUser={setUser}/>
        </Router>
        );
};