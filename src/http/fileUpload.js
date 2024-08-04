export const fileUpload = (url = `${import.meta.env.VITE_BASE_URL}/blade-resource/oss/endpoint/put-file`, name, filePath, options) => {
    return new Promise((resolve, reject) => {
        uni.showLoading({ title: "文件上传中", mask: true });
        uni.uploadFile({
            url,
            filePath,
            name,
            ...options,
            success: res => {
                uni.hideLoading();
                const { data: response } = res;
                const { code, data } = JSON.parse(response);
                if (res.statusCode != 200 || code != 200) {
                    uni.showToast({ icon: "none", title: "文件上传失败" });
                    console.error("upload fail:", response);
                    reject("文件上传失败");
                    return;
                }
                console.info("upload success:", response);
                resolve(data);
            },
            complete: () => {},
            fail: arg => {
                uni.showToast({ icon: "none", title: "文件上传失败" });
                console.error("upload fail:", arg);
                reject(arg);
            }
        });
    });
};
