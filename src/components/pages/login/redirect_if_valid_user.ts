// tslint:disable: no-expression-statement
import { User } from '../../../application/types';
import * as constants from '../../../application/constants';
import { LoginProps } from '.';

export const redirectIfValidUser = (user: User, props: LoginProps): void => {
    if (user.type === constants.USER_VALID) {
      props.history.push('/');
    }
  };