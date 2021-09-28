// 创建axios实例
const instance = axios.create({ timeout: 1000 * 12 });

let loading;

function startLoading() { //使用Element loading-start 方法
    loading = ELEMENT.Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    });
}

function endLoading() { //使用Element loading-close 方法
    if (loading) {
        loading.close();
    }
}

/****** request拦截器 ==> 对请求参数做处理 ******/
instance.interceptors.request.use(
    config => {
        // config.headers.Authorization = "Bearer 4c572b97-4edc-4579-9cfb-29bb2cbf2f3c";
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
/****** response拦截器 ==> 对响应做处理 ******/
instance.interceptors.response.use(
    response => { //成功请求到数据
        endLoading();
        if (response.data.code === 400 || response.data.code === 401) { //未经授权时，统一处理

        }
        return response.data;
    },
    error => { //响应错误处理
        endLoading();
        return Promise.reject(error)
    }
)

const baseUrl = "http://coolarr.com:1274";

const http = {
    // 获取用户数据
    login(params) {
        startLoading();
        return instance.post(`${baseUrl}/Maker/Login`, params);
    },
    sendConfig(params) {
        return instance.post(`${baseUrl}/Maker/Upload/Config`, params);
    },
    sendFileChunk(params, progress) {
        return instance.post(`${baseUrl}/Maker/Assets/UpLoadChunk`, params, {
            onUploadProgress: progressEvent => {
                progress((progressEvent.loaded / progressEvent.total * 100 | 0))
            }
        });
    },
    sendFile(params, progress) {
        return instance.post(`${baseUrl}/Maker/Assets/UpLoadFile`, params, {
            onUploadProgress: progressEvent => {
                progress((progressEvent.loaded / progressEvent.total * 100 | 0))
            }
        });
    },
    mergeFileChunk(params) {
        return instance.post(`${baseUrl}/Maker/Assets/MergeFileChunk`, params);
    },
    generateUploadId(params) {
        return instance.post(`${baseUrl}/Maker/Assets/GenerateUploadId`, params);
    }
}