import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosRequest = axios.create({
    headers: {
        'Authorization': Cookies.get('token'),
    },
});