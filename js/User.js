class User {
    constructor() {
        User.appID = 'm001237102c00e681746d1b8f0b39ef51ed911';
        User.appSecret = "2fe3895f329633b91342879f1556d25a37dcefc6cbe7e8013ae41d701ffc5f32";
        User.setToken();
        User.deskID = Date.now();
        User.deskIDCacke = User.deskID;
    }
    static resumeDeskID() {
        User.deskID = User.deskIDCacke;
    }
    static removeToken() {
        localStorage.removeItem("userAccount");
    }
    static setToken(token) {
        if (token) {
            localStorage.setItem("userAccount", token);
        }
        User.getUUID();
        User.token = localStorage.getItem("userAccount");
    }
    static generateUUID() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    static getUUID() {
        if (!User.UUID) {
            User.UUID = localStorage.getItem("UUID");
            if (!User.UUID) {
                User.UUID = User.generateUUID();
                localStorage.setItem("UUID", User.UUID);
            }
        }
    }
}