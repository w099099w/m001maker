const DialogButton = {
    MB_NULL: 0,
    MB_YES: 1,
    MB_YESNO: 2,
    MB_NO: 3
};
const DialogIcon = {
    ERROR: 0,
    WARNING: 1,
    INFO: 2,
    NULL: 3
};
class DialogData {
    constructor(callFunction) {
        this.title = "";
        this.content = "";
        this.buttonType = DialogButton.MB_NULL;
        this.callFunction = callFunction;
    }
    setButtonType(buttonType) {
        this.buttonType = buttonType;
    }
    setTitle(title) {
        this.title = title;
    }
    callResult(type) {
        if (this.callFunction) {
            this.callFunction(type);
        }
    }
}
class DialogChangeTip extends DialogData {
    constructor(str, icon, params, callFunction) {
        super(callFunction);
        this.buttonType = DialogButton.MB_YESNO;
        this.title = '提示';
        this.content = {
            body: str,
            icon: icon
        };
        this.params = params;
    }
}
class DialogLoginTip extends DialogData {
    constructor(str, callFunction) {
        super(callFunction);
        this.buttonType = DialogButton.MB_NULL;
        this.title = '登陆';
        this.content = {
            show: false,
            str: str
        };
    }
}