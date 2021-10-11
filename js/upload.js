function uploadMultiple(network, file, type, makerInfo, progress, callback) {
    return new Promise((reslove, reject) => {
        let burstSize = 2 * 1024 * 1024; //分片大小2M
        let count = 0; //成功上传了几个分片
        getFileMD5(file, async(md5, chunkArr) => {
            //当文件大于分片大小时，进行分片上传
            console.log(burstSize);
            let fileName = md5 + '.' + file.name.split('.')[file.name.split('.').length - 1];
            if (file.size > burstSize) {
                let formData_upload = new FormData(); //上传参数
                let formData_fileName = new FormData(); //上传参数
                formData_fileName.append('fileName', fileName); //文件名
                let generateID = await http.generateUploadId(formData_fileName);
                console.log(generateID)
                if (generateID.code !== 0) reslove({ code: 0 });
                if (generateID.result.url) {
                    callback(generateID.result);
                    reslove(generateID);
                } else {
                    let generate = generateID.result.uploadId;
                    let partETagsList = [];
                    formData_upload.append('partNumber', null); //分片号，从1开始
                    formData_upload.append('partSize', null); //分片大小
                    formData_upload.append('file', null); //分片文件
                    formData_upload.append('uploadId', generate); //分片上传事件的唯一标识
                    formData_upload.append('fileName', fileName); //文件名,文件MD5+后缀
                    for (var i = 0; i < chunkArr.length; i++) {
                        formData_upload.set('partNumber', i + 1); //分片号，从1开始
                        formData_upload.set('partSize', chunkArr[i].currentSize); //分片大小
                        formData_upload.set('file', chunkArr[i].file); //分片文件
                        // 分片上传
                        let uploadChunk = await http.sendFileChunk(formData_upload, (data) => { progress(data) })
                        if (uploadChunk.code === 0) {
                            partETagsList.push(uploadChunk.result.partETag);
                            count++;
                        } else {
                            break;
                        }
                    }
                    if (count == Math.ceil(file.size / burstSize)) {
                        let dataRequest = {
                                fileName,
                                partETags: partETagsList,
                                uploadId: generate,
                                realName: file.name,
                                type: type,
                                makerInfo: makerInfo
                            }
                            // 合并分片
                        let merge = await http.mergeFileChunk(dataRequest);
                        if (merge.code === 0) {
                            callback(merge.result);
                            reslove(merge);
                        }
                    }
                }
            } else {
                let formData_upload = new FormData(); //上传参数
                let fileNoExtName = file.name.substr(0, file.name.lastIndexOf("."));
                formData_upload.append('fileMd5', fileNoExtName); //md5值
                formData_upload.append('name', `/${User.appID}/${User.UUID}/${User.deskID}/Asset/M001/${type}/${file.name}`); //文件路径带后缀
                formData_upload.append('file', file); //文件
                console.log(fileNoExtName, `/${User.appID}/${User.UUID}/${User.deskID}/Asset/M001/${type}/${file.name}`);
                network.Request('post', '/clientApp/upload', formData_upload, (data) => { progress(data); }).then(data => {
                    if (data) {
                        callback(data.result);
                        reslove(data);
                    } else {
                        reject({ file: file, msg: "上传失败" });
                    }
                }).catch(error => {
                    reject(error.data);
                });
                // console.log(file)
                // formData_upload.append('file', file); //文件
                // formData_upload.append('fileName', fileName); //文件名
                // formData_upload.append('realName', file.name); //文件名
                // formData_upload.append('type', type); //文件名
                // formData_upload.append('makerInfo', JSON.stringify(makerInfo)); //文件名
                // let affirm = await http.sendFile(formData_upload, (data) => { progress(data) })
                // if (affirm.code === 0) {
                //     callback(affirm.result)
                //     reslove(affirm);
                // }
            }
        });
    });
}
let s = "aresf.png";