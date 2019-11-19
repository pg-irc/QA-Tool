// tslint:disable: no-expression-statement
import React from 'react';
import { UserProps } from '../../application/types';
import { buildEmptyUserType } from '../../application/build_types';
import Cookies from 'js-cookie';

export const LogoutButton = (props: UserProps): JSX.Element => (
    <button onClick={(): void => logoutUser(props)}>Logout</button>
);

const logoutUser = (props: UserProps): void => {
    Cookies.remove('token');
    props.setUser(buildEmptyUserType());
};