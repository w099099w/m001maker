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
            showCache: [new PageCache()],
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
            dialogData: {
                type: "",
                url: ""
            },
            centerDialogVisible: false,
            Button: [],
            ButtonFlash: [],
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
            bgList: MakerList.bgList,
            uiList: MakerList.uiList,
            plotAnimList: MakerList.plotAnimList,
            plotAnimSwitchList: MakerList.plotAnimSwitchList,
            guideSwitchList: MakerList.guideSwitchList,
            manualSwitchList: MakerList.manualSwitchList,
            openStepAnimSwitch: MakerList.openStepAnimSwitch,
            stepAnimSwitchList: MakerList.stepAnimSwitchList,
            openLevelPassAnimSwitch: MakerList.openLevelPassAnimSwitch,
            levelPassAnimList: MakerList.levelPassAnimList,
            openSumupAnimSwitch: MakerList.openSumupAnimSwitch,
            sumupAnimList: MakerList.sumupAnimList,
            openEveryLevelAnimSwitch: MakerList.openEveryLevelAnimSwitch,
            everyLevelAnimSwitchList: MakerList.everyLevelAnimSwitchList,
            selectEffectList: MakerList.selectEffectList,
            outTimeinputList: MakerList.outTimeinputList,
            scrreenShoot: MakerList.scrreenShoot,
            questionVoice: MakerList.questionVoice,
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
                return this.showCache[this.questionIndex].buttonPlane;
            },
            set(value) {
                if (value) {
                    this.currentPriview.radom_Fixed = new RadomSelect();
                    this.currentQuestion.radom_Fixed = new RadomSelect();
                    this.questionCache.radom_Fixed = new RadomSelect();
                    this.currentQuestion.select_Fixed = [];
                    this.currentPriview.select_Fixed = [];
                } else {
                    if (this.currentQuestion.select_Fixed.length < this.buttonNum[this.currentQuestion.layoutID % 5]) {
                        for (let i = this.currentQuestion.select_Fixed.length; i < this.buttonNum[this.currentQuestion.layoutID % 5]; ++i) {
                            this.currentQuestion.select_Fixed.push(new Button());
                            this.currentPriview.select_Fixed.push(new Button());
                            this.questionCache.select_Fixed.push(new Button());
                        }
                    } else {
                        this.currentQuestion.select_Fixed.splice(this.buttonNum[this.currentQuestion.layoutID % 5], this.currentQuestion.select_Fixed.length - this.buttonNum[this.currentQuestion.layoutID % 5]);
                        this.currentPriview.select_Fixed.splice(this.buttonNum[this.currentQuestion.layoutID % 5], this.currentPriview.select_Fixed.length - this.buttonNum[this.currentQuestion.layoutID % 5]);
                        this.questionCache.select_Fixed.splice(this.buttonNum[this.currentQuestion.layoutID % 5], this.questionCache.select_Fixed.length - this.buttonNum[this.currentQuestion.layoutID % 5]);
                    }
                    this.currentPriview.radom_Fixed = new RadomSelect();
                    this.currentQuestion.radom_Fixed = new RadomSelect();
                }
                this.showCache[this.questionIndex].buttonPlane = value;
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
                    this.config.OtherList.spine.guideAnim.animName.push("step0" + (value + 1));
                }
                this.iguideSize = value;
            }
        },
        titleColor: {
            get() {
                let color = this.currentQuestion.questionContentColor;
                return "#" + color.r.toString(16) + color.g.toString(16) + color.b.toString(16);
            },
            set(value) {
                value = value.substring(1);
                let r = value.substring(0, 2);
                let g = value.substring(2, 4);
                let b = value.substring(4);
                this.currentQuestion.questionContentColor.r = parseInt(r, 16);
                this.currentQuestion.questionContentColor.g = parseInt(g, 16);
                this.currentQuestion.questionContentColor.b = parseInt(b, 16);
            }
        },
        /** 当前题库 */
        currentQuestion() {
            return this.config.BaseConfig.Question_DataBase[this.questionIndex][0] || this.config.BaseConfig.Question_DataBase[0][0];
        },
        currentPriview() {
            return this.previewData.BaseConfig.Question_DataBase[this.questionIndex][0] || this.previewData.BaseConfig.Question_DataBase[0][0];
        },
        questionCache() {
            return this.showCache[this.questionIndex] || this.showCache[0];
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
                        this.questionCache.rightAudio.push("");
                        this.currentQuestion.voiceAnwserRight.push("");
                    }
                } else {
                    this.questionCache.rightAudio.splice(value, this.questionCache.rightAudio.length - value);
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
                        this.questionCache.wrongAudio.push("");
                        this.currentQuestion.voiceAnwserWrong.push("");
                    }
                } else {
                    this.questionCache.wrongAudio.splice(value, this.questionCache.wrongAudio.length - value);
                    this.currentQuestion.voiceAnwserWrong.splice(value, this.currentQuestion.voiceAnwserWrong.length - value);
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
        this.setPlane = false;
        //this.centerDialogVisible = true;
        if (localStorage.getItem("userAccount")) {
            this.makerInfo.userAccount = localStorage.getItem("userAccount");
        } else {
            let requestData = { account: Date.now(), makerName: this.makerInfo.makerName, gameName: this.makerInfo.gameName };
            http.login(requestData).then((success) => {
                localStorage.setItem("userAccount", requestData.account);
                this.makerInfo.userAccount = requestData.account;
            });
        }
    },
    beforeCreate() {
        new Http("http://10.0.30.117:10999");
        new MakerList();
    },
    // 方法集合
    methods: {
        handlePreview(e, assetDb) {
            this.assetDb = assetDb;
            switch (e) {
                case '0':
                    {
                        this.fileList.image = a.GetAllIamge();
                    }
                    break;
                case '1':
                    {
                        this.fileList.sound = a.GetAllAudio();
                    }
                    break;
                case '2':
                    {
                        let arr = a.GetAllSpine();
                        this.fileList.spine = arr.map((element) => {
                            return element.name;
                        });
                    }
                    break;
                case '3':
                    {
                        let arr = a.GetAllEffect();
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
        getResultFile(type) {
            let result = null;
            switch (type) {
                case 'image':
                case 'sound':
                    result = type == 'sound' ? this.assetDb.GetAudioByName(e) : this.assetDb.GetIamgeByName(e);
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
            let result = this.getResultFile(type);
            Utils.changeObjectByRoute.call(this, `interactiveFile.${type}.${result.interactiveKey}`, result.name, 'data');
            Utils.changeObjectByRoute.call(this, "config." + route, result.interactiveKey, "data", key);
            Utils.changeObjectByRoute.call(this, "previewData." + route, result, "data.url", key);
            Utils.changeObjectByRoute.call(this, `interactive.${type}.${result.interactiveKey}`, `Asset/${this.makerInfo.gameName}/${type}/${result.name}`, 'data');
        },
        selectResultByQuestion(e, type, route, key) {
            if (type == 'bool') {
                //config已被内部修改
                Utils.changeObjectByRoute.call(this, "currentPriview." + route, e, "data");
                return;
            }
            if (e == "") {
                Utils.changeObjectByRoute.call(this, "currentQuestion." + route, "", "data", key);
                Utils.changeObjectByRoute.call(this, "currentPriview." + route, "", "data", key);
                return;
            }
            let result = this.getResultFile(type);
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
                switch (key) {
                    case 'sound':
                    case 'image':
                        {
                            for (let ckey in item) {
                                count++;
                            }
                        }
                        break;
                    case 'spine':
                    case 'particle':
                        {
                            for (let ckey in item) {
                                let citem = item[ckey];
                                let files = key == 'particle' ? this.assetDb.GetEffectByName(citem).Files : this.assetDb.GetSpineByName(citem).Files;
                                count += files.length;
                            }
                        }
                        break;
                }
            }
            return count;
        },
        dotShow() {
            let load = document.querySelector(".load");
            for (let i = 0; i < load.children.length; ++i) {
                load.children[i].style.animationPlayState = "running";
                load.children[i].style.display = 'inline';
            }
        },
        dotHide() {
            let load = document.querySelector(".load");
            for (let i = 0; i < load.children.length; ++i) {
                load.children[i].style.animationPlayState = "paused";
                load.children[i].style.display = 'none';
            }
        },
        abortUpload() {
            this.upLoading = false;
            this.centerDialogVisible = false;
            this.dotHide();
            this.current.filename = "";
            this.current.progress = 0;
            this.total.count = "0/0";
            this.total.progress = 0;
        },
        /** 预览 */
        async preview() {
            if (!this.checkConfig()) return;
            this.dotShow();
            this.upLoading = true;
            this.centerDialogVisible = true;
            this.interactive.gameConfig[`${this.makerInfo.makerName.toLocaleUpperCase()}`] = `Asset/${this.makerInfo.gameName}/config`;
            let count = this.getFileCount();
            let load = document.querySelector(".load");
            for (let i = 0; i < load.children.length; ++i) {
                load.children[i].style.animationPlayState = "running";
            }
            if (count != 0) {
                let currentUploadId = 0;
                for (let key in this.interactiveFile) {
                    let item = this.interactiveFile[key];
                    switch (key) {
                        case 'sound':
                        case 'image':
                            {
                                for (let ckey in item) {
                                    let citem = item[ckey];
                                    let fileData = key == 'image' ? this.assetDb.GetIamgeByName(citem) : this.assetDb.GetAudioByName(citem);
                                    this.current.filename = fileData.realName;
                                    if (!this.upLoading) {
                                        return;
                                    }
                                    await uploadMultiple(fileData.file, key == 'image' ? 'image' : 'sound', this.makerInfo, (progress) => {
                                        this.current.progress = progress;
                                    }, () => {
                                        this.total.count = `${++currentUploadId}/${count}`;
                                        this.total.progress = Math.floor((currentUploadId / count) * 100);
                                    });
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
                                        await uploadMultiple(fileData.file, key == 'particle' ? 'particle' : 'spine', this.makerInfo, (progress) => {
                                            this.current.progress = progress.toString();
                                        }, () => {
                                            this.total.count = `${++currentUploadId}/${count}`;
                                            this.total.progress = Math.floor((currentUploadId / count) * 100);
                                        });
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
            http.sendConfig({ interactive: { assets: this.interactive }, config: this.config.getData(), makerInfo: this.makerInfo }).then((data) => {
                this.dotHide();
                if (!this.upLoading) {
                    return;
                }
                this.$message.info(data.data.msg);
                this.remoteAssetDb = data.data.data.data;
            }).catch((error) => {
                this.$message.error(error.msg);
                this.dotHide();
            });
        },
        loadPriview() {
            this.centerDialogVisible = false;
            window.open(`http://coolarr.com:8090/m001maker/web-desktop/index.html?assetsUrl=${this.remoteAssetDb}`);
        },
        checkConfig() {
            for (let i = 0; i < this.config.BaseConfig.Question_DataBase.length; ++i) {
                let item = this.config.BaseConfig.Question_DataBase[i][0];
                let buttonPlane = this.showCache[i].buttonPlane;
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
            console.log("配置表对象", this.config);
            console.log("资源加载列表", this.interactive);
            console.log("预览列表", this.previewData);
            http.downLoadAsset({ makerInfo: this.makerInfo }).then((data) => {
                window.open(data.data.data.data);
            }).catch((error) => {
                this.$message.info(error.data.msg);
            });
        },
        // 切换题库
        changTabs(e) {
            // 第一页为游戏流程配置，所以题库下标减一
            this.tabIndex = e.index;
            document.querySelector(".el-tabs__content").scrollTop = 0;
        },
        addTab() {
            this.editableTabs.push({
                title: `题库${this.maxTabIndex-1}`,
                name: String(this.maxTabIndex),
            });
            this.showCache.push(new PageCache());
            this.previewData.BaseConfig.Question_DataBase.push([new Question(this.add++)]);
            this.config.BaseConfig.Question_DataBase.push([new Question(this.add++)]);
            this.tabIndex = `${this.maxTabIndex - 1}`;
            this.setPlane = false;
            document.querySelector(".el-tabs__content").scrollTop = 0;
        },
        removeTab() {
            if (this.maxTabIndex === 3) {
                this.$message.error("您应当至少包含一题");
                return;
            }
            this.editableTabs.splice(Number(this.tabIndex), 1);
            this.showCache.splice(Number(this.tabIndex), 1);
            this.config.BaseConfig.Question_DataBase.splice(this.tabIndex - 2, 1);
            this.editableTabs.forEach((item, index) => {
                if (index > 1) {
                    item.title = `题库${index-1}`;
                    item.name = `${index}`;
                }
            });
            //已删除maxTabIndex则取消-1
            this.tabIndex = `${this.tabIndex != this.maxTabIndex ? this.tabIndex : this.tabIndex - 1}`;
        }
    }
});