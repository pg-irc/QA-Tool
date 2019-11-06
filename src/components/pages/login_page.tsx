import React from 'react';
import useForm from 'react-hook-form';
import { requestLogin } from '../../api/login';

export interface LoginData {
    readonly username: string;
    readonly password: string;
}

export const Login = (): JSX.Element => {
// tslint:disable-next-line: typedef
  const { register, handleSubmit, errors } = useForm<LoginData>();

  return (
    <form onSubmit={handleSubmit(requestLogin)}>
        <h1>Login</h1>
        <label>Username</label>
        <input name='username' ref={register({ required: true })} />
        {errors.username && 'Username is required'}
        <label>Password</label>
        <input name='password' type='password' ref={register({ required: true})} />
        {errors.password && 'Password is required'}
      <input type='submit' />
    </form>
  );
};