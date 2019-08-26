import { AxiosResponse } from 'axios';

export const isResponseError = (response: AxiosResponse): boolean => (
    response.status !== 200
);
