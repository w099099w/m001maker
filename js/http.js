class Http {
    setToken(token) {
        this.token = token;
    }
    constructor(Url) {
        this.baseUrl = Url;
        this.instance = axios.create({ timeout: 1000 * 120 });
        this.instance.interceptors.request.use(
            config => {
                if (this.token) {
                    config.headers.Authorization = "Bearer " + this.token;
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        /****** response拦截器 ==> 对响应做处理 ******/
        this.instance.interceptors.response.use(
            response => { //成功请求到数据
                Loading.hide();
                if (response.data.code === 400 || response.data.code === 401) { //未经授权时，统一处理
                    ELEMENT.Message.info("登录已过期请刷新页面,重新登陆!");
                    User.removeToken();
                }
                return response.data;
            },
            error => { //响应错误处理
                Loading.hide();
                let errData;
                if (error.code == 'ECONNABORTED' && error.message.includes('timeout')) {
                    errData = { code: -1, msg: '请求超时' };
                } else if (!error.response && error.request.status == 0) {
                    errData = { code: -1, msg: '网络连接失败!' };
                } else {
                    errData = error.data;
                }
                console.log(error, error.request, error.code, error.message, error.response, error.config);
                return Promise.reject(errData);
            }
        );
    }
    Request(method, route, params, progress, isLoadind = false) {
        if (isLoadind) {
            Loading.show(isLoadind);
        }
        switch (method.toLocaleUpperCase()) {
            case "POST":
                return this.instance.post(`${this.baseUrl}${route}`, params, {
                    onUploadProgress: progressEvent => {
                        progress ? progress(Math.ceil(progressEvent.loaded / progressEvent.total * 100 | 0)) : null;
                    }
                });
            case "GET":
                {
                    if (params && typeof params === 'object') {
                        // params拆解成字符串
                        params = Object.keys(params)
                            .map(key => {
                                return (
                                    encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                                );
                            })
                            .join('&');
                    }
                    let url = params ? `${this.baseUrl}${route}?${params}` : this.baseUrl + route;
                    return this.instance.get(url);
                }
        }
    }
}