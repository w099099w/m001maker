class Utils {
    /** 
     * @param type "PNG","MP3","PLIST","SKEL","ATLAS"
     */
    static verifyFileType(fileName, type) {
        console.log(fileName)
        let i = fileName.lastIndexOf(".");
        let types = {
            "PNG": "png",
            "MP3": "mp3",
            "PLIST": "plist",
            "SKEL": "skel",
            "ATLAS": "atlas"
        }
        if (i != -1) {
            let name = fileName.substring(i + 1);
            console.log(name.toLocaleLowerCase())
            if (types[type] == name.toLocaleLowerCase()) {
                return true;
            }
        }
        Vue.prototype.$message.error("请选择正确的文件格式")
        return false;
    }
}