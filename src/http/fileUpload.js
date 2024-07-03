export const fileUpload = (url, name, filePath) => {
    return new Promise((resolve, reject) => {
        uni.showLoading({ title: "文件上传中", mask: true });
        uni.uploadFile({
            url,
            filePath,
            name,
            header: {
                Authorization: "Bearer " + uni.getStorageSync("accessToken"),
                clientId: import.meta.env.VITE_CLIENT_ID
            },
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
