import axios from 'axios';
import Cookies from 'js-cookie';

export const authenticatedAxiosRequest = axios.create({
    headers: {
        'Authorization': Cookies.get('token'),
    },
});