import React from 'react';
import { RouteChildrenProps, RouterProps, Redirect, Route } from 'react-router';
import { UserProps } from '../../application/types';
import * as constants from '../../application/constants';

export interface PrivateRouteProps {
    readonly Component: React.ComponentType<RouterProps&UserProps>;
}

type Props = UserProps & PrivateRouteProps;

export const PrivateRoute = (props: Props): JSX.Element => {
    return (
        <Route exact path={'/'} {...props} render={(renderProps: RouteChildrenProps): JSX.Element =>
           renderComponentOrRedirect(props, renderProps)
        } />
    );
  };

const renderComponentOrRedirect = (props: Props, renderProps: RouteChildrenProps): JSX.Element => {
    const Component = props.Component;
    if (props.user.type !== constants.USER_VALID) {
        return <Redirect to='/login'/>;
    }
    return <Component {...props} {...renderProps}/>;
};