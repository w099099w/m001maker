function getFile(file, chunkSize, callback) {
    //声明必要的变量
    let fileReader = new FileReader(),
        //文件每块分割2M，计算分割详情
        chunks = Math.ceil(file.size / chunkSize),
        tmpDataList = [],
        currentChunk = 0;
    //每块文件读取完毕之后的处理
    fileReader.onload = function(e) {
        //每块交由sparkMD5进行计算
        currentChunk++;
        //如果文件处理完成计算MD5，如果还有分片继续处理
        if (currentChunk < chunks) {
            loadNext();
        } else {
            callback(tmpDataList);
        }
    };
    //处理单片文件的上传
    function loadNext() {
        var start = currentChunk * chunkSize,
            end = start + chunkSize >= file.size ? file.size : start + chunkSize,
            blobSlice =
            window.File.prototype.slice ||
            window.File.prototype.mozSlice ||
            window.File.prototype.webkitSlice;
        var pieceFile = blobSlice.call(
            file,
            start,
            end
        );
        pieceFile.name = file.name;
        let tmpObj = {
            file: pieceFile,
            currentSize: end - start,
            currentNum: currentChunk
        };
        tmpDataList.push(tmpObj);
        fileReader.readAsBinaryString(file.slice(start, end));
    }
    loadNext();
}

function uploadMultiple(network, file, type, makerInfo, progress, callback) {
    return new Promise((reslove, reject) => {
        let burstSize = 1 * 1024 * 1024; //分片大小2M
        getFile(file, burstSize, async(chunkArr) => {
            //当文件大于分片大小时，进行分片上传
            console.log(burstSize);
            if (file.size > burstSize) {
                let formData_upload = new FormData(); //上传参数
                let allCount = Math.ceil(file.size / burstSize);
                let percentChunk = 100 / allCount;
                formData_upload.append('chunks', null); //文件名,文件;
                formData_upload.append('name', null); //文件名,文件
                formData_upload.append('size', null); //文件名,文件
                formData_upload.append('fileMd5', null); //文件名,文件
                formData_upload.append('chunk', null); //分片号，从1开始
                formData_upload.append('chunkSize', null); //分片大小
                formData_upload.append('file', null); //分片文件
                let upResult = null;
                for (var i = 0; i < chunkArr.length; i++) {
                    formData_upload.set('chunks', allCount); //文件名,文件;
                    formData_upload.set('name', `/${User.appID}/${User.UUID}/${User.deskID}/Asset/M001/${type}/${file.name}`); //文件名,文件
                    formData_upload.set('fileMd5', file.name.substr(0, file.name.lastIndexOf("."))); //文件名,文件
                    formData_upload.set('chunk', i); //分片号，从1开始
                    formData_upload.set('size', chunkArr[i].currentSize); //分片号，从1开始
                    formData_upload.set('chunkSize', burstSize); //分片大小
                    formData_upload.set('file', chunkArr[i].file); //分片文件
                    // 分片上传
                    upResult = await network.Request('post', '/clientApp/upload', formData_upload, (data) => { progress(i * percentChunk + (data / 100) * percentChunk); });
                    if (upResult.code != 0 && upResult.code != 50007) {
                        reject(data);
                        return;
                    }
                }
                if (upResult) {
                    callback(upResult);
                    reslove(upResult);
                } else {
                    reject({ code: -1, msg: '分片错误' });
                }
            } else {
                let formData_upload = new FormData(); //上传参数
                let fileNoExtName = file.name.substr(0, file.name.lastIndexOf("."));
                formData_upload.append('fileMd5', fileNoExtName); //md5值
                formData_upload.append('name', `/${User.appID}/${User.UUID}/${User.deskID}/Asset/M001/${type}/${file.name}`); //文件路径带后缀
                formData_upload.append('file', file); //文件
                network.Request('post', '/clientApp/upload', formData_upload, (data) => { progress(data); }).then(data => {
                    if (data) {
                        callback(data.result);
                        reslove(data);
                    } else if (data == 401) {
                        reject(data);
                    }
                }).catch(error => {
                    reject(error.data);
                });
            }
        });
    });
}