class AppData {
    constructor() {
        this.Anim_GuideAudio = [];
        this.buttonNum = [4, 3, 2, 3, 4];
        this.editableTabsValue = "0"; // tabs 默认展开下标
        this.editableTabs = [{ title: '资源导入设置', name: '0' }, { title: '游戏流程配置', name: '1' }, { title: '题库1', name: '2' }];
        this.layOut = [
            { key: 0, name: "A1" }, { key: 1, name: "A2" }, { key: 2, name: "A3" }, { key: 3, name: "A4" }, { key: 4, name: "A5" },
            { key: 5, name: "B1" }, { key: 6, name: "B2" }, { key: 7, name: "B3" }, { key: 8, name: "B4" }, { key: 9, name: "B5" }
        ];
        this.makerInfo = { userAccount: "", makerName: "M001Maker", gameName: "M001" };
        this.rightTipPlane = [{ key: 0, name: "闪烁" }, { key: 1, name: "粒子动画" }, { key: 2, name: "骨骼动画" }];
        this.feedBackInQuestion = [{ key: "正确反馈动画", objectKey: 'right' }, { key: "错误反馈动画", objectKey: 'wrong' }, { key: "剧情反馈动画", objectKey: 'plot' }];
        this.Button = [];
        this.ButtonFlash = [];
        this.guideRes = "";
        this.fileList = { sound: [], image: [], spine: [], particle: [] };
        this.previewData = PreviewData.instance;
        this.config = ConfigData.instance;
        this.interactive = null;
        this.interactiveFile = null;
        this.bgList = new MakerList().bgList;
        this.uiList = new MakerList().uiList;
        this.plotAnimList = new MakerList().plotAnimList;
        this.plotAnimSwitchList = new MakerList().plotAnimSwitchList;
        this.guideSwitchList = new MakerList().guideSwitchList;
        this.manualSwitchList = new MakerList().manualSwitchList;
        this.openStepAnimSwitch = new MakerList().openStepAnimSwitch;
        this.stepAnimSwitchList = new MakerList().stepAnimSwitchList;
        this.openLevelPassAnimSwitch = new MakerList().openLevelPassAnimSwitch;
        this.levelPassAnimList = new MakerList().levelPassAnimList;
        this.openSumupAnimSwitch = new MakerList().openSumupAnimSwitch;
        this.sumupAnimList = new MakerList().sumupAnimList;
        this.openEveryLevelAnimSwitch = new MakerList().openEveryLevelAnimSwitch;
        this.everyLevelAnimSwitchList = new MakerList().everyLevelAnimSwitchList;
        this.selectEffectList = new MakerList().selectEffectList;
        this.outTimeinputList = new MakerList().outTimeinputList;
        this.scrreenShoot = new MakerList().scrreenShoot;
        this.questionVoice = new MakerList().questionVoice;
        this.upLoading = true;
        this.showPage = true;
        this.assetDb = null;
        this.iguideSize = "1";
        this.questionIndex = 0;
        this.remoteAssetDb = "";
        this.current = {
            progress: 0,
            filename: ""
        };
        this.total = {
            progress: 0,
            count: "0/0"
        };
        this.dialogData = null;
        this.dialogType = -1;
        this.isVisible = false;
        this.HTTP = new Http("http://10.0.30.203:10999");
        this.History = [];
        this.progresState = null;
        this.hideTimeOut = 0;
        this.MainDataBase = new CurrentData();
        this.newTabsID = '1';
    }
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
            this.interactive = this.MainDataBase.interactive;
            this.interactiveFile = this.MainDataBase.interactiveFile;
        }, 0);
    }
}