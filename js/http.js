class Http {
    constructor(Url) {
        Http.baseUrl = Url;
        Http.instance = axios.create({ timeout: 1000 * 12 });
        Http.instance.interceptors.request.use(
            config => {
                // config.headers.Authorization = "Bearer 4c572b97-4edc-4579-9cfb-29bb2cbf2f3c";
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        /****** response拦截器 ==> 对响应做处理 ******/
        Http.instance.interceptors.response.use(
            response => { //成功请求到数据
                Loading.hide();
                if (response.data.code === 400 || response.data.code === 401) { //未经授权时，统一处理

                }
                console.log("response", response.data);
                return response.data;
            },
            error => { //响应错误处理
                Loading.hide();
                console.log("responseErr", error);
                return Promise.reject(error);
            }
        );
    }
    static Request(method, route, params, isLoadind) {
        if (!Http.instance) {
            this.$message.error("请先创建对象");
        }
        if (isLoadind) {
            Loading.show();
        }
        switch (method.toLocaleUpperCase()) {
            case "POST":
                return instance.post(`${Http.baseUrl}${route}`, params);
        }
    }
}
let instance = axios.create({ timeout: 1000 * 12 });
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
    downLoadAsset(params) {
        return instance.post(`${baseUrl}/Maker/DownloadAsset`, params);
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