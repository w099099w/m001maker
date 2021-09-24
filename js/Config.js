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
            },
            QuestionBarImage: "",
            BGM: "",
            QuestionNumBgRes: "",
            Btn_quit: "",
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
    }
}