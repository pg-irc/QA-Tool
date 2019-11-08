// tslint:disable: no-expression-statement
import React from 'react';
import useForm from 'react-hook-form';
import { requestLogin } from '../../api/login';
import { RouteChildrenProps } from 'react-router';
import { SetUser, User } from '../../application/types';
import * as constants from '../../application/constants';

export interface LoginData {
    readonly username: string;
    readonly password: string;
}

export interface LoginProps {
  readonly user: User;
  readonly setUser: SetUser;
}

type Props = LoginProps & RouteChildrenProps;

export const Login = (props: Props): JSX.Element => {
// tslint:disable-next-line: typedef
  const { register, handleSubmit, errors } = useForm<LoginData>();
  const getUserFromApi = async (loginData: LoginData): Promise<void> => {
    const userState = await requestLogin(loginData);
    props.setUser(userState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(getUserFromApi)}>
          <h1>Login</h1>
          <label>Username</label>
          <input name='username' ref={register({ required: true })} />
          {errors.username && 'Username is required'}
          <label>Password</label>
          <input name='password' type='password' ref={register({ required: true})} />
          {errors.password && 'Password is required'}
        <input type='submit' />
      </form>
      {renderUserStatusMessage(props.user)}
    </div>
  );
};

const renderUserStatusMessage = (user: User): JSX.Element | void => {
  switch (user.type) {
    case constants.USER_VALID:
      return <h2>Login Success!</h2>;
    case constants.USER_INVALID:
    return <h2>Username/Password invalid. Please try again. </h2>;
    default:
      return <div></div>;
  }
};
