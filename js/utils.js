class Utils {
    /** 
     * @param type "PNG","MP3","PLIST","SKEL","ATLAS"
     */
    static verifyFileType(fileName, type) {
            let i = fileName.lastIndexOf(".");
            let types = {
                "PNG": "png",
                "MP3": "mp3",
                "PLIST": "plist",
                "SKEL": "skel",
                "ATLAS": "atlas"
            };
            if (i != -1) {
                let name = fileName.substring(i + 1);
                if (types[type] == name.toLocaleLowerCase()) {
                    return true;
                }
            }
            Vue.prototype.$message.error("请选择正确的文件格式")
            return false;
        }
        /**
         * 
         * @param  route 路径
         * @param  data 数据
         * @param  value 以data为首的执行字符串
         */
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
}