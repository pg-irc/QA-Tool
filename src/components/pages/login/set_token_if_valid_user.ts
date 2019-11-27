// tslint:disable: no-expression-statement
import * as constants from '../../../application/constants';
import Cookies from 'js-cookie';
import { User } from '../../../application/types';

export const setTokenIfValidUser = (user: User): void => {
    if (user.type === constants.USER_VALID) {
      Cookies.set('token', user.token, {expires: 7});
    }
};