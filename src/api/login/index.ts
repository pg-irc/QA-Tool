// tslint:disable no-expression-statement
import axios, { AxiosResponse } from 'axios';
import buildUrl from 'build-url';
import { LoginData } from '../../components/pages/login';
import { User } from '../../application/types';
import { buildInvalidUserType, buildEmptyUserType } from '../../application/build_types';
import { isResponseError, isValidationError } from '../errors';
import { validateIncomingToken } from '../validation';
import * as constants from '../../application/constants';
import * as R from 'ramda';

export const requestLogin = async (loginData: LoginData): Promise<User> => {
    const url = buildLoginUrl();
    return await axios.post(url, {
        username: loginData.username,
        password: loginData.password,
    })
    .then(validateLoginResponse)
    .catch(buildInvalidUserType);
};

export const buildLoginUrl = (): string => {
    const path = 'authenticate/';
    const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/';
    return buildUrl(baseUrl, {
        path,
    });
};

export const validateLoginResponse = (response: AxiosResponse): User => {
    if (isResponseError(response)) {
        return buildInvalidUserType(response.statusText);
    }
    const validator = validateIncomingToken(response.data);
    if (isValidationError(validator)) {
        const errorMessage = 'Error: locations response data failed schema validation';
        return buildInvalidUserType(errorMessage);
    }
    if (R.isEmpty(response.data)) {
        return buildEmptyUserType();
    }
    return {
        type: constants.USER_VALID,
        token: response.data.token,
    };
};
