class Config {
    constructor() {
        this.BaseConfig = {
            BgSetting: {
                centerRes: "",
                leftRes: "",
                rightRes: "",
                spineRes: "",
                run: "",
                idle: ""
            },
            Anim_polt: {
                bgOpacity: 0.5,
                isEnable: false,
                clickStop: false,
                finishedAutoToGuide: false
            },
            Anim_Guide: {
                bgOpacity: 0.01,
                isEnable: false,
                clickStop: false,
                src: [""],
                finishedAutoToNextStep: true
            },
            Database: {
                radomSort: false,
                guideaAndVoiceFirst: false
            },
            Select_Button: {
                clickScaleValue: 0.8,
                frameBlinkTime: 0.5,
                clickedHide: false
            },
            Select_Error: {
                tipRightNum: 3,
                selectedEnd: false,
                isClickStop: true
            },
            Select_Right: {
                selectedEnd: true,
                playRewardAnim: true,
                toScoreBoard: true,
                isClickStop: false
            },
            Anim_EveryQuestion: {
                isEnable: false,
                toScoreBoard: false,
                clickStop: false,
                finishedAutoToNextStep: false,
                lastQuestionPlayEveryRewardAnim: true
            },
            TimeOut_GuideVoice: {
                time: 30,
                answerTip: false
            },
            Anim_LevelPass: {
                isEnable: false,
                toScoreBoard: false
            },
            Select_Rightff: "",
            Select_WrongEff: "",
            SubScoreValue_N: 1,
            Anim_TipRightPlane: 0,
            Anim_TipRightRes: "",
            Anim_Sumup: true,
            Quit_desc: "是否确认退出?",
            Question_DataBase: [
                [new Question(0)]
            ]
        };
        this.OtherList = {
            ReadBackButtonEffect: "",
            animTargetGuidePlane: 0,
            AnimTargetGuideRes: "",
            spine: {
                poltAnim: {
                    src: "",
                    audio: ""
                },
                guideAnim: {
                    src: "",
                    animName: [

                    ]
                },
                sumupAnim: {
                    src: "",
                    audio: ""
                },
                replayAnim: {
                    src: ""
                },
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
            },
            QuestionBarImage: "",
            BGM: "",
            QuestionNumBgRes: "",
            Btn_quit: "",
            Btn_quitAudio: "",
            OutTimeVoice: "",
            Button: [
                "",
                "",
                "",
                "",
                ""
            ],
            ButtonFlash: [
                "",
                "",
                "",
                "",
                ""
            ]
        };
    }
    getData() {
        return {
            BaseConfig: this.BaseConfig,
            OtherList: this.OtherList
        };
    }
    setData(BaseConfig, OtherList) {
        this.BaseConfig = BaseConfig;
        this.OtherList = OtherList;
    }
}
class PreviewData extends Config {
    constructor() {
        super();
        this._instance = this;
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new PreviewData();
            return this._instance;
        }
        return this._instance;
    }
}
class ConfigData extends Config {
    constructor() {
        super();
        this._instance = this;
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new ConfigData();
            return this._instance;
        }
        return this._instance;
    }
}
class SelectListData extends Config {
    constructor() {
        super();
        this._instance = this;
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new SelectListData();
            return this._instance;
        }
        return this._instance;
    }
}
class Question {
    constructor(id) {
        this.index = id;
        this.layoutID = 0;
        this.questionContent = "";
        this.ScreenShoot = false;
        this.voiceAndEffPlay = true;
        this.radomSelectPos = false;
        this.questionContentColor = {
            r: 0,
            g: 0,
            b: 0
        };
        this.questionVoice = {
            res: "",
            whenStartPlayVoice: true,
            playOnLoadClickStop: true
        };
        this.questionImage = "";
        this.voiceTargetGuide = {
            res: "",
            clickStop: true
        };
        this.selectGuide = [{
                start: 0,
                end: 0
            },
            {
                start: 0,
                end: 0
            },
            {
                start: 0,
                end: 0
            }, {
                start: 0,
                end: 0
            }
        ];
        this.voiceAnwserRight = [];
        this.voiceAnwserWrong = [];
        this.select_Fixed = [];
        this.repeatThisQuesNum = 0;
        this.rightAwserID = 0;
        this.feedBackAnim = {
            right: {
                anim: "",
                voice: ""
            },
            wrong: {
                anim: "",
                voice: ""
            },
            plot: {
                anim: "",
                voice: ""
            }
        };
        this.radom_Fixed = {
            right: [],
            wrong: []
        };
    }
}
class Button {
    constructor(isRight = true) {
        this.label = "";
        this.image = "";
        this.voice = "";
        this.isRight = isRight;
    }
}
class RadomSelect {
    constructor() {
        this.right = [];
        this.wrong = [];
    }
}
class Interactive {
    constructor() {
        this.assets = {
            image: {},
            sound: {},
            spine: {},
            particle: {},
            gameConfig: {}
        };
        this.interactive = {};
    }
}