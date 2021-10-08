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
    static hide() {
        if (Loading.loadingInstance) {
            Loading.loadingInstance.close();
            Loading.loadingInstance = null;
        }
    }
}