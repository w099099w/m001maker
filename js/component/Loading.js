class Loading {
    constructor() {
        Loading.loadingInstance = null;
    }
    static show(str) {
        Loading.loadingInstance = ELEMENT.Loading.service({
            lock: true,
            text: str ? str : '加载中...',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
    static setStr(str) {
        Loading.loadingInstance.text = str;
    }
    static hide() {
        if (Loading.loadingInstance) {
            Loading.loadingInstance.close();
            Loading.loadingInstance = null;
        }
    }
}