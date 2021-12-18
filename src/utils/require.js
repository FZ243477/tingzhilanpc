import axios from "axios";
import qs from "qs";
import config from '@/config'
import { Message } from 'element-ui'


let BACE_URL = "";
if (process.env.NODE_ENV === 'production') {
    BACE_URL = config.apiUrl.pro;
}else {
    BACE_URL = config.apiUrl.dev;
}
axios.defaults.baseURL = BACE_URL;
axios.interceptors.request.use(
    config => {
        return config
    }, error => {
        return Promise.reject(error)
    })

//response全局拦截
axios.interceptors.response.use(
    response => {
        let res = response;
        if (res.status !== 200) {
            Message({
                message: res.statusText || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
        }
        else {
            return res.data;
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
);

export const post = (url, params) => {
    return axios({
        method: "post",
        url: url,
        data: qs.stringify(params)
    });
};
export const get = (url, params) => {
    return axios({
        method: "get",
        url: url,
        params: params
    });
};
export const postB = (url, params) => {
    return axios({
        method: "post",
        responseType:"arraybuffer",
        url: url,
        params: params
    });
};