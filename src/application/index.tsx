// tslint:disable: no-expression-statement
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { User, SetUser } from './types';
import { buildEmptyUserType } from './build_types';
import { PageSwitcher } from '../components/page_switcher/page_switcher';

export const Application = (): JSX.Element => {
    const [user, setUser]: [User, SetUser] = useState<User>(buildEmptyUserType);
    return (
        <Router>
            <PageSwitcher user={user} setUser={setUser}/>
        </Router>
        );
};