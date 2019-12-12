import axios from 'axios';
import {USER_TOKEN} from "./identify-token";

const instance = axios.create({
    timeout: 1000 * 60,
    baseURL: 'http://172.16.60.72:3111/api'
});

// request interceptor
instance.interceptors.request.use(request => {
    console.log('config',request);

    // const token = localStorage.getItem(USER_TOKEN);
    const token = window.userName;

    if (token) {
        request.headers[USER_TOKEN] = token;
    }

    return request;
}, error => {

    // Do something with request error
    return Promise.reject(error)
});

// response interceptor
instance.interceptors.response.use(
    response => {

        return response;
    },
    error => {

        return Promise.reject(error);
    }
);




export default instance;







