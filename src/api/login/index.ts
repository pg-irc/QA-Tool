import axios, { AxiosResponse, AxiosError } from 'axios';
import buildUrl from 'build-url';
import { LoginData } from '../../components/pages/login_page';

export const requestLogin = async (loginData: LoginData): Promise<void> => {
    const url = buildLoginUrl();
    return await axios.post(url, {
        username: loginData.username,
        password: loginData.password,
    })
    .then((response: AxiosResponse): void => console.log(response.data))
    .catch((error: AxiosError): void =>  console.log(error.message));
};

export const buildLoginUrl = (): string => {
    const path = 'authenticate/';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};