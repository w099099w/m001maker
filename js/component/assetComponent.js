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
            this.name = name.replace(`${gameName.toLocaleUpperCase()}_${resType.toLocaleUpperCase()}_`, "").toLocaleLowerCase();
        }
        console.log(this.name);
        this.isLocal = false;
        if (this.url && this.url.startsWith("blob:")) {
            this.isLocal = true;
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
    constructor(name, gameName, resType) {
        console.log(this.name, name, gameName, resType)
        this.name = name.replace(`${gameName.toLocaleUpperCase()}_${resType.toLocaleUpperCase()}_`, "").toLocaleLowerCase();
        this.Files = [];
        this.Texture = [];
        console.log(this.name, name)
        this.local = false;
    }
    AddFile(...files) {
        if (!this.local) {
            for (const file of files) {
                if (file.isLocal) {
                    this.local = true;
                    break;
                }
            }
        }
        this.Files.push(...files);
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
    subName(_name) {
        if (!_name) return _name;
        let index = _name.indexOf("_");
        if (index != -1) {
            return _name.substring(index + 1).trim();
        }
        return _name.trim();
    }
    GetErrorMessage() {
        let message = [];
        let f = null;
        if (!this.local) {
            return message;
        }
        this.Texture.forEach(t => {
            t = t.trim();
            f = this.Files.find((v, index) => {
                if (v.type == "png") {
                    let n = this.subName(v.name) + ".png";
                    return t == n;
                }
                return false;
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
                message.push("缺少文件 " + this.subName(this.name) + ".json" + "或" + this.subName(this.name) + ".skel");
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
            t = this.subName(t);
            f = this.Files.find((v, index) => {
                return v.type == "png" && t == this.subName(v.name) + ".png";
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
            EFData = new EffectData(name, realName, gameName);
            let d = new FileData(name, realName, gameName, resType, file, url);
            d.type = type;
            EFData.AddFile(d);
            this.EffectData.set(d.name, EFData);
            EFData.AddTexture(name + ".png");
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
        }
    }
    AddEffect(name, gameName, restype) {
        let data = new EffectData(name, gameName, restype);
        this.EffectData.set(data.name, data);
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
                let data = new EffectData(name, 'M001', 'particle');
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
        if (SPData && !SPData.local) {
            this.SpineData.delete(name);
        }
        if (type == "atlas") {
            SPData = new SpineData(name, realName, gameName);
            let d = new FileData(name, realName, gameName, resType, file, url);
            d.type = type;
            SPData.AddFile(d);
            this.SpineData.set(d.name, SPData);
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
    AddSPine(name, gameName, restype) {
        let file = new SpineData(name, gameName, restype);
        this.SpineData.set(file.name, file);
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
                let data = new SpineData(name, 'M001', "spine");
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
        if (audio) {
            audio.SetData(name, file, url = "");
        } else {
            audio = new FileData(name, realName, gameName, "sound", file, url);
            this.Audio.set(audio.name, audio);
        }
    }
    GetAudio(name) {
        return this.Audio.get(name);
    }
    GetAudios(toObj) {
        let data = [];
        this.Audio.forEach((value, key) => {
            if (toObj) {
                data.push({ name: key, local: value.isLocal });
            } else {
                data.push(key);
            }
        });
        return data;
    }
    RemoveAudio(name) {
        this.Audio.delete(name);
    }
    AddImage(name, realName, gameName, file, url = "") {
        let image = this.Images.get(name);
        image = new FileData(name, realName, gameName, 'image', file, url);
        this.Images.set(image.name, image);
    }
    GetImage(name) {
        return this.Images.get(name);
    }
    GetImages(toObj) {
        let data = [];
        this.Images.forEach((value, key) => {
            if (toObj) {
                data.push({ name: key, local: value.isLocal });
            } else {
                data.push(key);
            }
        });
        return data;
    }
    RemoveImage(name) {
        this.Images.delete(name);
    }
    AddSpineFile(name, realName, gameName, file, type, url = "", callBack) {
        this.SpineFile.AddFile(name, realName, gameName, 'spine', file, type, url, callBack);
    }
    AddSpine(name, gameName) {
        this.SpineFile.AddSPine(name, gameName, 'SPINE');
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
    AddEffectFile(name, realName, gameName, file, type, url = "", callBack) {
        this.EffectFile.AddFile(name, realName, gameName, 'particle', file, type, url = "", callBack);
    }
    AddEffect(name, gameName) {
        this.EffectFile.AddEffect(name, gameName, 'particle');
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
            image[e] = `Asset/${gameName}/image/${e.replace(gameName+"_","")}`;
        });
        data.assets.image = image;
        let sound = {};
        let sndData = this.GetAudios();
        sndData.forEach(e => {
            sound[e] = `Asset/${gameName}/sound/${e.replace(gameName+"_","")}`;
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
            spine[e.name] = `Asset/${gameName}/spine/${e.name.replace(gameName+"_","")}`;
        });
        efData.forEach(e => {
            particle[e.name] = `Asset/${gameName}/particle/${e.name.replace(gameName+"_","")}`;
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


Vue.component("assetlist", {
    template: `
	<div class="vertical" >
		<div v-for="(value,index) in items" class="assetNameBar" >
            <div class="horizontal assetItem" >
                <div @click="itemClick(value)" style="flex:1; height:100%;font-size:15px;  text-align: center;line-hight:44px " :key="index">{{value.name?value.name:value}}</div>   
                <div :class="value.local||value.local==undefined?'mdi mdi-desktop-mac':'mdi mdi-cloud-check-outline' " style="margin-left:5px; margin-right:5px; height:100%; font-size:30px;line-hight:100% "></div>
            </div>
            <el-button  @click="removeAsset(value)" type="danger" icon="el-icon-delete" circle></el-button>
        </div>
	</div> 
	`,
    props: ["items", "remove", "click"],
    methods: {
        removeAsset(e) {
            if (this.remove) this.remove(e);
        },
        itemClick(e) {
            if (this.click) this.click(e);
        }
    }
});
let id = -1;
Vue.component("asset", {
    template: `
	<div style="width:100%;height:100%">
		<el-tabs class="assetBox" @tab-click="onChangeAsset" v-model="assetType" type="border-card">
			<el-tab-pane class="assetTab">
                <span slot="label"><i style="font-size:20px"class="mdi mdi-image"></i> 图片</span>
				<div class="horizontal" style="width:100%;height:100% " >
					<assetlist v class="assetList" :click="clickAsset" :remove="removeAsset" :items="asset"></assetlist>
					<div style="flex:3; text-align: center;">
					    <div class="imageView" :style="'background-image:url(' + imageURL + ')'"></div>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane class="assetTab" name=1 label="声音">
				<div class="horizontal" style="width:100%;height:100% ;" >
					<assetlist class="assetList" :click="clickAsset" :remove="removeAsset" :items="asset"></assetlist>
					<div style="flex:3;height:100%; position: relative;"><audio style="  position: absolute; width:100%; bottom: 0px;outline:none" controls :src="audioURL"></audio></div>
				</div>
			</el-tab-pane>
			<el-tab-pane class="assetTab" name=2 label="动画">
				<div class="horizontal" style="width:100%;height:100% ;" >
					<assetlist class="assetList" :local="local" :click="clickAsset" :remove="removeAsset" :items="asset"></assetlist>
					<div style="flex:3">
						<div class="assetList" style="  background-color: rgb(211, 211, 211);">
							<div class="assetList" style="height:50%; background-color: white;">
								<div v-for="(value,index) in getCurretSpineFiles()" class="assetNameBar" >
									<el-button   type="primary"  class="assetNameBtn" :key="index">{{value.name+"."+value.type}}</el-button>
								</div>
							</div>
							<div class="horizontal" style="height:44%;  background-color: white;" >
								<div class="vertical" style="flex:1;height:90%;padding: 10px;">
                                    <div style="  padding: 5px; background-color: #fef0f0" v-for="(value,index) in  getCurretSpineError()">
                                        <p style="color: #f56c6c" >{{value}}</P>
                                    </div>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</el-tab-pane>
			<el-tab-pane class="assetTab" name=3 label="粒子特效">
				<div class="horizontal" style="width:100%;height:100% ;" >
					<assetlist class="assetList" :click="clickAsset" :remove="removeAsset" :items="asset"></assetlist>
					<div style="flex:3">
						<div class="assetList" style="  background-color: rgb(211, 211, 211);">
							<div class="assetList" style="height:50%; background-color: white;">
								<div v-for="(value,index) in getCurretSpineFiles()" class="assetNameBar" >
									<el-button   type="primary"  class="assetNameBtn" :key="index">{{value.name+"."+value.type}}</el-button>
								</div>
							</div>
							<div class="horizontal" style="height:44%;  background-color: white;" >
								<div class="vertical" style="flex:1;height:90%;padding: 10px;">
									 <div style="  padding: 5px; background-color: #fef0f0" v-for="(value,index) in  getCurretSpineError()">
                                        <p style="color: #f56c6c" >{{value}}</P>
                                    </div>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</el-tab-pane>
		</el-tabs>
	
		<el-upload :accept="accept" class="avatar-uploader"  drag action="customize" multiple :show-file-list="false"
			:http-request="uploadtheType">
			<div  class=" avatar-uploader-icon">把资源拖到这里来</div>
		</el-upload>
	</div>
	`,
    props: {
        onchange: Function,
        game: String,
        delete_event: Function,
        local: Boolean
    },
    data() {
        return {
            assetType: 0,
            assets: new AssetData(),
            asset: [],
            imageURL: "",
            audioURL: "",
            spineData: null
        }
    },
    computed: {
        accept() {
            if (this.assetType == 0) {
                return ".png";
            } else if (this.assetType == 1) {
                return ".mp3";
            } else if (this.assetType == 2) {
                return ".skel,.png,.atlas";
            } else {
                return ".plist,.png";
            }
        }
    },
    mounted() {

    },
    methods: {
        onChangeAsset() {
            this.spineData = null;
            this.imageURL = "";
            this.audioURL = "";
            if (this.assetType == 0) {
                this.asset = this.assets.GetImages(true);
            } else if (this.assetType == 1) {
                this.asset = this.assets.GetAudios(true);
            } else if (this.assetType == 2) {
                this.asset = this.assets.GetAllSpine(true);
            } else if (this.assetType == 3) {
                this.asset = this.assets.GetAllEffects(true);
            }
        },
        uploadtheType(file) {
            let name = "";
            name = file.file.name;
            let index = name.lastIndexOf(".");

            if (index == -1) return;

            let assetName = name.substring(0, index);
            if (this.assetType == 0) {
                if (name.indexOf(".png") != -1) {
                    this.assets.AddImage(assetName, name, this.game, file.file);
                    this.asset = this.assets.GetImages();
                }
            } else if (this.assetType == 1) {
                if (name.indexOf(".mp3") != -1) {
                    this.assets.AddAudio(assetName, name, this.game, file.file);
                    this.asset = this.assets.GetAudios();
                }
            } else if (this.assetType == 2) {
                let args = name.split('.');
                if (args[1] == "png" || args[1] == "json" || args[1] == "atlas" || args[1] == "skel") {
                    this.assets.AddSpineFile(assetName, name, this.game, file.file, args[1], "", () => {
                        this.asset = this.assets.GetAllSpine();
                        if (this.onchange) this.onChangeDelay(this.assetType, this);
                    });
                }
            } else if (this.assetType == 3) {
                let args = name.split('.');
                if (args[1] == "png" || args[1] == "plist") {
                    this.assets.AddEffectFile(assetName, name, this.game, file.file, args[1], "", () => {

                    })
                    this.asset = this.assets.GetAllEffects();
                    if (this.spineData) {
                        this.spineData = this.assets.GetEffectByName(this.spineData.name);
                        this.clickAsset(this.spineData);
                    }
                }
            }
            if (this.assetType != 2 && this.onchange) this.onChangeDelay(this.assetType, this);
        },
        onChangeDelay(type, self) {
            clearTimeout(id);
            if (type == 0) {
                this.asset = this.assets.GetImages(true);
            }
            id = setTimeout(() => {
                if (this.spineData) {
                    if (type == 2) {
                        this.spineData = this.assets.GetSpineByName(this.spineData.name);
                    } else if (type == 3) {
                        this.spineData = this.assets.GetEffectByName(this.spineData.name);
                    }
                    this.clickAsset(this.spineData);
                } else {

                }
                if (self && self.onchange) self.onchange(type, self);
            }, 500);
        },
        removeAsset(e) {
            this.spineData = null;
            this.imageURL = "";
            this.audioURL = "";
            let removeFile = null;
            if (this.assetType == 0) {
                removeFile = this.assets.GetImage(e.name);
                this.assets.RemoveImage(e.name);
                this.asset = this.assets.GetImages(e.name);
            } else if (this.assetType == 1) {
                removeFile = this.assets.GetAudio(e);
                this.assets.RemoveAudio(e.name);
                this.asset = this.assets.GetAudios(true);
            } else if (this.assetType == 2) {
                removeFile = this.assets.GetSpineByName(e.name);
                this.assets.RemoveSpine(e.name);
                this.asset = this.assets.GetAllSpine();
            } else if (this.assetType == 3) {
                removeFile = this.assets.GetEffectByName(e.name);
                this.assets.RemoveEffect(e.name);
                this.asset = this.assets.GetAllEffects();
            }
            if (this.onchange) this.onchange(this.assetType, this);
            if (this.delete_event) this.delete_event(removeFile, this.assetType);
        },
        clickAsset(e) {
            if (this.assetType == 0) {
                let img = this.assets.GetImage(e.name);
                console.log(e, img.GetUrl());
                this.imageURL = img.GetUrl();
            } else if (this.assetType == 1) {
                let snd = this.assets.GetAudio(e.name);
                console.error(e);
                this.audioURL = snd.GetUrl();
            } else if (this.assetType == 2) {
                this.spineData = e;
            } else if (this.assetType == 3) {
                this.spineData = e;
            }
        },
        getCurretSpineFiles() {
            if (!this.spineData) {
                return [];
            }
            let f = this.spineData.GetFile();
            if (!f || !f.length) return [];
            let d = [];
            f.forEach(e => {
                let name = { name: e.name, type: e.type };
                if (this.game) name.name = name.name.replace(this.game + "_", "");
                d.push(name)
            });
            return d;
        },
        getCurretSpineError() {
            if (!this.spineData) {
                return [];
            }
            return this.spineData.GetErrorMessage();
        },
        /**
         * 获取所有图片
         * @returns [string]
         */
        GetAllImage() {
            return this.assets.GetImages();
        },
        /**
         * 通过名称获取图片信息
         * @returns [string]
         */
        GetImageByName(name) {
            return this.assets.GetImage(name);
        },
        /**
         * 获取所有声音
         * @returns [string]
         */
        GetAllAudio() {
            return this.assets.GetAudios();
        },
        /**
         * 通过名称获取声音
         * @param {*} name ：string 
         * @returns object
         */
        GetAudioByName(name) {
            return this.assets.GetAudio(name);
        },
        /**
         * 获取所有动画
         * @returns object
         */
        GetAllSpine() {
            return this.assets.GetAllSpine();
        },
        /**
         * 获取动画资源的信息
         * @param {*} name	：string 名称
         * @returns object 
         */
        GetSpineByName(name) {
            return this.assets.GetSpineByName(name);
        },
        /**
         * 获取所有特效资源的名称
         * @returns [string]
         */
        GetAllEffect() {
            return this.assets.GetAllEffects()
        },
        /**
         * 通过名字获取特效资源信息 
         * @param {*} name ：stirng 名称 
         * @returns object
         */
        GetEffectByName(name) {
            return this.assets.GetEffectByName(name);
        },
        /**
         * 生成资源配置信息 
         * @param {*} gameConfig   例：{"M016Game":"M016GameConfig"}   GetConfig("M016",{"M016Game":"M016Config"})
         * @returns object
         */
        GetConfig(gameConfig) {
            return this.assets.GetConfig(this.game, gameConfig)
        },
        /**
         * 获取所有的资源文件信息
         * @returns object
         */
        GetAllAssetFile() {
            return this.assets.AllAssetFile();
        },
        AddRemoteAssets(config, url, gameName) {
            for (const key in config.assets.image) {
                this.assets.AddImage(key, key + ".png", gameName, { name: key + ".png" }, url + "/" + (config.assets.image[key].replace(gameName + "_", "")) + ".png");
            }
            for (const key in config.assets.sound) {
                this.assets.AddAudio(key, key + ".png", gameName, { name: key + ".mp3" }, url + "/" + (config.assets.sound[key].replace(gameName + "_", "")) + ".mp3");
            }
            for (const key in config.assets.spine) {
                this.assets.AddSpine(key, gameName);
            }

            for (const key in config.assets.particle) {
                this.assets.AddEffect(key, gameName);
            }
            this.asset = this.assets.GetImages(true);
            if (this.onchange) {
                for (let i = 0; i < 4; i++) {
                    this.onchange(i, this);
                }
            }
        }
    }
});