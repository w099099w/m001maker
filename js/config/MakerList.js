class MakerList {
    constructor(question) {
        this.bgList = [{
                key: "背景图片:",
                value: SelectListData.instance.BaseConfig.BgSetting.centerRes,
                type: "image",
                route: "BaseConfig.BgSetting.centerRes",
            },
            {
                key: "全面屏时左侧背景图:",
                value: SelectListData.instance.BaseConfig.BgSetting.leftRes,
                type: "image",
                route: "BaseConfig.BgSetting.leftRes",
            },
            {
                key: "全面屏时右侧背景图:",
                value: SelectListData.instance.BaseConfig.BgSetting.rightRes,
                type: "image",
                route: "BaseConfig.BgSetting.rightRes",
            },
            {
                key: "背景音乐:",
                value: SelectListData.instance.OtherList.BGM,
                type: "sound",
                route: "OtherList.BGM",
            },
            {
                key: "背景动画资源:",
                value: SelectListData.instance.BaseConfig.BgSetting.spineRes,
                type: "spine",
                route: "BaseConfig.BgSetting.spineRes",
            },
        ];
        this.uiList = [{
                key: "退出图片:",
                value: SelectListData.instance.OtherList.Btn_quit,
                type: "image",
                route: "OtherList.Btn_quit",
            },
            {
                key: "退出按钮点击音效:",
                value: SelectListData.instance.OtherList.Btn_quitAudio,
                type: "sound",
                route: "OtherList.Btn_quitAudio",
            },
            {
                key: "题目框图片:",
                value: SelectListData.instance.OtherList.QuestionBarImage,
                type: 'image',
                route: "OtherList.QuestionBarImage",
            },
            {
                key: "当前题目计数底框:",
                value: SelectListData.instance.OtherList.QuestionNumBgRes,
                type: 'image',
                route: "OtherList.QuestionNumBgRes",
            },
            {
                key: "重读按钮动画资源:",
                value: SelectListData.instance.OtherList.spine.replayAnim.src,
                type: 'spine',
                route: "OtherList.spine.replayAnim.src",
            },
            {
                key: "重读按钮点击音效:",
                value: SelectListData.instance.OtherList.ReadBackButtonEffect,
                type: 'sound',
                route: "OtherList.ReadBackButtonEffect",
            }
        ];
        this.plotAnimList = [{
                key: "剧情动画配音:",
                value: SelectListData.instance.OtherList.spine.poltAnim.audio,
                type: "sound",
                route: "OtherList.spine.poltAnim.audio"
            },
            {
                key: "剧情动画资源:",
                value: SelectListData.instance.OtherList.spine.poltAnim.src,
                type: 'spine',
                route: "OtherList.spine.poltAnim.src",
            },
        ];
        this.plotAnimSwitchList = [{
                key: "剧情动画自动进入下一步:",
                activeStr: "是",
                inactiveStr: "否",
                value: SelectListData.instance.BaseConfig.Anim_polt.finishedAutoToGuide,
                route: "BaseConfig.Anim_polt.finishedAutoToGuide",
            },
            {

                key: "剧情动画可被打断:",
                value: SelectListData.instance.BaseConfig.Anim_polt.clickStop,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Anim_polt.clickStop",
            }
        ];
        this.guideSwitchList = [{
                key: "引导动画自动进入下一步:",
                activeStr: "是",
                inactiveStr: "否",
                value: SelectListData.instance.BaseConfig.Anim_Guide.finishedAutoToNextStep,
                route: "BaseConfig.Anim_Guide.finishedAutoToNextStep",
            },
            {

                key: "引导动画可被打断:",
                value: SelectListData.instance.BaseConfig.Anim_Guide.clickStop,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Anim_Guide.clickStop",
            }
        ];
        this.manualSwitchList = [{
                key: "题库顺序是否随机:",
                activeStr: "是",
                inactiveStr: "否",
                value: SelectListData.instance.BaseConfig.Database.radomSort,
                route: "BaseConfig.Database.radomSort",
            },
            {

                key: "目标引导语音及相关展示只出现一次:",
                value: SelectListData.instance.BaseConfig.Database.guideaAndVoiceFirst,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Database.guideaAndVoiceFirst",
            },
            {

                key: "正确选项被选择后所有选项消失:",
                value: SelectListData.instance.BaseConfig.Select_Button.clickedHide,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Select_Button.clickedHide",
            },
            {

                key: "正确选项被选择后消失:",
                value: SelectListData.instance.BaseConfig.Select_Right.selectedEnd,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Select_Right.selectedEnd",
            },
            {

                key: "正确选项反馈可被打断:",
                value: SelectListData.instance.BaseConfig.Select_Right.isClickStop,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Select_Right.isClickStop",
            },
            {

                key: "错误选项被选择后消失:",
                value: SelectListData.instance.BaseConfig.Select_Error.selectedEnd,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Select_Error.selectedEnd",
            },
            {

                key: "错误选项反馈可被打断:",
                value: SelectListData.instance.BaseConfig.Select_Error.isClickStop,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Select_Error.isClickStop",
            },
            {

                key: "不操作的引导语音播放同时触发正确答案提示:",
                value: SelectListData.instance.BaseConfig.TimeOut_GuideVoice.answerTip,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.TimeOut_GuideVoice.answerTip",
            }
        ];
        this.openStepAnimSwitch = [{
            key: "回答正确后播放步骤奖励动画:",
            activeStr: "是",
            inactiveStr: "否",
            value: SelectListData.instance.BaseConfig.Select_Right.playRewardAnim,
            route: "BaseConfig.Select_Right.playRewardAnim",
        }];
        this.stepAnimSwitchList = [{
                key: "步骤奖励动画飞向计分板:",
                activeStr: "是",
                inactiveStr: "否",
                value: SelectListData.instance.BaseConfig.Select_Right.toScoreBoard,
                route: "BaseConfig.Select_Right.toScoreBoard",
            },
            {
                key: "步骤奖励动画可被打断:",
                activeStr: "是",
                inactiveStr: "否",
                value: SelectListData.instance.BaseConfig.Select_Right.isClickStop,
                route: "BaseConfig.Select_Right.isClickStop",
            }
        ];
        this.openLevelPassAnimSwitch = [{
            key: "通关奖励动画:",
            activeStr: "是",
            inactiveStr: "否",
            value: SelectListData.instance.BaseConfig.Anim_LevelPass.isEnable,
            route: "BaseConfig.Anim_LevelPass.isEnable",
        }];
        this.levelPassAnimList = [{
            key: "通关奖励动画飞向计分板:",
            activeStr: "是",
            inactiveStr: "否",
            value: SelectListData.instance.BaseConfig.Anim_LevelPass.toScoreBoard,
            route: "BaseConfig.Anim_LevelPass.toScoreBoard",
        }];
        this.openSumupAnimSwitch = [{
            key: "总结动画:",
            activeStr: "是",
            inactiveStr: "否",
            value: SelectListData.instance.BaseConfig.Anim_Sumup,
            route: "BaseConfig.Anim_Sumup",
        }];
        this.sumupAnimList = [{
                key: "总结动画资源:",
                value: SelectListData.instance.OtherList.spine.sumupAnim.src,
                type: 'spine',
                route: "OtherList.spine.sumupAnim.src",
            },
            {
                key: "总结动画配音:",
                value: SelectListData.instance.OtherList.spine.sumupAnim.audio,
                type: 'sound',
                route: "OtherList.spine.sumupAnim.audio",
            }
        ];
        this.openEveryLevelAnimSwitch = [{
            key: "每关奖励动画:",
            activeStr: "是",
            inactiveStr: "否",
            value: SelectListData.instance.BaseConfig.Anim_EveryQuestion.isEnable,
            route: "BaseConfig.Anim_EveryQuestion.isEnable",
        }];
        this.everyLevelAnimSwitchList = [{
                key: "每关奖励动画飞向计分板:",
                activeStr: "是",
                inactiveStr: "否",
                value: SelectListData.instance.BaseConfig.Anim_EveryQuestion.toScoreBoard,
                route: "BaseConfig.Anim_EveryQuestion.toScoreBoard",
            },
            {
                key: "每关奖励动画可被打断:",
                activeStr: "是",
                inactiveStr: "否",
                value: SelectListData.instance.BaseConfig.Anim_EveryQuestion.clickStop,
                route: "BaseConfig.Anim_EveryQuestion.clickStop",
            },
            {
                key: "每关奖励动画完成后进入下一步:",
                activeStr: "是",
                inactiveStr: "否",
                value: SelectListData.instance.BaseConfig.Anim_EveryQuestion.finishedAutoToNextStep,
                route: "BaseConfig.Anim_EveryQuestion.finishedAutoToNextStep",
            },
            {

                key: "最后一题播放每关奖励动画:",
                value: SelectListData.instance.BaseConfig.Anim_EveryQuestion.lastQuestionPlayEveryRewardAnim,
                activeStr: "是",
                inactiveStr: "否",
                route: "BaseConfig.Anim_EveryQuestion.lastQuestionPlayEveryRewardAnim",
            }
        ];
        this.selectEffectList = [{
                key: "超时未操作提示语音:",
                value: SelectListData.instance.OtherList.OutTimeVoice,
                type: "sound",
                route: "OtherList.OutTimeVoice"
            }, {
                key: "选择正确的音效:",
                value: SelectListData.instance.BaseConfig.Select_Rightff,
                type: "sound",
                route: "BaseConfig.Select_Rightff"
            },
            {
                key: "选择错误的音效:",
                value: SelectListData.instance.BaseConfig.Select_WrongEff,
                type: 'sound',
                route: "BaseConfig.Select_WrongEff",
            }
        ];
        this.outTimeinputList = [{
                key: "超时未操作提示时间:",
                value: SelectListData.instance.BaseConfig.TimeOut_GuideVoice.time,
                route: "BaseConfig.TimeOut_GuideVoice.time"
            },
            {
                key: "按下选项缩小效果:",
                value: SelectListData.instance.BaseConfig.Select_Button.clickScaleValue,
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
                value: SelectListData.instance.BaseConfig.Select_Button.frameBlinkTime,
                route: "BaseConfig.Select_Button.frameBlinkTime"
            },
            {
                key: "回答错误扣取分值:",
                value: SelectListData.instance.BaseConfig.SubScoreValue_N,
                step: 1,
                min: 1,
                max: 10,
                route: "BaseConfig.SubScoreValue_N"
            },
            {
                key: "回答错误次数触发正确答案提示:",
                value: SelectListData.instance.BaseConfig.Select_Error.tipRightNum,
                tip: "特殊值: -1不触发正确答案提示 0一直显示正确答案提示",
                step: 1,
                min: -1,
                route: "BaseConfig.Select_Error.tipRightNum"
            }
        ];
        this.scrreenShoot = [{
                key: "是否截屏:",
                value: "ScreenShoot",
                target: "question",
                activeStr: "是",
                inactiveStr: "否",
                route: "ScreenShoot",
            },
            {
                key: "选项配音与正确/错误音效播放顺序:",
                value: "voiceAndEffPlay",
                target: "question",
                activeStr: "依次",
                inactiveStr: "同时",
                route: "voiceAndEffPlay",
            },
            {
                key: "随机按钮位置:",
                value: "radomSelectPos",
                target: "question",
                activeStr: "是",
                inactiveStr: "否",
                route: "radomSelectPos",
            },
            {
                key: "开始时自动播放题目配音:",
                value: "questionVoice",
                bindValue: "whenStartPlayVoice",
                target: "subData",
                activeStr: "是",
                inactiveStr: "否",
                route: "questionVoice.whenStartPlayVoice",
            },
            {
                key: "自动播放题目配音可被打断:",
                value: "questionVoice",
                bindValue: "playOnLoadClickStop",
                target: "subData",
                activeStr: "是",
                inactiveStr: "否",
                route: "questionVoice.playOnLoadClickStop",
            },
            {
                key: "目标引导语音可被打断:",
                value: "voiceTargetGuide",
                bindValue: "clickStop",
                target: "subData",
                activeStr: "是",
                inactiveStr: "否",
                route: "voiceTargetGuide.clickStop",
            }
        ];
        this.questionVoice = [{
                target: "subData",
                key: "目标引导语音:",
                value: "voiceTargetGuide",
                bindValue: "res",
                tip: "此资源可不配置一旦配置将激活目标引导动画",
                type: "sound",
                route: "voiceTargetGuide.res"
            }, {
                target: "subData",
                key: "题目语音:",
                tip: "此资源可不配置",
                value: "questionVoice",
                bindValue: "res",
                type: "sound",
                route: "questionVoice.res"
            },
            {
                target: "question",
                key: "题目图片:",
                tip: "此资源可不配置",
                value: "questionImage",
                type: "image",
                route: "questionImage"
            }
        ];
    }
}