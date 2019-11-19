import axios from 'axios';
import Cookies from 'js-cookie';

export const authenticatedAxiosInstance = axios.create({
    headers: {
        'Authorization': Cookies.get('token'),
    },
});