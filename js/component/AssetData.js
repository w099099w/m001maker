class FileData {
    constructor(name, realName, gameName, resType, file, url = "") {
        this.type = 0;
        this.resType = resType;
        this.realName = realName;
        this.name = name;
        this.file = file;
        this.interactiveKey = `${gameName.toLocaleUpperCase()}_${resType.toLocaleUpperCase()}_${this.name.toLocaleUpperCase()}`;
        if (!url && file) {
            this.url = URL.createObjectURL(file);
        } else {
            this.url = url;
        }
    }
    GetUrl() {
        if (this.url) return this.url;
        else if (this.file) {
            this.url = URL.createObjectURL(this.file);
            return this.url;
        } else {
            return "";
        }
    }
}
class SpineData {

    constructor(name) {
        this.name = "";
        this.Files = [];
        this.Texture = [];
        this.name = name;
    }
    AddFile(...data) {
        this.Files.push(...data);
    }
    GetFile() {
        return this.Files;
    }
    AddTexture(name) {
        this.Texture.push(name);
    }
    GetTextureNames() {
        return this.Texture;
    }
    GetErrorMessage() {
        let message = [];
        let f = null;
        this.Texture.forEach(t => {
            t = t.trim();
            f = this.Files.find((v, index) => {
                let n = v.name.trim() + ".png";
                return v.type == "png" && t == n;
            });
            if (!f) {
                message.push("缺少文件 " + t);
            }
        });

        f = this.Files.find((v, index) => {
            return v.type == "skel" && this.name.trim() == v.name.trim();
        });
        if (!f) {
            f = this.Files.find((v, index) => {
                return v.type == "json" && this.name.trim() == v.name.trim();
            })
            if (!f) {
                message.push("缺少文件 " + this.name + ".json" + "或" + this.name + ".skel");
            }
        }

        return message;
    }
}
class EffectData extends SpineData {
    GetErrorMessage() {
        let message = [];
        let f = null;
        this.Texture.forEach(t => {
            t = t.trim();
            f = this.Files.find((v, index) => {
                return v.type == "png" && t == v.name.trim() + ".png";
            });
            if (!f) {
                message.push("缺少文件 " + t);
            }
        });
        return message;
    }
}
class EffectFile {
    constructor() {
        this.AllFile = [];
        this.EffectData = new Map();
    }
    AddFile(name, realName, gameName, resType, file, type, url = "") {
        let EFData = null;
        EFData = this.EffectData.get(name);
        if (type == "plist") {
            EFData = new EffectData(name);
            let d = new FileData(name, realName, gameName, resType, file, url);
            d.type = type;
            EFData.AddFile(d);
            this.EffectData.set(name, EFData);
            EFData.AddTexture(name + ".png");
        } else {
            for (let i = 0; i < this.AllFile.length; i++) {
                if (this.AllFile[i].type == type && this.AllFile[i].name == name) {
                    this.AllFile.splice(i, 1);
                    i--;
                }
            }
            let data = new FileData(name, realName, file, url);
            data.type = type;
            this.AllFile.push(data);
        }
    }
    RemoveEffectData(name) {
        if (this.EffectData.has(name)) {
            this.GetFile(name, this.AllFile, true);
            this.EffectData.delete(name);
        }
    }
    GetEffectData() {
        let files = [...this.AllFile];
        let tdata = [];
        this.EffectData.forEach((value, key) => {
            let d = this.GetEffect(key, files, true);
            if (d) {
                tdata.push(d);
            }
        });
        return tdata;
    }
    GetEffect(name, files, remove = false) {
        let efdata = this.EffectData.get(name);
        if (efdata) {
            let _data = this.GetFile(name, files, remove);
            if (_data != null) {
                let data = new EffectData(name);
                data.Texture = [...efdata.Texture];
                data.AddFile(...efdata.Files);
                data.AddFile(..._data);
                return data;
            }
        }
        return efdata;
    }
    GetFile(name, data = null, remove = false) {
        if (data == null) data = this.AllFile;
        let tdata = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == name) {
                tdata.push(data[i]);
                if (remove) {
                    data.splice(i, 1);
                    i--;
                }
            } else if (data[i].type == "png") {
                if (!Number.isNaN(parseInt(data[i].name.replace(name, "")))) {
                    tdata.push(data[i]);
                    if (remove) {
                        data.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        return tdata;
    }
    GetEffectByName(name) {
        return this.GetEffect(name, null, false);
    }
}

class SpineFile {
    constructor() {
        this.AllFile = [];
        this.SpineData = new Map();
    }
    AddFile(name, realName, gameName, resType, file, type, url = "", callBack = null) {
        let SPData = null;
        SPData = this.SpineData.get(name);
        if (type == "atlas") {
            SPData = new SpineData(name);
            let d = new FileData(name, realName, gameName, resType, file, url);
            d.type = type;
            SPData.AddFile(d);
            this.SpineData.set(name, SPData);
            let _d = new FileReader();
            _d.onloadend = function(params) {
                let lines = this.result.split("\n");
                for (const line of lines) {
                    let index = line.lastIndexOf(".png");
                    if (index != -1) {
                        SPData.AddTexture(line);
                    }
                }
                if (callBack) callBack();
            }
            _d.readAsText(file);
        } else {
            for (let i = 0; i < this.AllFile.length; i++) {
                if (this.AllFile[i].type == type && this.AllFile[i].name == name) {
                    this.AllFile.splice(i, 1);
                    i--;
                }
            }
            let data = new FileData(name, realName, gameName, resType, file, url);
            data.type = type;
            this.AllFile.push(data);
            if (callBack) callBack();
        }
    }
    GetSpineData() {
        let files = [...this.AllFile];
        let tdata = [];
        this.SpineData.forEach((value, key) => {
            let d = this.GetSPine(key, files, true);
            if (d) {
                tdata.push(d);
            }
        });
        return tdata;
    }
    RemoveSpineData(name) {
        if (this.SpineData.has(name)) {
            this.GetFile(name, this.AllFile, true);
            this.SpineData.delete(name);
        }
    }
    GetSPine(name, files, remove = false) {
        let spData = this.SpineData.get(name);
        if (spData) {
            let _data = this.GetFile(name, files, remove);
            if (_data != null) {
                let data = new SpineData(name);
                data.Texture = [...spData.Texture];
                data.AddFile(...spData.Files);
                data.AddFile(..._data);
                return data;
            }
        }
        return spData;
    }
    GetFile(name, data = null, remove = false) {
        if (data == null) data = this.AllFile;
        let tdata = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == name) {
                tdata.push(data[i]);
                if (remove) {
                    data.splice(i, 1);
                    i--;
                }
            } else if (data[i].type == "png") {
                if (!Number.isNaN(parseInt(data[i].name.replace(name, "")))) {
                    tdata.push(data[i]);
                    if (remove) {
                        data.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        return tdata;
    }
    GetSpineByName(name) {
        return this.GetSPine(name, null, false);
    }
}
class AssetData {

    constructor() {
        this.Images = new Map();
        this.Audio = new Map();
        this.SpineFile = new SpineFile();
        this.EffectFile = new EffectFile();
    }
    AddAudio(name, realName, gameName, file, url = "") {
        let audio = this.Audio.get(name);
        audio = new FileData(name, realName, gameName, "sound", file, url);
        this.Audio.set(name, audio);
    }
    AddImage(name, realName, gameName, file, url = "") {
        let image = this.Images.get(name);
        image = new FileData(name, realName, gameName, 'image', file, url);
        this.Images.set(name, image);
    }
    AddSpineFile(name, realName, gameName, file, type, url = "", callBack) {
        this.SpineFile.AddFile(name, realName, gameName, 'spine', file, type, url, callBack);
    }
    AddEffectFile(name, realName, gameName, file, type, url = "", callBack) {
        this.EffectFile.AddFile(name, realName, gameName, 'particle', file, type, url = "", callBack);
    }
    GetAudio(name) {
        return this.Audio.get(name);
    }
    GetAudios() {
        let data = [];
        this.Audio.forEach((value, key) => {
            data.push(key);
        });
        return data;
    }
    RemoveAudio(name) {
        this.Audio.delete(name);
    }

    GetImage(name) {
        return this.Images.get(name);
    }
    GetImages() {
        let data = [];
        this.Images.forEach((value, key) => {
            data.push(key);
        });
        return data;
    }
    RemoveImage(name) {
        this.Images.delete(name);
    }

    GetAllSpine() {
        return this.SpineFile.GetSpineData();
    }
    RemoveSpine(name) {
        return this.SpineFile.RemoveSpineData(name);
    }
    GetSpineByName(name) {
        return this.SpineFile.GetSpineByName(name);
    }

    GetAllEffects() {
        return this.EffectFile.GetEffectData();
    }
    RemoveEffect(name) {
        this.EffectFile.RemoveEffectData(name);
    }
    GetEffectByName(name) {
        return this.EffectFile.GetEffectByName(name);
    }
    GetConfig(gameName, gameConfig) {
        let data = {};
        data.interactive = [];
        data.assets = {};
        let image = {};
        let imgData = this.GetImages();
        imgData.forEach(e => {
            image[`${gameName}_${e}`] = `Asset/${gameName}/image/${e}`;
        });
        data.assets.image = image;
        let sound = {};
        let sndData = this.GetAudios();
        sndData.forEach(e => {
            sound[`${gameName}_${e}`] = `Asset/${gameName}/sound/${e}`;
        });
        data.assets.sound = sound;
        data.assets.gameConfig = {};
        if (typeof(gameConfig) == "object") {
            data.assets.gameConfig = gameConfig;
        }
        let spine = {};
        data.assets.spine = spine;
        let particle = {};
        data.assets.particle = particle;
        let spData = this.GetAllSpine();
        let efData = this.GetAllEffects();
        spData.forEach(e => {
            spine[`${gameName}_${e.name}`] = `Asset/${gameName}/spine/${e.name}`;
        });
        efData.forEach(e => {
            particle[`${gameName}_${e.name}`] = `Asset/${gameName}/spine/${e.name}`;
        });
        return data;
    }
    AllAssetFile() {
        let data = {};
        let image = {};
        data.image = image;
        let sound = {};
        data.sound = sound;
        let spine = {};
        data.spine = spine;
        let effect = {};
        data.effect = effect;
        this.Images.forEach((v, k) => {
            image[k] = v;
        })
        this.Audio.forEach((v, k) => {
            sound[k] = v;
        });
        let spData = this.GetAllSpine();
        let efData = this.GetAllEffects();
        spData.forEach(e => {
            spine[e.name] = [];
            e.Files.forEach(f => {
                spine[e.name].push(f);
            });
        });
        efData.forEach(e => {
            effect[e.name] = [];
            e.Files.forEach(f => {
                effect[e.name].push(f);
            });
        });
        return data;
    }
}