import React from 'react';
import { UserProps } from '../../application/types';
import { buildEmptyUserType } from '../../application/build_types';

export const LogoutButton = (props: UserProps): JSX.Element => (
    <button onClick={(): void => logoutUser(props)}>Logout</button>
);

export const logoutUser = (props: UserProps): void => (
    props.setUser(buildEmptyUserType())
);