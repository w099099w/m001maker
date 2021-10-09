class Http {
    constructor(Url) {
        Http.baseUrl = Url;
        Http.instance = axios.create({ timeout: 1000 * 12 });
        Http.instance.interceptors.request.use(
            config => {
                if (User.token) {
                    config.headers.Authorization = "Bearer " + User.token;
                }
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
                    ELEMENT.Message.info("登录已过期请刷新页面,重新登陆!");
                    User.removeToken();
                    return null;
                }
                console.log("response", response.data);
                return response.data;
            },
            error => { //响应错误处理
                Loading.hide();
                let errData;
                if (!error.response && error.request.status == 0) {
                    errData = { code: -1, msg: '网络连接失败!' };
                } else {
                    errData = error.data;
                }
                console.log(error, error.request, error.data, error.response, error.config);
                return Promise.reject(errData);
            }
        );
    }
    static Request(method, route, params, progress, isLoadind = false) {
        if (!Http.instance) {
            this.$message.error("请先创建对象");
        }
        if (isLoadind) {
            Loading.show(isLoadind);
        }
        switch (method.toLocaleUpperCase()) {
            case "POST":
                return Http.instance.post(`${Http.baseUrl}${route}`, params, {
                    onUploadProgress: progressEvent => {
                        progress ? progress((progressEvent.loaded / progressEvent.total * 100 | 0)) : null;
                    }
                });
            case "GET":
                {
                    if (typeof params === 'object') {
                        // params拆解成字符串
                        params = Object.keys(params)
                            .map(key => {
                                return (
                                    encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                                );
                            })
                            .join('&');
                    }
                    let url = params ? `${Http.baseUrl}?${params}` : Http.baseUrl;
                    return Http.instance.get(url);
                }

        }
    }
}
// let instance = axios.create({ timeout: 1000 * 12 });
// const baseUrl = "http://coolarr.com:1274";
// const http = {
//     // 获取用户数据
//     login(params) {
//         startLoading();
//         return instance.post(`${baseUrl}/Maker/Login`, params);
//     },
//     sendConfig(params) {
//         return instance.post(`${baseUrl}/Maker/Upload/Config`, params);
//     },
//     sendFileChunk(params, progress) {
//         return instance.post(`${baseUrl}/Maker/Assets/UpLoadChunk`, params, {
//             onUploadProgress: progressEvent => {
//                 progress((progressEvent.loaded / progressEvent.total * 100 | 0))
//             }
//         });
//     },
//     downLoadAsset(params) {
//         return instance.post(`${baseUrl}/Maker/DownloadAsset`, params);
//     },
//     sendFile(params, progress) {
//         return instance.post(`${baseUrl}/Maker/Assets/UpLoadFile`, params, {
//             onUploadProgress: progressEvent => {
//                 progress((progressEvent.loaded / progressEvent.total * 100 | 0))
//             }
//         });
//     },
//     mergeFileChunk(params) {
//         return instance.post(`${baseUrl}/Maker/Assets/MergeFileChunk`, params);
//     },
//     generateUploadId(params) {
//         return instance.post(`${baseUrl}/Maker/Assets/GenerateUploadId`, params);
//     }
// }