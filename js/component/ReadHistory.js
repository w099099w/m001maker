class ReadHistory {
    constructor() {
        this.data = [];
    }
    RequestRemoteData() {
        return new Http("http://10.0.30.117/download").Request('GET', `/${User.appID}/${User.UUID}`, null).then((res) => {
            let dom = new DOMParser().parseFromString(res, 'text/html');
            let arr = dom.querySelectorAll("[href]");
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].innerHTML.lastIndexOf("/") != -1 && arr[i].innerHTML != "../") {
                    this.data.push(arr[i].innerHTML.substr(0, arr[i].innerHTML.length - 1));
                }
            }
        });
    }
    async getData() {
        this.data = [];
        await this.RequestRemoteData();
        return this.data;
    }
}