import axios from 'axios';
import qs from 'qs';
import i18n from "@/locales/index.js";
const {global:{locale}} = i18n;
//请求拦截器
// 设置api域名

const xhr = axios.create({
    timeout: 60000, //请求超時時间
})
xhr.interceptors.request.use(
    config => {
        config.withCredentials = true;
        //在请求之前做点什么
        const configData = {
            ...config.data.data,
        };
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'APP-VERSION': '1.0.6',
            'PLATFORM':'WEB',
            'APP-NAME':'art',
            ...config.headers,
            // 'USER-UID': window.userinfo.pfid,
            // 'USER-TOKEN': window.userinfo.token
        }
        !config.headers.locale && !config.headers.LOCALE && (config.headers.LOCALE = locale.value.replace(/-[^$]+/,''))
        if (window.apiHeaders !== false) { Object.assign(config.headers, window.apiHeaders) }
        config.method.toLowerCase() === 'post' && config.headers['request-type'] !== 'file'
            ? (config.data = qs.stringify(configData))
            : (config.params = configData);
        // Indicator.open();
        return config;
    },

    error => {
        //请求错误处理
        return Promise.reject(error)
    }
)

//响应拦截器
// Indicator.close(),
xhr.interceptors.response.use(
    response => {
        // Indicator.close();
        response.data.ret_code = ~~response.data.ret_code;
        //向接口添加服務器時間戳
        if (response.headers.date && !response.data.time) {
            response.data.time = new Date(response.headers.date).getTime() / 1000;
        }
        return response.data;
    },
    error => {
        var err;
        if (error.message.indexOf('timeout') + 1) {
            err = {
                ret_code: 99999,
                ret_msg: 'Request Timeout'
            };
        } else if (5 === ~~(error.request.status / 100)) {
            err = {
                ret_code: error.request.status,
                ret_msg: 'Network Error'
            };
        } else {
            err = JSON.parse(error.request.responseText);
            err.ret_code = ~~error.request.status;
        }
        return Promise.reject(err);
    }
)
export default xhr
