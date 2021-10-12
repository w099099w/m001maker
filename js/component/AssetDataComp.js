Vue.component("assetlist", {
    template: `
	<div class="vertical" >
		<div v-for="(value,index) in items" class="assetNameBar" >
			<el-button  @click="itemClick(value)" type="primary"  class="assetNameBtn" :key="index">{{value.name?value.name:value}}</el-button>
			<el-button type="danger" @click="removeAsset(value)" icon="el-icon-delete" circle ></el-button>
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
	<div style="width:100%;height:100%;overflow: hidden;">
		<el-tabs class="assetBox" @tab-click="onChangeAsset" v-model="assetType" type="border-card">
			<el-tab-pane class="assetTab" name=0 label="图片">
				<div class="horizontal" style="width:100%;height:100% " >
					<assetlist v class="assetList" :click="clickAsset" :remove="removeAsset" :items="asset"></assetlist>
					<div style="flex:3; text-align: center;">
						<div class="imagreView" :style="'background-image:url(' + imageURL + ')'"></div>
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
									<p v-for="(value,index) in  getCurretSpineError() " style="  color: red;" >{{value}}</p>
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
									<p v-for="(value,index) in  getCurretSpineError() " style="  color: red;" >{{value}}</p>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</el-tab-pane>
		</el-tabs>
		<el-upload v-if="assetType==0" class="avatar-uploader"  drag action="customize" multiple :show-file-list="false"
			:http-request="uploadtheType" accept='.png'>
			<div  class=" avatar-uploader-icon">把资源拖到这里来</div>
		</el-upload>
		<el-upload v-else-if="assetType==1" class="avatar-uploader"  drag action="customize" multiple :show-file-list="false"
			:http-request="uploadtheType" accept=".mp3">
			<div  class=" avatar-uploader-icon">把资源拖到这里来</div>
		</el-upload>
		<el-upload v-else-if="assetType==2" class="avatar-uploader"  drag action="customize" multiple :show-file-list="false"
			:http-request="uploadtheType" accept=".json,.skel,.png,.atlas">
			<div  class=" avatar-uploader-icon">把资源拖到这里来</div>
		</el-upload>
		<el-upload v-else-if="assetType==3" class="avatar-uploader"  drag action="customize" multiple :show-file-list="false"
			:http-request="uploadtheType" accept=".plist,.png">
			<div  class=" avatar-uploader-icon">把资源拖到这里来</div>
		</el-upload>
		<el-upload v-else class="avatar-uploader"  drag action="customize" multiple :show-file-list="false"
			:http-request="uploadtheType">
			<div  class=" avatar-uploader-icon">把资源拖到这里来</div>
		</el-upload>
	</div>
	`,
    props: ['onchange', 'game_name', 'delete_event'],
    data() {
        return {
            assetType: 0,
            assets: new AssetData(),
            asset: [],
            imageURL: "",
            audioURL: "",
            spineData: null,
        };
    },
    mounted() {

    },
    computed: {

    },
    methods: {
        onChangeAsset() {
            this.spineData = null;
            this.imageURL = "";
            this.audioURL = "";
            if (this.assetType == 0) {
                this.asset = this.assets.GetImages();
            } else if (this.assetType == 1) {
                this.asset = this.assets.GetAudios();
            } else if (this.assetType == 2) {
                this.asset = this.assets.GetAllSpine();
            } else if (this.assetType == 3) {
                this.asset = this.assets.GetAllEffects();
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
                    this.assets.AddImage(assetName, name, this.game_name, file.file);
                    this.asset = this.assets.GetImages();
                }
            } else if (this.assetType == 1) {
                if (name.indexOf(".mp3") != -1) {
                    this.assets.AddAudio(assetName, name, this.game_name, file.file);
                    this.asset = this.assets.GetAudios();
                }
            } else if (this.assetType == 2) {
                let args = name.split('.');
                if (args[1] == "png" || args[1] == "json" || args[1] == "atlas" || args[1] == "skel") {
                    this.assets.AddSpineFile(assetName, name, this.game_name, file.file, args[1], "", () => {
                        this.asset = this.assets.GetAllSpine();
                        if (this.spineData) {
                            this.spineData = this.assets.GetSpineByName(this.spineData.name);
                            this.clickAsset(this.spineData);
                        }
                        if (this.onchange) this.onChangeDelay(this.assetType, this);
                    })
                }
            } else if (this.assetType == 3) {
                let args = name.split('.');
                if (args[1] == "png" || args[1] == "plist") {
                    this.assets.AddEffectFile(assetName, name, this.game_name, file.file, args[1], "", () => {

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
            id = setTimeout(() => {
                if (self && self.onchange) self.onchange(type, self);
            }, 500);
        },
        removeAsset(e) {
            this.spineData = null;
            this.imageURL = "";
            this.audioURL = "";
            let removeFile = null;
            if (this.assetType == 0) {
                removeFile = this.assets.GetImage(e);
                this.assets.RemoveImage(e);
                this.asset = this.assets.GetImages();
            } else if (this.assetType == 1) {
                removeFile = this.assets.GetAudio(e);
                this.assets.RemoveAudio(e);
                this.asset = this.assets.GetAudios();
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
                let img = this.assets.GetImage(e);
                this.imageURL = img.GetUrl();
            } else if (this.assetType == 1) {
                let img = this.assets.GetAudio(e);
                this.audioURL = img.GetUrl();
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
            return this.spineData.GetFile();
        },
        getCurretSpineTextureInfo() {
            if (!this.spineData) {
                return [];
            }
            return this.spineData.GetTextureNames();
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
        GetAllIamge() {
            return this.assets.GetImages();
        },
        /**
         * 获取所有图片
         * @returns [string]
         */
        GetIamgeByName(name) {
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
         * @returns [string]
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
            return this.assets.GetAllEffects();
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
         * @param {*} gameName 游戏编号 例 : M016
         * @param {*} gameConfig   例：{"M016Game":"M016GameConfig"}   GetConfig("M016",{"M016Game":"M016Config"})
         * @returns object
         */
        GetConfig(gameName, gameConfig) {
            return this.assets.GetConfig(gameName, gameConfig)
        },
        /**
         * 获取所有的资源文件信息
         * @returns object
         */
        GetAllAssetFile() {
            return this.assets.AllAssetFile()
        }
    }
});