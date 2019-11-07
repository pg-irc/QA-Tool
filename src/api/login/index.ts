// tslint:disable no-expression-statement
import axios, { AxiosResponse, AxiosError } from 'axios';
import buildUrl from 'build-url';
import { LoginData } from '../../components/pages/login_page';
import Cookies from 'js-cookie';

export const requestLogin = async (loginData: LoginData): Promise<void> => {
    const url = buildLoginUrl();
    return await axios.post(url, {
        username: loginData.username,
        password: loginData.password,
    })
    .then((response: AxiosResponse): void => {
        Cookies.set('token', response.data.token);
    })
    .catch((error: AxiosError): void =>  console.log(error.message));
};

export const buildLoginUrl = (): string => {
    const path = 'authenticate/';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};