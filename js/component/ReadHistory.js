class HistoryData {
    constructor(config = "", interactive = "", deskID = 0) {
        this.config = config;
        this.interactive = interactive;
        this.deskID = deskID;
    }
}
class ReadHistory {
    constructor() {
        this.data = [];
    }
    async RequestRemoteData(preCheck) {
        let http = new Http("http://10.0.30.117/download");
        return http.Request('GET', `/${User.appID}/${User.UUID}`, null).then(async(res) => {
            let dom = new DOMParser().parseFromString(res, 'text/html');
            let arr = dom.querySelectorAll("[href]");
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].innerHTML.lastIndexOf("/") != -1 && arr[i].innerHTML != "../") {
                    let deskID = arr[i].innerHTML.substr(0, arr[i].innerHTML.length - 1);
                    let config = null,
                        interactive = null;
                    if (preCheck) {
                        config = await http.Request('GET', `/${User.appID}/${User.UUID}/${deskID}/Asset/M001/config.txt`, null);
                        if (!config) {
                            return;
                        }
                        interactive = await http.Request('GET', `/${User.appID}/${User.UUID}/${deskID}/Asset/interactive.txt`, null);
                        if (!interactive) {
                            return;
                        }
                        let check = false;
                        for (let i in interactive.assets) {
                            if (Object.keys(interactive.assets[i]).length != 0 && i !== 'gameConfig') {
                                check = true;
                                break;
                            }
                        }
                        if (!check) {
                            continue;
                        }
                    }
                    this.data.push(new HistoryData(config, interactive, deskID));
                }
            }
        });
    }
    async getData(preCheck = true) {
        this.data = [];
        await this.RequestRemoteData(preCheck);
        return this.data;
    }
}