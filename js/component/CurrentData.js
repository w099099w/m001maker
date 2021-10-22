const ConvertType = {
    URL: 0,
    NAME: 1
};
class CurrentData {
    constructor(assetDb) {
        this.config = ConfigData.instance;
        this.showData = SelectListData.instance;
        this.priviewData = PreviewData.instance;
        this.makeList = new MakerList();
        this.assetDb = assetDb;
    }
    convertKey(data, convertType) {
        for (let key in data) {
            let type = typeof data[key];
            if (key == "_instance") {
                continue;
            }
            if (type == 'object') {
                this.convertKey(data[key], convertType);
            } else if (type == 'string' && (
                    data[key].includes("SPINE") ||
                    data[key].includes("IMAGE") ||
                    data[key].includes("PARTICLE") ||
                    data[key].includes("SOUND")
                )) {
                let result = "";
                switch (convertType) {
                    case ConvertType.URL:
                        result = this.assetDb.getBlobUrl(data[key]);
                        break;
                    case ConvertType.NAME:
                        result = this.assetDb.interactiveConvertAssetName(data[key]);
                        break;
                }
                data[key] = result;
            }
        }
    }
    copyObject(data) {
        return JSON.parse(JSON.stringify(data));
    }
    setConfig(BaseConfig, OtherList) {
        this.config.setData(this.copyObject(BaseConfig), this.copyObject(OtherList));
        this.showData.setData(this.copyObject(BaseConfig), this.copyObject(OtherList));
        this.priviewData.setData(this.copyObject(BaseConfig), this.copyObject(OtherList));
        this.convertKey(this.showData, ConvertType.NAME);
        this.convertKey(this.priviewData, ConvertType.URL);
        console.log(this.showData, this.priviewData);
        this.makeList = new MakerList(this.question);
    }
}