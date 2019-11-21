import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token');
export const authenticatedAxiosInstance = axios.create({
    headers: {
        'Authorization': `Token ${token}`,
    },
});