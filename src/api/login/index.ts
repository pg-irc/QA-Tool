// tslint:disable no-expression-statement
import axios, { AxiosResponse, AxiosError } from 'axios';
import buildUrl from 'build-url';
import { LoginData } from '../../components/pages/login_page';
import Cookies from 'js-cookie';
import { User, ValidUser, InvalidUser } from '../../application/types';
import { buildValidUserType, buildInvalidUserType } from '../../application/build_types';

export const requestLogin = async (loginData: LoginData): Promise<User> => {
    const url = buildLoginUrl();
    return await axios.post(url, {
        username: loginData.username,
        password: loginData.password,
    })
    .then((response: AxiosResponse): ValidUser => {
        Cookies.set('token', response.data.token);
        return buildValidUserType();
    })
    .catch((error: AxiosError): InvalidUser =>  buildInvalidUserType(error.message));
};

export const buildLoginUrl = (): string => {
    const path = 'authenticate/';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};