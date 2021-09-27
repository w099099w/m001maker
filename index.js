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
                },
                {
                    key: "重读按钮动画资源:",
                    value: ConfigData.instance.OtherList.spine.replayAnim.src,
                    type: 'image',
                    route: "OtherList.spine.replayAnim.src",
                },
                {
                    key: "重读按钮点击音效:",
                    value: ConfigData.instance.OtherList.ReadBackButtonEffect,
                    type: 'sound',
                    route: "OtherList.ReadBackButtonEffect",
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
            scrreenShoot: [{
                    key: "是否截屏:",
                    value: false,
                    target: "question",
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "ScreenShoot",
                },
                {
                    key: "选项配音与正确/错误音效播放顺序:",
                    value: false,
                    target: "question",
                    activeStr: "依次",
                    inactiveStr: "同时",
                    route: "voiceAndEffPlay",
                },
                {
                    key: "随机按钮位置:",
                    value: false,
                    target: "question",
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "radomSelectPos",
                },
                {
                    key: "开始时自动播放题目配音:",
                    value: false,
                    target: "question",
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "questionVoice.whenStartPlayVoice",
                },
                {
                    key: "自动播放题目配音可被打断:",
                    value: false,
                    target: "question",
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "questionVoice.playOnLoadClickStop",
                },
                {
                    key: "目标引导语音可被打断:",
                    value: false,
                    target: "question",
                    activeStr: "是",
                    inactiveStr: "否",
                    route: "voiceTargetGuide.clickStop",
                }
            ],
            questionVoice: [{
                    target: "question",
                    key: "目标引导语音:",
                    value: "",
                    tip: "此资源可不配置一旦配置将激活目标引导动画",
                    type: "sound",
                    route: "voiceTargetGuide.res"
                }, {
                    target: "question",
                    key: "题目语音:",
                    tip: "此资源可不配置",
                    value: "",
                    type: "sound",
                    route: "questionVoice.res"
                },
                {
                    target: "question",
                    key: "题目图片:",
                    tip: "此资源可不配置",
                    value: "",
                    type: "image",
                    route: "questionImage"
                }
            ],
            showPage: true,
            iassetDb: "1",
            iguideSize: "1",
            questionIndex: 0,
            add: 1,
        };
    },
    directives: {
        'color': {
            bind: function(el, binding) {
                el.style.color = binding.value;
            },
            update: function(el, binding) {
                el.style.color = binding.value;
            },
            inserted: function(el) {

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
                    this.currentPriview.radom_Fixed = {
                        right: [],
                        wrong: []
                    };
                    this.currentQuestion.radom_Fixed = {
                        right: [],
                        wrong: []
                    };
                    this.questionCache.radom_Fixed = {
                        right: [],
                        wrong: []
                    };
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

                    this.currentPriview.radom_Fixed = this.currentQuestion.radom_Fixed = {
                        right: [],
                        wrong: []
                    };
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
                })
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
                        result = this.assetDb.GetIamgeByName(e);
                    }
                    break;
                case 'sound':
                    {
                        result = this.assetDb.GetAudioByName(e);
                        console.log(e, result, type, route, key);
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
        selectResultByQuestion(e, type, route, key) {
            console.log(e, type, route);
            if (type == 'bool') {
                //config已被内部修改
                Utils.changeObjectByRoute.call(this, "currentPriview." + route, e, "data");
                return;
            }
            let result = null;
            switch (type) {
                case 'image':
                    {
                        result = this.assetDb.GetIamgeByName(e);
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
            Utils.changeObjectByRoute.call(this, "currentQuestion." + route, result.interactiveKey, "data", key);
            Utils.changeObjectByRoute.call(this, "currentPriview." + route, result, "data.url", key);
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
                        return;
                    }
                    item.rightAwserID = rightId; //固定选项计算正确ID
                }
            }
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
            this.showCache.push(new PageCache());
            this.previewData.BaseConfig.Question_DataBase.push([new Question(this.add++)]);
            this.config.BaseConfig.Question_DataBase.push([new Question(this.add++)]);
            this.tabIndex = `${this.maxTabIndex - 1}`;
            this.setPlane = false;
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