const DialogType = {
    Hide: -1,
    Login: 0,
    Upload: 1,
    Download: 2,
    TIP: 3,
};
new Vue({
    el: '#app',
    data: () => new AppData(),
    directives: {
        'color': {
            bind: function(el, binding) {
                el.style.color = binding.value;
            },
            update: function(el, binding) {
                el.style.color = binding.value;
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
        loadDeskID() {
            return User.deskIDCache;
        },
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
        console.log(this)
        this.$data.ChangeData();
        document.onselectstart = () => { return false; };
        this.visiblePriview();
        window.onresize = this.visiblePriview.bind(this);
        document.querySelector(".dialog .dialog-footer").addEventListener("DOMNodeInserted", () => {
            let dom = document.querySelector(".dialog .dialog-footer");
            setTimeout(() => {
                if (dom.children.length == 1) {
                    dom.classList.remove("double");
                    dom.classList.add("single");
                } else {
                    dom.classList.remove("single");
                    dom.classList.add("double");
                }
            }, 0);
        });
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
        handleOpen(key, keyPath) {},
        loadingHistory(key, keyPath) {
            let tabsID = key.substr(0, 1);
            if (this.newTabsID == key) return;
            this.assetDb.RemoveAllAssets();
            switch (tabsID) {
                case "1":
                    {
                        this.MainDataBase.setConfig(new ConfigData().BaseConfig, new ConfigData().OtherList, new Interactive());
                        for (let i = 0; i < this.maxTabIndex - 3; ++i) {
                            this.removeTab(false);
                        }
                        this.setPlane = false;
                    }
                    break;
                case "2":
                    {
                        let deskIndex = keyPath[1].substr(keyPath[1].lastIndexOf("-") + 1);
                        this.setDialog(DialogType.TIP);
                        this.dialogData = new DialogChangeTip(`您正在操作历史记录,您当前的所有修改将被应用于历史记录:${this.History[deskIndex].deskID}`, DialogIcon.WARNING);
                        this.dialogData.setButtonType(DialogButton.MB_YES);
                        if (!this.History[deskIndex].interactive) {
                            new Http("http://10.0.30.117/download").Request('get', `/m001237102c00e681746d1b8f0b39ef51ed911/${User.UUID}/${this.History[deskIndex].deskID}/Asset/interactive.txt`).then(data => {
                                data ? this.assetDb.AddRemoteAssets(data, `http://10.0.30.117/download/m001237102c00e681746d1b8f0b39ef51ed911/${User.UUID}/${this.History[deskIndex].deskID}`, 'M001') : null;
                            });

                        } else {
                            this.assetDb.AddRemoteAssets(this.History[deskIndex].interactive, `http://10.0.30.117/download/m001237102c00e681746d1b8f0b39ef51ed911/${User.UUID}/${this.History[deskIndex].deskID}`, 'M001');
                        }
                        User.deskID = this.History[deskIndex].deskID;
                        console.log("源文件", JSON.parse(JSON.stringify(this.History[deskIndex].interactive)), JSON.parse(JSON.stringify(this.History[deskIndex].config.BaseConfig)), JSON.parse(JSON.stringify(this.History[deskIndex].config.OtherList)));
                        this.MainDataBase.setConfig(this.History[deskIndex].config.BaseConfig, this.History[deskIndex].config.OtherList, this.History[deskIndex].interactive);
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

                    }
                    break;
            }
            this.newTabsID = key;
            this.$data.ChangeData();
        },
        loadHistory(key, keyPath) {
            if (this.newTabsID == '1') {
                if (key == "1") return;
                this.setDialog(DialogType.TIP);
                this.dialogData = new DialogChangeTip("切换至历史记录会清空当前所有的配置,您确定切换吗?", DialogIcon.WARNING, { key, keyPath }, (ButtonType) => {
                    switch (ButtonType) {
                        case DialogButton.MB_YES:
                            {
                                this.loadingHistory(this.dialogData.params.key, this.dialogData.params.keyPath);
                            }
                            break;
                        case DialogButton.MB_NO:
                            {
                                this.$refs.menu.activeIndex = "1";
                            }
                            break;
                    }
                });
                return;
            } else {
                this.loadingHistory(key, keyPath);
            }
        },
        setDialog(type) {
            this.dialogType = type;
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
                case '0':
                    this.fileList.image = assetDb.GetAllImage();
                    break;
                case '1':
                    this.fileList.sound = assetDb.GetAllAudio();
                    break;
                case '2':
                    {
                        let arr = assetDb.GetAllSpine();
                        this.fileList.spine = arr.map((element) => {
                            return element.name;
                        });
                    }
                    break;
                case '3':
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
            Utils.changeObjectByRoute.call(this, `interactiveFile.assets.${type}.${result.interactiveKey}`, result.name, 'data');
            Utils.changeObjectByRoute.call(this, "config." + route, result.interactiveKey, "data", key);
            Utils.changeObjectByRoute.call(this, "previewData." + route, result, "data.url", key);
            Utils.changeObjectByRoute.call(this, `interactive.assets.${type}.${result.interactiveKey}`, `Asset/${this.makerInfo.gameName}/${type}/${result.name}`, 'data');
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
            Utils.changeObjectByRoute.call(this, `interactiveFile.assets.${type}.${result.interactiveKey}`, result.name, 'data');
            Utils.changeObjectByRoute.call(this, "currentQuestion." + route, result.interactiveKey, "data", key);
            Utils.changeObjectByRoute.call(this, "currentPriview." + route, result, "data.url", key);
            Utils.changeObjectByRoute.call(this, `interactive.assets.${type}.${result.interactiveKey}`, `Asset/${this.makerInfo.gameName}/${type}/${result.name}`, 'data');
        },
        inputResult(e, route) {
            Utils.changeObjectByRoute.call(this, "config." + route, e, "data");
            Utils.changeObjectByRoute.call(this, "previewData." + route, e, "data");
        },
        getFileCount() {
            let count = 0;
            for (let key in this.interactiveFile.assets) {
                let item = this.interactiveFile.assets[key];
                if (key == "gameConfig") continue;
                if (key == 'sound' || key == 'image') {
                    for (let citem in item[key]) {
                        let fileData = key == 'image' ? this.assetDb.GetImageByName(citem) : this.assetDb.GetAudioByName(citem);
                        if (!fileData.isLocal) {
                            continue;
                        }
                        count++;
                    }
                } else {
                    for (let ckey in item) {
                        let citem = item[ckey];
                        let files = key == 'particle' ? this.assetDb.GetEffectByName(citem).Files : this.assetDb.GetSpineByName(citem).Files;
                        let isLocal = key == 'particle' ? this.assetDb.GetEffectByName(citem).local : this.assetDb.GetSpineByName(citem).local;
                        if (!isLocal) continue;
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
            setTimeout(() => {
                let load = document.querySelector(".load");
                if (!load) return;
                for (let i = 0; i < load.children.length; ++i) {
                    if (load.children[i].className.substr(0, 3) == 'dot') {
                        load.children[i].style.animationPlayState = "paused";
                        load.children[i].style.display = 'none';
                    }
                }
            }, 0);

        },
        abortUpload() {
            this.upLoading = false;
            this.setDialog(DialogType.Hide);
            this.dotHide();
        },
        async preview() {
            if (!this.checkConfig()) return;
            this.dotShow();
            this.upLoading = true;
            this.setDialog(DialogType.Upload);
            this.interactive.assets.gameConfig[`${this.makerInfo.makerName.toLocaleUpperCase()}`] = `Asset/${this.makerInfo.gameName}/config`;
            let count = this.getFileCount();
            if (count != 0) {
                let currentUploadId = 0;
                this.total.count = `0/${count}`;
                for (let key in this.interactiveFile.assets) {
                    let item = this.interactiveFile.assets[key];
                    switch (key) {
                        case 'sound':
                        case 'image':
                            {
                                for (let ckey in item) {
                                    let citem = item[ckey];
                                    let fileData = key == 'image' ? this.assetDb.GetImageByName(citem) : this.assetDb.GetAudioByName(citem);
                                    if (!fileData.isLocal) {
                                        continue;
                                    }
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
                                        if (!fileData.isLocal) {
                                            return;
                                        }
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
            result = await this.HTTP.Request('post', '/clientApp/json', { fileName: "interactive", filePath: `/${User.appID}/${User.UUID}/${User.deskID}/Asset`, jsonString: this.interactive });
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
                item.index = i;
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
                this.MainDataBase.priviewData.BaseConfig.Question_DataBase.push([new Question()]);
                this.MainDataBase.showData.BaseConfig.Question_DataBase.push([new Question()]);
                this.MainDataBase.config.BaseConfig.Question_DataBase.push([new Question()]);
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
            this.tabIndex = `${this.tabIndex != this.maxTabIndex ? this.tabIndex : this.tabIndex - 1}`;
        },
        debug() {
            console.log(ConfigData.instance, this.currentQuestion);
        },
        dialog_MB_OK() {
            this.setDialog(DialogType.Hide);
            this.dialogData.callResult(DialogButton.MB_YES);
        },
        dialog_MB_NO() {
            this.setDialog(DialogType.Hide);
            this.dialogData.callResult(DialogButton.MB_NO);
        }
    }
});