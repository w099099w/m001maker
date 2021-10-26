class Utils {
    static changeObjectByRoute(route, data, value, key) {
        route = route.split('.');
        let evarStr = 'this';
        route.forEach(element => {
            evarStr += `["${element}"]`;
        });
        if (key != undefined) {
            evarStr += `["${key}"]`;
        }
        if (!value) {
            evarStr += '=' + `JSON.parse(data)`;
        } else {
            evarStr += '=' + value;
        }
        console.log("执行代码:" + evarStr);
        try {
            eval(evarStr);
        } catch (e) {
            console.warn(e);
        }
    }
    static getFileUrlByFileKey(fileList, fileKey) {
        let url = '';
        fileList.some((item) => {
            url = item.find((item) => {
                if (item.fileKey == fileKey) {
                    return item;
                }
            });
            if (url) {
                return true;
            }
        });
        return url;
    }
    static getColorStringFormObject(object) {
        function getDexStr(params) {
            return params != undefined ? params.toString(16) : "";
        }
        return "#" + getDexStr(object.r) + getDexStr(object.g) + getDexStr(object.b) + getDexStr(object.a);
    }
    static getColorObjectFormString(string, isDex = false) {
        string = string.substring(1);
        let data = {
            r: string.substring(0, 2),
            g: string.substring(2, 4),
        };
        if (string.length > 6) {
            data.b = string.substring(4, 6);
            data.a = string.substring(6);
        } else {
            data.b = string.substring(4);
        }
        if (isDex) {
            return data;
        }
        let intData = { r: parseInt(data.r, 16), g: parseInt(data.g, 16), b: parseInt(data.b, 16) };
        if (data.a != undefined) {
            intData.a = parseInt(data.a, 16);
        }
        return intData;
    }
}