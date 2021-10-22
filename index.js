const DialogType = {
    Hide: -1,
    Login: 0,
    Upload: 1,
    Download: 2,
    TIP: 3,
};
new Vue({
    el: '#app',
    data() {
        return {
            feedBackAnim: {
                src: "",
                anim: [{
                        anim: "finish",
                        voice: ""
                    },
                    {
                        anim: "idle",
                        voice: ""
                    },
                    {
                        anim: "init",
                        voice: ""
                    }
                ]
            },
            Anim_GuideAudio: [],
            buttonNum: [
                4, 3, 2, 3, 4
            ],
            editableTabsValue: "0", // tabs 默认展开下标
            editableTabs: [{
                    title: '资源导入设置',
                    name: '0',
                },
                {
                    title: '游戏流程配置',
                    name: '1',
                },
                {
                    title: '题库1',
                    name: '2',
                }
            ],
            Button: [],
            ButtonFlash: [],
            guideRes: "",
            layOut: [
                { key: 0, name: "A1" },
                { key: 1, name: "A2" },
                { key: 2, name: "A3" },
                { key: 3, name: "A4" },
                { key: 4, name: "A5" },
                { key: 5, name: "B1" },
                { key: 6, name: "B2" },
                { key: 7, name: "B3" },
                { key: 8, name: "B4" },
                { key: 9, name: "B5" }
            ],
            makerInfo: {
                userAccount: "",
                makerName: "M001Maker",
                gameName: "M001"
            },
            rightTipPlane: [
                { key: 0, name: "闪烁" },
                { key: 1, name: "粒子动画" },
                { key: 2, name: "骨骼动画" }
            ],
            feedBackInQuestion: [
                { key: "正确反馈动画", objectKey: 'right' },
                { key: "错误反馈动画", objectKey: 'wrong' },
                { key: "剧情反馈动画", objectKey: 'plot' }
            ],
            fileList: {
                sound: [],
                image: [],
                spine: [],
                particle: []
            },
            previewData: PreviewData.instance,
            config: ConfigData.instance,
            interactive: {
                image: {},
                sound: {},
                gameConfig: {},
                spine: {},
                particle: {}
            },
            interactiveFile: {
                image: {},
                sound: {},
                spine: {},
                particle: {}
            },
            questionJson: {
                layout: "A", // 布局
                questionText: "", // 题目文字
            }, // 题库模板
            bgList: new MakerList().bgList,
            uiList: new MakerList().uiList,
            plotAnimList: new MakerList().plotAnimList,
            plotAnimSwitchList: new MakerList().plotAnimSwitchList,
            guideSwitchList: new MakerList().guideSwitchList,
            manualSwitchList: new MakerList().manualSwitchList,
            openStepAnimSwitch: new MakerList().openStepAnimSwitch,
            stepAnimSwitchList: new MakerList().stepAnimSwitchList,
            openLevelPassAnimSwitch: new MakerList().openLevelPassAnimSwitch,
            levelPassAnimList: new MakerList().levelPassAnimList,
            openSumupAnimSwitch: new MakerList().openSumupAnimSwitch,
            sumupAnimList: new MakerList().sumupAnimList,
            openEveryLevelAnimSwitch: new MakerList().openEveryLevelAnimSwitch,
            everyLevelAnimSwitchList: new MakerList().everyLevelAnimSwitchList,
            selectEffectList: new MakerList().selectEffectList,
            outTimeinputList: new MakerList().outTimeinputList,
            scrreenShoot: new MakerList().scrreenShoot,
            questionVoice: new MakerList().questionVoice,
            upLoading: true,
            showPage: true,
            assetDb: null,
            iguideSize: "1",
            questionIndex: 0,
            add: 1,
            remoteAssetDb: "",
            current: {
                progress: 0,
                filename: ""
            },
            total: {
                progress: 0,
                count: "0/0"
            },
            login: {
                show: false,
                str: "",
            },
            tip: {
                title: "",
                str: "",
            },
            dialogType: -1,
            isVisible: false,
            download: false,
            HTTP: new Http("http://10.0.30.117:10999"),
            History: [],
            progresState: null,
            hideTimeOut: 0,
            MainDataBase: new CurrentData(),
        };
    },
    directives: {
        'color': {
            bind: function(el, binding) {
                el.style.color = binding.value;
            },
            update: function(el, binding) {
                el.style.color = binding.value;
            }
        },
        'text': {
            bind(el, binding) {
                el.text = binding.value;
            },
            update(el, binding) {
                el.text = binding.value;
            }
        },
        'state': {
            bind(el, binding) {
                el.style.backgroundColor = binding.value.isRight ? "#E4FFC1" : "#FFE4E1";
            },
            update(el, binding) {
                el.style.backgroundColor = binding.value.isRight ? "#E4FFC1" : "#FFE4E1";
            }
        }
    },
    computed: {
        pre() {
            return !this.remoteAssetDb;
        },
        rightBaseSize: {
            get() {
                return this.currentQuestion.radom_Fixed.right.length;
            },
            set(value) {
                if (this.currentQuestion.radom_Fixed.right.length < value) {
                    for (let i = this.currentQuestion.radom_Fixed.right.length; i < value; ++i) {
                        this.currentQuestion.radom_Fixed.right.push(new Button());
                        this.currentPriview.radom_Fixed.right.push(new Button());
                        this.questionCache.radom_Fixed.right.push(new Button());
                    }
                } else {
                    if (this.currentQuestion.radom_Fixed.right.length == value) return;
                    this.currentQuestion.radom_Fixed.right.splice(value, this.currentQuestion.radom_Fixed.right.length - value);
                    this.currentPriview.radom_Fixed.right.splice(value, this.currentPriview.radom_Fixed.right.length - value);
                    this.questionCache.radom_Fixed.right.splice(value, this.questionCache.radom_Fixed.right.length - value);
                }
            }
        },
        wrongBaseSize: {
            get() {
                return this.currentQuestion.radom_Fixed.wrong.length;
            },
            set(value) {
                if (this.currentQuestion.radom_Fixed.wrong.length < value) {
                    for (let i = this.currentQuestion.radom_Fixed.wrong.length; i < value; ++i) {
                        this.currentQuestion.radom_Fixed.wrong.push(new Button(false));
                        this.currentPriview.radom_Fixed.wrong.push(new Button(false));
                        this.questionCache.radom_Fixed.wrong.push(new Button(false));
                    }
                } else {
                    if (this.currentQuestion.radom_Fixed.wrong.length == value) return;
                    this.currentQuestion.radom_Fixed.wrong.splice(value, this.currentQuestion.radom_Fixed.wrong.length - value);
                    this.currentPriview.radom_Fixed.wrong.splice(value, this.currentPriview.radom_Fixed.wrong.length - value);
                    this.questionCache.radom_Fixed.wrong.splice(value, this.questionCache.radom_Fixed.wrong.length - value);
                }
            }
        },
        setPlane: {
            get() {
                return this.currentQuestion.select_Fixed.length == 0;
            },
            set(value) {
                if (value) {
                    this.currentPriview.radom_Fixed = new RadomSelect();
                    this.currentQuestion.radom_Fixed = new RadomSelect();
                    this.questionCache.radom_Fixed = new RadomSelect();
                    this.currentQuestion.select_Fixed = [];
                    this.currentPriview.select_Fixed = [];
                    this.questionCache.select_Fixed = [];
                } else {
                    if (this.currentQuestion.select_Fixed.length < this.buttonNum[this.currentQuestion.layoutID % 5]) {
                        for (let i = this.currentQuestion.select_Fixed.length; i < this.buttonNum[this.currentQuestion.layoutID % 5]; ++i) {
                            this.currentQuestion.select_Fixed.push(new Button(i > 0 ? false : true));
                            this.currentPriview.select_Fixed.push(new Button(i > 0 ? false : true));
                            console.log(JSON.parse(JSON.stringify(this.questionCache)));
                            this.questionCache.select_Fixed.push(new Button(i > 0 ? false : true));
                        }
                    } else {
                        this.currentQuestion.select_Fixed.splice(this.buttonNum[this.currentQuestion.layoutID % 5], this.currentQuestion.select_Fixed.length - this.buttonNum[this.currentQuestion.layoutID % 5]);
                        this.currentPriview.select_Fixed.splice(this.buttonNum[this.currentQuestion.layoutID % 5], this.currentPriview.select_Fixed.length - this.buttonNum[this.currentQuestion.layoutID % 5]);
                        this.questionCache.select_Fixed.splice(this.buttonNum[this.currentQuestion.layoutID % 5], this.questionCache.select_Fixed.length - this.buttonNum[this.currentQuestion.layoutID % 5]);
                    }
                    this.currentPriview.radom_Fixed = new RadomSelect();
                    this.currentQuestion.radom_Fixed = new RadomSelect();
                    this.questionCache.radom_Fixed = new RadomSelect();
                }
            }
        },
        tabIndex: {
            get() {
                return this.editableTabsValue;
            },
            set(value) {
                if (value > 1) {
                    this.questionIndex = value - 2;
                }
                this.editableTabsValue = value;
            }
        },
        guideSize: {
            get() {
                return this.iguideSize;
            },
            set(value) {
                if (this.config.BaseConfig.Anim_Guide.src.length < value) {
                    for (let i = this.config.BaseConfig.Anim_Guide.src.length; i < value; ++i) {
                        this.config.BaseConfig.Anim_Guide.src.push("");
                        this.Anim_GuideAudio.push("");
                    }
                } else {
                    this.Anim_GuideAudio.splice(value, this.Anim_GuideAudio.length - value);
                    this.config.BaseConfig.Anim_Guide.src.splice(value, this.config.BaseConfig.Anim_Guide.src.length - value);
                }
                this.config.OtherList.spine.guideAnim.animName = [];
                for (let i = 0; i < value; ++i) {
                    this.config.OtherList.spine.guideAnim.animName.push("step0" + value);
                }
                this.iguideSize = value;
            }
        },
        titleColor: {
            get() {
                return Utils.getColorStringFormObject(this.currentQuestion.questionContentColor);
            },
            set(value) {
                this.currentQuestion.questionContentColor = Utils.getColorObjectFormString(value);
            }
        },
        /** 当前题库 */
        currentQuestion() {
            console.log(this.MainDataBase.config.BaseConfig.Question_DataBase, this.questionIndex);
            return this.MainDataBase.config.BaseConfig.Question_DataBase[this.questionIndex][0];
        },
        currentPriview() {
            return this.MainDataBase.priviewData.BaseConfig.Question_DataBase[this.questionIndex][0];
        },
        questionCache() {
            return this.MainDataBase.showData.BaseConfig.Question_DataBase[this.questionIndex][0];
        },
        layOutText: {
            get() {
                return this.layOut[this.currentQuestion.layoutID].name;
            },
            set(value) {
                let s = this.layOut.find((item) => {
                    if (item.name == value)
                        return item;
                });
                this.currentQuestion.layoutID = s.key;
                this.currentQuestion.selectGuide = [];
                for (let i = 0; i < this.buttonNum[s.key % 5]; ++i) {
                    this.currentQuestion.selectGuide.push({
                        start: 0,
                        end: 0
                    });
                }
                this.setPlane = this.buttonPlane;
            }
        },
        rightEffSize: {
            get() {
                return this.currentQuestion.voiceAnwserRight.length;
            },
            set(value) {
                if (this.currentQuestion.voiceAnwserRight.length < value) {
                    for (let i = this.currentQuestion.voiceAnwserRight.length; i < value; ++i) {
                        this.questionCache.voiceAnwserRight.push("");
                        this.currentQuestion.voiceAnwserRight.push("");
                    }
                } else {
                    this.questionCache.voiceAnwserRight.splice(value, this.questionCache.voiceAnwserRight.length - value);
                    this.currentQuestion.voiceAnwserRight.splice(value, this.currentQuestion.voiceAnwserRight.length - value);
                }
            }
        },
        wrongEffSize: {
            get() {
                return this.currentQuestion.voiceAnwserWrong.length;
            },
            set(value) {
                if (this.currentQuestion.voiceAnwserWrong.length < value) {
                    for (let i = this.currentQuestion.voiceAnwserWrong.length; i < value; ++i) {
                        this.questionCache.voiceAnwserWrong.push("");
                        this.currentQuestion.voiceAnwserWrong.push("");
                    }
                } else {
                    this.questionCache.voiceAnwserWrong.splice(value, this.questionCache.voiceAnwserWrong.length - value);
                    this.currentQuestion.voiceAnwserWrong.splice(value, this.currentQuestion.voiceAnwserWrong.length - value);
                }
            }
        },
        centerDialogVisible: {
            get() {
                return this.dialogType != DialogType.Hide;
            },
            set(value) {
                if (!value) {
                    this.dialogType = DialogType.Hide;
                }
            }
        },
        /** tab数量 */
        maxTabIndex() {
            return this.editableTabs.length;
        },
    },
    // 页面加载完成
    mounted() {
        this.assetDb = this.$refs.asset[0];
        this.MainDataBase.assetDb = this.$refs.asset[0];
        this.ChangeData();
        document.onselectstart = () => { return false; };
        this.visiblePriview();
        window.onresize = this.visiblePriview.bind(this);
        this.setPlane = false;
        if (User.token) {
            this.makerInfo.userAccount = User.token;
            this.HTTP.setToken(User.token);
        } else {
            this.setDialog(DialogType.Login);
            let requestData = { appID: User.appID, appSecret: User.appSecret };
            this.login.show = true;
            this.login.str = "正在登录...";
            let login = () => {
                setTimeout(() => {
                    this.HTTP.Request("post", '/clientApp/login', requestData).then((data) => {
                        this.login.str = data.code == 0 ? `登录成功!` : data.msg;
                        this.dotHide();
                        if (data.code == 0) {
                            User.setToken(data.result.token.access_token);
                            this.HTTP.setToken(User.token);
                            setTimeout(() => {
                                this.setDialog(DialogType.Hide);
                                this.login.show = false;
                            }, 1000);
                        }
                    }).catch((error) => {
                        this.$message.error(error.msg);
                        let time = 5;
                        let id = setInterval(() => {
                            this.login.str = `登录失败,将在${time--}秒后重试!`;
                            if (time == 0) {
                                login();
                                clearInterval(id);
                            }
                        }, 1000);
                    });
                }, 2000);
            };
            login();
        }
        let history = new ReadHistory();
        history.getData().then(data => {
            this.History = data;
        });

    },
    beforeCreate() {
        new User();
        new MakerList();
    },
    // 方法集合
    methods: {
        ChangeData() {
            setTimeout(() => {
                this.bgList = this.MainDataBase.makeList.bgList;
                this.uiList = this.MainDataBase.makeList.uiList;
                this.plotAnimList = this.MainDataBase.makeList.plotAnimList;
                this.plotAnimSwitchList = this.MainDataBase.makeList.plotAnimSwitchList;
                this.guideSwitchList = this.MainDataBase.makeList.guideSwitchList;
                this.manualSwitchList = this.MainDataBase.makeList.manualSwitchList;
                this.openStepAnimSwitch = this.MainDataBase.makeList.openStepAnimSwitch;
                this.stepAnimSwitchList = this.MainDataBase.makeList.stepAnimSwitchList;
                this.openLevelPassAnimSwitch = this.MainDataBase.makeList.openLevelPassAnimSwitch;
                this.levelPassAnimList = this.MainDataBase.makeList.levelPassAnimList;
                this.openSumupAnimSwitch = this.MainDataBase.makeList.openSumupAnimSwitch;
                this.sumupAnimList = this.MainDataBase.makeList.sumupAnimList;
                this.openEveryLevelAnimSwitch = this.MainDataBase.makeList.openEveryLevelAnimSwitch;
                this.everyLevelAnimSwitchList = this.MainDataBase.makeList.everyLevelAnimSwitchList;
                this.selectEffectList = this.MainDataBase.makeList.selectEffectList;
                this.scrreenShoot = this.MainDataBase.makeList.scrreenShoot;
                this.questionVoice = this.MainDataBase.makeList.questionVoice;
                this.previewData = this.MainDataBase.priviewData;
                this.Button = this.MainDataBase.showData.OtherList.Button;
                this.ButtonFlash = this.MainDataBase.showData.OtherList.ButtonFlash;
            }, 0);
            console.log(this.config);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        loadHistory(key, keyPath) {
            this.setDialog(DialogType.TIP);
            this.tip.title = "提示";
            this.tip.str = "您正在操作历史记录,请选择修改后的提交方式(注: 当次选择不可撤销)!";
            let deskIndex = keyPath[1].substr(keyPath[1].lastIndexOf("-") + 1);
            this.assetDb.RemoveAllAssets();
            if (!this.History[deskIndex].interactive) {
                new Http("http://10.0.30.117/download").Request('get', `/m001237102c00e681746d1b8f0b39ef51ed911/${User.UUID}/${this.History[deskIndex].deskID}/Asset/interactive.txt`).then(data => {
                    data ? this.assetDb.AddRemoteAssets(data, `http://10.0.30.117/download/m001237102c00e681746d1b8f0b39ef51ed911/${User.UUID}/${this.History[deskIndex].deskID}`, 'M001') : null;
                });
                User.deskID = this.History[deskIndex].deskID;
            } else {
                this.assetDb.AddRemoteAssets(this.History[deskIndex].interactive, `http://10.0.30.117/download/m001237102c00e681746d1b8f0b39ef51ed911/${User.UUID}/${this.History[deskIndex].deskID}`, 'M001');
            }

            console.log("源文件", JSON.parse(JSON.stringify(this.History[deskIndex].interactive)), JSON.parse(JSON.stringify(this.History[deskIndex].config.BaseConfig)), JSON.parse(JSON.stringify(this.History[deskIndex].config.OtherList)));
            ConfigData.instance.setData(this.History[deskIndex].config.BaseConfig, this.History[deskIndex].config.OtherList);
            this.MainDataBase.setConfig(this.History[deskIndex].config.BaseConfig, this.History[deskIndex].config.OtherList);
            let changeLength = this.History[deskIndex].config.BaseConfig.Question_DataBase.length - (this.editableTabs.length - 2);
            if (changeLength != 0) {
                for (let i = 0; i < Math.abs(changeLength); ++i) {
                    if (changeLength > 0) {
                        this.addTab(false);
                    } else {
                        this.removeTab(false);
                    }
                }
            }
            this.ChangeData();
        },
        setDialog(type) {
            this.dialogType = type;
            this.tip.title = "";
            this.tip.str = "";
            if (type == DialogType.Hide) {
                this.current.filename = "";
                this.current.progress = 0;
                this.total.count = "0/0";
                this.total.progress = 0;
            }
        },
        visiblePriview() {
            let show = document.body.clientWidth < 1700;
            if (show && document.getElementById("priview").classList.contains('nodehide')) {
                return;
            } else if (!show && document.getElementById("priview").classList.contains('nodeshow')) {
                return;
            }
            document.getElementById("priview").classList.remove(show ? 'nodeshow' : 'nodehide');
            document.getElementById("priview").classList.add(show ? 'nodehide' : 'nodeshow');
            if (show) {
                this.hideTimeOut = setTimeout(() => {
                    this.isVisible = false;
                }, 1500);
                this.$message.warning("由于可显示宽度小于预览宽度,预览界面已隐藏");
            } else {
                clearTimeout(this.hideTimeOut);
                this.isVisible = true;
            }
        },
        assetDbDelete(asset, type) {
            let interactiveKey, typeStr;
            switch (type) {
                case '0':
                case '1':
                    interactiveKey = asset.interactiveKey;
                    typeStr = type == 0 ? "image" : 'sound';
                    break;
                case '2':
                case '3':
                    interactiveKey = asset.Files[0].interactiveKey;
                    typeStr = type == 2 ? "spine" : 'particle';
                    break;
            }
            if (!interactiveKey) return;
            delete this.interactiveFile[typeStr][interactiveKey];
            delete this.interactive[typeStr][interactiveKey];
        },
        handlePreview(e, assetDb) {
            switch (e) {
                case 0:
                    this.fileList.image = assetDb.GetAllImage();
                    break;
                case 1:
                    this.fileList.sound = assetDb.GetAllAudio();
                    break;
                case 2:
                    {
                        let arr = assetDb.GetAllSpine();
                        this.fileList.spine = arr.map((element) => {
                            return element.name;
                        });
                    }
                    break;
                case 3:
                    {
                        let arr = assetDb.GetAllEffect();
                        this.fileList.particle = arr.map((element) => {
                            return element.name;
                        });
                    }
                    break;
            }
        },
        switchTabs(newPage, oldPage) {
            this.showPage = false;
        },
        pageHidden() {
            this.showPage = true;
        },
        getResultFile(type, e) {
            let result = null;
            switch (type) {
                case 'image':
                case 'sound':
                    result = type == 'sound' ? this.assetDb.GetAudioByName(e) : this.assetDb.GetImageByName(e);
                    break;
                case 'spine':
                case 'particle':
                    {
                        result = type == 'particle' ? this.assetDb.GetEffectByName(e) : this.assetDb.GetSpineByName(e);
                        if (result) {
                            result = { name: e, url: result.Files[0].url, interactiveKey: result.Files[0].interactiveKey };
                        }
                    }
                    break;
            }
            if (!result) {
                this.$message.error("没有该资源数据");
                return null;
            }
            return result;
        },
        selectResult(e, type, route, key) {
            if (type == 'bool') {
                Utils.changeObjectByRoute.call(this, "config." + route, e, "data");
                Utils.changeObjectByRoute.call(this, "previewData." + route, e, "data");
                return;
            } else if (type == 'array') {
                Utils.changeObjectByRoute.call(this, "config." + route, e, "data", key);
                Utils.changeObjectByRoute.call(this, "previewData." + route, e, "data", key);
                return;
            }
            if (e == "") {
                Utils.changeObjectByRoute.call(this, "config." + route, "", "data", key);
                Utils.changeObjectByRoute.call(this, "previewData." + route, "", "data", key);
                return;
            }
            let result = this.getResultFile(type, e);
            Utils.changeObjectByRoute.call(this, `interactiveFile.${type}.${result.interactiveKey}`, result.name, 'data');
            Utils.changeObjectByRoute.call(this, "config." + route, result.interactiveKey, "data", key);
            Utils.changeObjectByRoute.call(this, "previewData." + route, result, "data.url", key);
            Utils.changeObjectByRoute.call(this, `interactive.${type}.${result.interactiveKey}`, `Asset/${this.makerInfo.gameName}/${type}/${result.name}`, 'data');
        },
        selectResultByQuestion(e, type, route, key) {
            if (type == 'bool') {
                Utils.changeObjectByRoute.call(this, "currentPriview." + route, e, "data");
                return;
            }
            if (e == "") {
                Utils.changeObjectByRoute.call(this, "currentQuestion." + route, "", "data", key);
                Utils.changeObjectByRoute.call(this, "currentPriview." + route, "", "data", key);
                return;
            }
            let result = this.getResultFile(type, e);
            Utils.changeObjectByRoute.call(this, `interactiveFile.${type}.${result.interactiveKey}`, result.name, 'data');
            Utils.changeObjectByRoute.call(this, "currentQuestion." + route, result.interactiveKey, "data", key);
            Utils.changeObjectByRoute.call(this, "currentPriview." + route, result, "data.url", key);
            Utils.changeObjectByRoute.call(this, `interactive.${type}.${result.interactiveKey}`, `Asset/${this.makerInfo.gameName}/${type}/${result.name}`, 'data');
        },
        inputResult(e, route) {
            Utils.changeObjectByRoute.call(this, "config." + route, e, "data");
            Utils.changeObjectByRoute.call(this, "previewData." + route, e, "data");
        },
        getFileCount() {
            let count = 0;
            for (let key in this.interactiveFile) {
                let item = this.interactiveFile[key];
                if (key == 'sound' || key == 'image') {
                    count += Object.keys(item).length;
                } else {
                    for (let ckey in item) {
                        let citem = item[ckey];
                        let files = key == 'particle' ? this.assetDb.GetEffectByName(citem).Files : this.assetDb.GetSpineByName(citem).Files;
                        count += files.length;
                    }
                }
            }
            return count;
        },
        dotShow() {
            let load = document.querySelector(".load");
            if (!load) return;
            for (let i = 0; i < load.children.length; ++i) {
                if (load.children[i].className.substr(0, 3) == 'dot') {
                    load.children[i].style.animationPlayState = "running";
                    load.children[i].style.display = 'inline';
                }
            }
        },
        dotHide() {
            let load = document.querySelector(".load");
            for (let i = 0; i < load.children.length; ++i) {
                if (load.children[i].className.substr(0, 3) == 'dot') {
                    load.children[i].style.animationPlayState = "paused";
                    load.children[i].style.display = 'none';
                }
            }
        },
        abortUpload() {
            this.download = false;
            this.upLoading = false;
            this.setDialog(DialogType.Hide);
            this.dotHide();
        },
        /** 预览 */
        async preview() {
            if (!this.checkConfig()) return;
            this.dotShow();
            this.upLoading = true;
            this.setDialog(DialogType.Upload);
            this.interactive.gameConfig[`${this.makerInfo.makerName.toLocaleUpperCase()}`] = `Asset/${this.makerInfo.gameName}/config`;
            let count = this.getFileCount();
            if (count != 0) {
                let currentUploadId = 0;
                this.total.count = `0/${count}`;
                for (let key in this.interactiveFile) {
                    let item = this.interactiveFile[key];
                    switch (key) {
                        case 'sound':
                        case 'image':
                            {
                                for (let ckey in item) {
                                    let citem = item[ckey];
                                    let fileData = key == 'image' ? this.assetDb.GetImageByName(citem) : this.assetDb.GetAudioByName(citem);
                                    this.current.filename = fileData.realName;
                                    if (!this.upLoading) {
                                        return;
                                    }
                                    let rejectResult = null;
                                    let result = await uploadMultiple(this.HTTP, fileData.file, key == 'image' ? 'image' : 'sound', this.makerInfo, (progress) => {
                                        console.log(progress);
                                        this.current.progress = progress;
                                    }, () => {
                                        this.total.count = `${++currentUploadId}/${count}`;
                                        this.total.progress = Math.floor((currentUploadId / count) * 100);
                                    }).catch(error => {
                                        rejectResult = error;
                                    });
                                    result = rejectResult ? rejectResult : result;
                                    if (result.code != 0) {
                                        this.dotHide();
                                        this.current.filename = result.code == 401 ? '授权失败!请刷新页面重新登陆!' : result.msg;
                                        this.total.count = '0/0';
                                        return;
                                    }
                                }
                            }
                            break;
                        case 'spine':
                        case 'particle':
                            {
                                for (let ckey in item) {
                                    let citem = item[ckey];
                                    let files = key == 'particle' ? this.assetDb.GetEffectByName(citem).Files : this.assetDb.GetSpineByName(citem).Files;
                                    files.forEach(async(ccitem) => {
                                        let fileData = ccitem;
                                        this.current.filename = fileData.realName;
                                        if (!this.upLoading) {
                                            return;
                                        }
                                        let rejectResult = null;
                                        let result = await uploadMultiple(this.HTTP, fileData.file, key == 'particle' ? 'particle' : 'spine', this.makerInfo, (progress) => {
                                            this.current.progress = progress;
                                        }, () => {
                                            this.total.count = `${++currentUploadId}/${count}`;
                                            this.total.progress = Math.floor((currentUploadId / count) * 100);
                                        }).catch(error => {
                                            rejectResult = error;
                                        });
                                        result = rejectResult ? rejectResult : result;
                                        if (result.code != 0) {
                                            this.dotHide();
                                            this.current.filename = result.code == 401 ? '授权失败!请刷新页面重新登陆!' : result.msg;
                                            this.total.count = '0/0';
                                            return;
                                        }
                                    });
                                }
                            }
                            break;
                    }
                }
                if (!this.upLoading) {
                    return;
                }
            }
            let result = await this.HTTP.Request('post', '/clientApp/json', { fileName: "config", filePath: `/${User.appID}/${User.UUID}/${User.deskID}/Asset/M001`, jsonString: this.config.getData() });
            if (!this.upLoading) {
                this.dotHide();
                return;
            }
            if (result.code != 0) {
                this.dotHide();
                this.$message.error(result.msg);
                return;
            }
            result = await this.HTTP.Request('post', '/clientApp/json', { fileName: "interactive", filePath: `/${User.appID}/${User.UUID}/${User.deskID}/Asset`, jsonString: { assets: this.interactive } });
            if (result.code != 0) {
                this.dotHide();
                this.$message.error(result.msg);
                return;
            }
            if (!this.upLoading) {
                return;
            }
            this.dotHide();
            this.total.progress = 100;
            this.current.progress = 100;
            this.$message.info('处理完成,预览已准备完成!');
            this.remoteAssetDb = `http://10.0.30.117/download/${User.appID}/${User.UUID}/${User.deskID}`;
        },
        loadPriview() {
            this.setDialog(DialogType.Hide);
            window.open(`http://coolarr.com:8090/m001maker/web-desktop/index.html?assetsUrl=${this.remoteAssetDb}`);
        },
        checkConfig() {
            for (let i = 0; i < this.config.BaseConfig.Question_DataBase.length; ++i) {
                let item = this.config.BaseConfig.Question_DataBase[i][0];
                let buttonPlane = this.config.BaseConfig.Question_DataBase[i][0].select_Fixed.length == 0;
                if (!buttonPlane) {
                    let rightId = 0;
                    let right = item.select_Fixed.filter((citem, index) => {
                        if (citem.isRight) {
                            rightId = index;
                            return citem;
                        }
                    });
                    if (right.length != 1) {
                        this.$message.error(`题库${i+1}有且仅有一个正确选项`);
                        return false;
                    }
                    item.rightAwserID = rightId; //固定选项计算正确ID
                }
            }
            return true;
        },
        /** 导出 */
        exportConfig() {
            if (!this.checkConfig()) return;
            this.progresState = null;
            this.setDialog(DialogType.Download);
            setTimeout(() => document.querySelectorAll(".download .progress p")[0].innerHTML = "正在处理...", 0);
            this.HTTP.Request("post", '/clientApp/export', { filePath: `/${User.appID}/${User.UUID}/${User.deskID}` }).then((data) => {
                if (data.code == 0) {
                    if (data.result) {
                        document.querySelectorAll(".download .progress p")[0].innerHTML = "下载中...";
                        this.total.progress = 0;
                        this.total.count = "M001Asset.zip";
                        axios.get(data.result, {
                            responseType: 'blob',
                            onDownloadProgress: progressEvent => {
                                this.total.progress = Math.ceil(progressEvent.loaded / progressEvent.total * 100 | 0);
                            }
                        }).then(res => {
                            let url = window.URL.createObjectURL(res.data);
                            let a = document.createElement("a");
                            a.style.display = "none";
                            a.href = url;
                            a.download = "M001Asset.zip";
                            a.click();
                            window.URL.revokeObjectURL(url);
                            this.dotHide();
                        }).catch(() => this.dotHide());
                    } else {
                        this.dotHide();
                        this.$message.error("获取下载地址错误");
                    }
                } else {
                    this.dotHide();
                    document.querySelectorAll(".download .progress p")[0].innerHTML = "处理失败...";
                    this.progresState = "exception";
                    this.total.progress = 100;
                    this.$message.error(data.msg);
                }
            }).catch((error) => {
                this.$message.error(error.msg);
            });
        },
        // 切换题库
        changTabs(e) {
            this.tabIndex = e.index;
            document.querySelector(".el-tabs__content").scrollTop = 0;
        },
        addTab(addQuestion = true) {
            this.editableTabs.push({
                title: `题库${this.maxTabIndex-1}`,
                name: String(this.maxTabIndex),
            });
            if (addQuestion) {
                this.MainDataBase.priviewData.BaseConfig.Question_DataBase.push([new Question(this.add++)]);
                this.MainDataBase.showData.BaseConfig.Question_DataBase.push([new Question(this.add++)]);
                this.MainDataBase.config.BaseConfig.Question_DataBase.push([new Question(this.add++)]);
                this.tabIndex = `${this.maxTabIndex - 1}`;
                this.setPlane = false;
            }
            document.querySelector(".el-tabs__content").scrollTop = 0;
        },
        removeTab(removeQuestion = true) {
            if (this.maxTabIndex === 3) {
                this.$message.error("您应当至少包含一题");
                return;
            }
            this.editableTabs.splice(-1, 1);
            if (removeQuestion) {
                this.MainDataBase.priviewData.BaseConfig.Question_DataBase.splice(this.tabIndex - 2, 1);
                this.MainDataBase.showData.BaseConfig.Question_DataBase.splice(this.tabIndex - 2, 1);
                this.MainDataBase.config.BaseConfig.Question_DataBase.splice(this.tabIndex - 2, 1);
            }
            this.editableTabs.forEach((item, index) => {
                if (index > 1) {
                    item.title = `题库${index-1}`;
                    item.name = `${index}`;
                }
            });
            //已删除maxTabIndex则取消-1
            this.tabIndex = `${this.tabIndex != this.maxTabIndex ? this.tabIndex : this.tabIndex - 1}`;
        },
        debug() {
            console.log(ConfigData.instance, this.currentQuestion);
        },
        dialog_MB_OK() {
            this.setDialog(DialogType.Hide);
        },
        dialog_MB_NO() {
            this.setDialog(DialogType.Hide);
        }
    }
});