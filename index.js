new Vue({
    el: '#app',
    data() {
        return {
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
                spine: {},
                particle: {}
            },
            questionJson: {
                layout: "A", // 布局
                questionText: "", // 题目文字
            }, // 题库模板
            bgList: [{
                    key: "背景图片:",
                    value: ConfigData.instance.BaseConfig.BgSetting.centerRes,
                    type: "image",
                    route: "BaseConfig.BgSetting.centerRes",
                },
                {
                    key: "全面屏时左侧背景图:",
                    value: ConfigData.instance.BaseConfig.BgSetting.leftRes,
                    type: "image",
                    route: "BaseConfig.BgSetting.leftRes",
                },
                {
                    key: "全面屏时右侧背景图:",
                    value: ConfigData.instance.BaseConfig.BgSetting.rightRes,
                    type: "image",
                    route: "BaseConfig.BgSetting.rightRes",
                },
                {
                    key: "背景音乐:",
                    value: ConfigData.instance.OtherList.BGM,
                    type: "sound",
                    route: "OtherList.BGM",
                },
                {
                    key: "背景动画资源:",
                    value: ConfigData.instance.BaseConfig.BgSetting.spineRes,
                    type: "spine",
                    route: "BaseConfig.BgSetting.spineRes",
                },
            ],
            uiList: [{
                    key: "退出图片:",
                    value: ConfigData.instance.OtherList.Btn_quit,
                    type: "image",
                    route: "OtherList.Btn_quit",
                },
                {
                    key: "题目框图片:",
                    value: ConfigData.instance.OtherList.QuestionBarImage,
                    type: 'image',
                    route: "OtherList.QuestionBarImage",
                },
                {
                    key: "当前题目计数底框:",
                    value: ConfigData.instance.OtherList.QuestionNumBgRes,
                    type: 'image',
                    route: "OtherList.QuestionNumBgRes",
                }
            ],
            plotAnimList: [{
                    key: "剧情动画配音:",
                    value: ConfigData.instance.OtherList.spine.poltAnim.audio,
                    type: "sound",
                    route: "OtherList.spine.poltAnim.audio"
                },
                {
                    key: "剧情动画资源:",
                    value: ConfigData.instance.OtherList.spine.poltAnim.src,
                    type: 'spine',
                    route: "OtherList.spine.poltAnim.src",
                },
            ],
            plotAnimSwitchList: [{
                    key: "剧情动画自动进入下一步:",
                    activeStr: "是",
                    inactiveStr: "否",
                    value: ConfigData.instance.BaseConfig.Anim_polt.finishedAutoToGuide,
                    route: "BaseConfig.Anim_polt.finishedAutoToGuide",
                },
                {

                    key: "剧情动画可被打断:",
                    value: ConfigData.instance.BaseConfig.Anim_polt.clickStop,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Anim_polt.clickStop",
                }
            ],
            guideSwitchList: [{
                    key: "引导动画自动进入下一步:",
                    activeStr: "是",
                    inactiveStr: "否",
                    value: ConfigData.instance.BaseConfig.Anim_Guide.finishedAutoToNextStep,
                    route: "BaseConfig.Anim_Guide.finishedAutoToNextStep",
                },
                {

                    key: "引导动画可被打断:",
                    value: ConfigData.instance.BaseConfig.Anim_Guide.clickStop,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Anim_Guide.clickStop",
                }
            ],
            manualSwitchList: [{
                    key: "题库顺序是否随机:",
                    activeStr: "是",
                    inactiveStr: "否",
                    value: ConfigData.instance.BaseConfig.Database.radomSort,
                    route: "BaseConfig.Database.radomSort",
                },
                {

                    key: "目标引导语音及相关展示只出现一次:",
                    value: ConfigData.instance.BaseConfig.Database.guideaAndVoiceFirst,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Database.guideaAndVoiceFirst",
                },
                {

                    key: "正确选项被选择后所有选项消失:",
                    value: ConfigData.instance.BaseConfig.Select_Button.clickedHide,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Select_Button.clickedHide",
                },
                {

                    key: "正确选项被选择后消失:",
                    value: ConfigData.instance.BaseConfig.Select_Right.selectedEnd,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Select_Right.selectedEnd",
                },
                {

                    key: "正确选项反馈可被打断:",
                    value: ConfigData.instance.BaseConfig.Select_Right.isClickStop,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Select_Right.isClickStop",
                },
                {

                    key: "错误选项被选择后消失:",
                    value: ConfigData.instance.BaseConfig.Select_Error.selectedEnd,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Select_Error.selectedEnd",
                },
                {

                    key: "错误选项反馈可被打断:",
                    value: ConfigData.instance.BaseConfig.Select_Error.isClickStop,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Select_Error.isClickStop",
                },
                {

                    key: "不操作的引导语音播放同时触发正确答案提示:",
                    value: ConfigData.instance.BaseConfig.TimeOut_GuideVoice.answerTip,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.TimeOut_GuideVoice.answerTip",
                }
            ],
            openStepAnimSwitch: [{
                key: "回答正确后播放步骤奖励动画:",
                activeStr: "是",
                inactiveStr: "否",
                value: ConfigData.instance.BaseConfig.Select_Right.playRewardAnim,
                route: "BaseConfig.Select_Right.playRewardAnim",
            }],
            stepAnimSwitchList: [{
                    key: "步骤奖励动画飞向计分板:",
                    activeStr: "是",
                    inactiveStr: "否",
                    value: ConfigData.instance.BaseConfig.Select_Right.toScoreBoard,
                    route: "BaseConfig.Select_Right.toScoreBoard",
                },
                {
                    key: "步骤奖励动画可被打断:",
                    activeStr: "是",
                    inactiveStr: "否",
                    value: ConfigData.instance.BaseConfig.Select_Right.isClickStop,
                    route: "BaseConfig.Select_Right.isClickStop",
                }
            ],
            openLevelPassAnimSwitch: [{
                key: "通关奖励动画:",
                activeStr: "是",
                inactiveStr: "否",
                value: ConfigData.instance.BaseConfig.Anim_LevelPass.isEnable,
                route: "BaseConfig.Anim_LevelPass.isEnable",
            }],
            levelPassAnimList: [{
                key: "通关奖励动画飞向计分板:",
                activeStr: "是",
                inactiveStr: "否",
                value: ConfigData.instance.BaseConfig.Anim_LevelPass.toScoreBoard,
                route: "BaseConfig.Anim_LevelPass.toScoreBoard",
            }],
            openSumupAnimSwitch: [{
                key: "总结动画:",
                activeStr: "是",
                inactiveStr: "否",
                value: ConfigData.instance.BaseConfig.Anim_Sumup,
                route: "BaseConfig.Anim_Sumup",
            }],
            sumupAnimList: [{
                    key: "总结动画资源:",
                    value: ConfigData.instance.OtherList.spine.sumupAnim.src,
                    type: 'spine',
                    route: "OtherList.spine.sumupAnim.src",
                },
                {
                    key: "总结动画配音:",
                    value: ConfigData.instance.OtherList.spine.sumupAnim.audio,
                    type: 'sound',
                    route: "OtherList.spine.sumupAnim.audio",
                }
            ],
            openEveryLevelAnimSwitch: [{
                key: "每关奖励动画:",
                activeStr: "是",
                inactiveStr: "否",
                value: ConfigData.instance.BaseConfig.Anim_EveryQuestion.isEnable,
                route: "BaseConfig.Anim_EveryQuestion.isEnable",
            }],
            everyLevelAnimSwitchList: [{
                    key: "每关奖励动画飞向计分板:",
                    activeStr: "是",
                    inactiveStr: "否",
                    value: ConfigData.instance.BaseConfig.Anim_EveryQuestion.toScoreBoard,
                    route: "BaseConfig.Anim_EveryQuestion.toScoreBoard",
                },
                {
                    key: "每关奖励动画可被打断:",
                    activeStr: "是",
                    inactiveStr: "否",
                    value: ConfigData.instance.BaseConfig.Anim_EveryQuestion.clickStop,
                    route: "BaseConfig.Anim_EveryQuestion.clickStop",
                },
                {
                    key: "每关奖励动画完成后进入下一步:",
                    activeStr: "是",
                    inactiveStr: "否",
                    value: ConfigData.instance.BaseConfig.Anim_EveryQuestion.finishedAutoToNextStep,
                    route: "BaseConfig.Anim_EveryQuestion.finishedAutoToNextStep",
                },
                {

                    key: "最后一题播放每关奖励动画:",
                    value: ConfigData.instance.BaseConfig.Anim_EveryQuestion.lastQuestionPlayEveryRewardAnim,
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "BaseConfig.Anim_EveryQuestion.lastQuestionPlayEveryRewardAnim",
                }
            ],
            selectEffectList: [{
                    key: "超时未操作提示语音:",
                    value: ConfigData.instance.OtherList.OutTimeVoice,
                    type: "sound",
                    route: "OtherList.OutTimeVoice"
                }, {
                    key: "选择正确的音效:",
                    value: ConfigData.instance.BaseConfig.Select_Rightff,
                    type: "sound",
                    route: "BaseConfig.Select_Rightff"
                },
                {
                    key: "选择错误的音效:",
                    value: ConfigData.instance.BaseConfig.Select_WrongEff,
                    type: 'sound',
                    route: "BaseConfig.Select_WrongEff",
                }
            ],
            outTimeinputList: [{
                    key: "超时未操作提示时间:",
                    value: ConfigData.instance.BaseConfig.TimeOut_GuideVoice.time,
                    route: "BaseConfig.TimeOut_GuideVoice.time"
                },
                {
                    key: "按下选项缩小效果:",
                    value: ConfigData.instance.BaseConfig.Select_Button.clickScaleValue,
                    precision: 1,
                    step: 0.1,
                    min: 0.5,
                    max: 2,
                    route: "BaseConfig.Select_Button.clickScaleValue"
                },
                {
                    key: "选项底框闪烁动效闪烁速度:",
                    precision: 1,
                    step: 0.1,
                    value: ConfigData.instance.BaseConfig.Select_Button.frameBlinkTime,
                    route: "BaseConfig.Select_Button.frameBlinkTime"
                },
                {
                    key: "回答错误扣取分值:",
                    value: ConfigData.instance.BaseConfig.SubScoreValue_N,
                    step: 1,
                    min: 1,
                    max: 10,
                    route: "BaseConfig.SubScoreValue_N"
                },
                {
                    key: "回答错误次数触发正确答案提示:",
                    value: ConfigData.instance.BaseConfig.Select_Error.tipRightNum,
                    tip: "特殊值: -1不触发正确答案提示 0一直显示正确答案提示",
                    step: 1,
                    min: -1,
                    route: "BaseConfig.Select_Error.tipRightNum"
                }
            ],
            showPage: true,
            iassetDb: "1",
            iguideSize: "1",
            questionIndex: 0,
            add: 1
        };
    },
    computed: {
        tabIndex: {
            get() {
                return this.editableTabsValue;
            },
            set(value) {
                if (value > 1) {
                    this.questionIndex = value - 2;
                    console.log(this.questionIndex);
                }
                this.editableTabsValue = value;
            }
        },
        assetDb: {
            get() {
                return this.iassetDb;
            },
            set(value) {
                this.iassetDb = value;
            }
        },
        guideSize: {
            get() {
                return this.iguideSize;
            },
            set(value) {
                if (this.config.BaseConfig.Anim_Guide.src.length < value) {
                    for (let i = 0; i < value - 1; ++i) {
                        this.config.BaseConfig.Anim_Guide.src.push("");
                    }
                } else {
                    this.config.BaseConfig.Anim_Guide.src.splice(value, this.config.BaseConfig.Anim_Guide.src.length - value);
                }
                this.config.OtherList.spine.guideAnim.animName = [];
                for (let i = 0; i < value; ++i) {
                    this.config.OtherList.spine.guideAnim.animName.push("step0" + (value + 1));
                }
                this.iguideSize = value;
            }
        },
        /** 当前题库 */
        currentQuestion() {
            return this.config.BaseConfig.Question_DataBase[this.questionIndex][0] || {};
        },
        layOutText: {
            get() {
                return this.layOut[this.currentQuestion.layoutID].name;
            },
            set(value) {
                let s = this.layOut.find((item) => {
                    if (item.name == value)
                        return item;
                })
                this.currentQuestion.layoutID = s.key;
            }
        },
        /** tab数量 */
        maxTabIndex() {
            return this.editableTabs.length;
        },
    },
    // 页面加载完成
    mounted() {
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
    // 方法集合
    methods: {
        handlePreview(e, a) {
            this.assetDb = a;
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
                        this.fileList.particle = a.GetAllEffect();
                    }
                    break;
            }
            // this.dialogData = {
            //     title: e.type == 'sound' ? '音频资源预览' : '图片资源预览',
            //     type: e.type,
            //     url: e.url
            // };
            // this.centerDialogVisible = true;
            console.log(this.fileList);
        },
        handleRemove(e) {},
        switchTabs(newPage, oldPage) {
            this.showPage = false;
        },
        pageHidden() {
            this.showPage = true;
        },
        handleExceed(e) {

        },
        upLoadToCache(type, e) {
            let object = null;
            switch (type) {
                case 'sound':
                    {
                        object = this.fileList.sound;
                    }
                    break;
                case 'image':
                    {
                        object = this.fileList.image;
                    }
                    break;
                case 'spine':
                    {
                        object = this.fileList.spine;
                    }
                    break;
                case 'particle':
                    {
                        object = this.fileList.particle;
                    }
                    break;
                default:
                    {
                        this.$message.error("未处理的类型");
                        return;
                    }
            }
            let file = e.file;
            let fileName = this.makerInfo.gameName.toLocaleUpperCase() + type.toLocaleUpperCase() + file.name.substring(0, file.name.lastIndexOf('.')).toLocaleUpperCase();
            object.push({ fileKey: fileName, name: file.name, url: URL.createObjectURL(file), type })
        },
        submit(type, route, file) {
            switch (type.toLocaleLowerCase()) {
                case "sound":
                    {
                        uploadMultiple(file.file, type, this.makerInfo, (data) => {
                            Utils.changeObjectByRoute.call(this, route, data, "data.url");
                        });
                    }
                    break;
                case 'image':
                    {
                        uploadMultiple(file.file, type, this.makerInfo, (data) => {
                            Utils.changeObjectByRoute.call(this, route, data, "data.url");
                            this.previewData.bgimage = data.url;
                        })
                    }
            }
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
            let result = null;
            switch (type) {
                case 'image':
                    {
                        console.log("文件名", e);

                        result = this.assetDb.GetIamgeByName(e);
                        console.log("文件", result);
                    }
                    break;
                case 'sound':
                    {
                        result = this.assetDb.GetAudioByName(e);
                    }
                    break;
                case 'spine':
                    {
                        result = this.assetDb.GetSpineByName(e);
                        if (result) {
                            result = { url: result.Files[0].url, interactiveKey: result.Files[0].interactiveKey }
                        }
                    }
                    break;
                case 'particle':
                    {
                        result = this.assetDb.GetEffectByName(e);
                    }
                    break;
            }
            if (!result) {
                this.$message.error("没有该资源数据");
                return;
            }
            Utils.changeObjectByRoute.call(this, "config." + route, result.interactiveKey, "data", key);
            Utils.changeObjectByRoute.call(this, "previewData." + route, result, "data.url", key);
            Utils.changeObjectByRoute.call(this, `interactive.${type}.${result.interactiveKey}`, `Assets/${this.makerInfo.gameName}/${type}/${result.name}`, 'data');
        },
        inputResult(e, route) {
            Utils.changeObjectByRoute.call(this, "config." + route, e, "data");
            Utils.changeObjectByRoute.call(this, "previewData." + route, e, "data");
        },
        /** 预览 */
        preview() {
            console.log(this.config);
        },
        /** 导出 */
        exportConfig() {
            console.log("配置表对象", this.config);
            console.log("资源加载列表", this.interactive);
            console.log("预览列表", this.previewData);
        },
        // 切换题库
        changTabs(e) {
            // 第一页为游戏流程配置，所以题库下标减一
            this.tabIndex = e.index;
        },
        beforeUpload(type, e) {
            return Utils.verifyFileType(e.name, type);
        },
        addTab() {
            this.editableTabs.push({
                title: `题库${this.maxTabIndex-1}`,
                name: String(this.maxTabIndex),
            });
            this.config.BaseConfig.Question_DataBase.push([new Question(this.add++)]);
            this.tabIndex = `${this.maxTabIndex - 1}`;
        },
        removeTab() {
            if (this.maxTabIndex === 3) {
                this.$message.error("您应当至少包含一题");
                return;
            }
            this.editableTabs.splice(Number(this.tabIndex), 1);
            this.config.BaseConfig.Question_DataBase.splice(this.tabIndex - 2, 1);
            this.editableTabs.forEach((item, index) => {
                if (index > 1) {
                    item.title = `题库${index-1}`;
                    item.name = `${index}`;
                }
            });
            console.log(this.editableTabs);
            //已删除maxTabIndex则取消-1
            this.tabIndex = `${this.tabIndex != this.maxTabIndex ? this.tabIndex : this.tabIndex - 1}`;
            console.log(this.tabIndex);
        }
    }
});