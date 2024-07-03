import { useCommonStore } from "@/stores/common";
import { storeToRefs } from "pinia";
import { logRequest, logReponse } from "./logger";
import { encryptBase64, encryptWithAes, generateAesKey, decryptWithAes, decryptBase64 } from "@/utils/crypto";
import { encrypt, decrypt } from "@/utils/jsencrypt";

const request = async (options, errToast = true) => {
    const accessToken = uni.getStorageSync("accessToken");

    const commonStore = useCommonStore();
    const { location, cityInfo } = storeToRefs(commonStore);

    const config = { ...options };

    // #ifndef H5
    if (!location.value) {
        await commonStore.getLocation();
    }
    if (!cityInfo.value) {
        await commonStore.getCityInfo();
    }
    // #endif
    
    const { isEncrypt } = config.headers || {};

    const headers = {
        clientid: import.meta.env.VITE_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
        tenantId: import.meta.env.VITE_TENANT_ID,
        appId: import.meta.env.VITE_APP_ID,
        lng: location.value?.longitude,
        lat: location.value?.latitude,
        city: encodeURIComponent(cityInfo.value?.city),
        province: encodeURIComponent(cityInfo.value?.province),
        district: encodeURIComponent(cityInfo.value?.district),
        ...config.header
    };

    logRequest({ ...config, header: headers });

    let encryptData = null;

    if (isEncrypt && ["POST", "PUT"].includes(config.method)) {
        const aesKey = generateAesKey();
        headers["encrypt-key"] = encrypt(encryptBase64(aesKey));
        const { data } = config;
        encryptData = typeof data === "object" ? encryptWithAes(JSON.stringify(data), aesKey) : encryptWithAes(data, aesKey);
    }

    return new Promise((resolve, reject) => {
        uni.showLoading({ title: "数据加载中", mask: true });
        uni.request({
            timeout: 60 * 1000,
            dataType: "json",
            withCredentials: true,
            success: res => {
                uni.hideLoading();
                const { data: originalData, header } = res;
                let data = {};
                if (header["encrypt-key"]) {
                    const base64Str = decrypt(header["encrypt-key"]);
                    const aesKey = decryptBase64(base64Str.toString());
                    const decryptData = decryptWithAes(originalData, aesKey);
                    data = JSON.parse(decryptData);
                } else {
                    data = originalData;
                }

                if (data.code != 200) {
                    logReponse(config, res, { type: "error" });
                    errToast !== false && uni.showToast({ icon: "none", title: data.msg || "接口调用失败" });
                    reject(res);
                } else {
                    logReponse(config, res, { type: "success" });
                    let result = {};
                    if (data.rows) {
                        result = { ...data };
                        delete result.code;
                        delete result.msg;
                    } else {
                        result = data.data;
                    }
                    resolve(result);
                }
            },
            fail: arg => {
                logReponse(config, arg, { type: "error" });
                errToast !== false && uni.showToast({ icon: "none", title: "接口请求失败" });
                reject(arg);
            },
            complete: () => {},
            ...config,
            header: headers,
            data: isEncrypt ? encryptData : config.data
        });
    });
};

request.get = (options, errToast) => {
    return request({ ...options, method: "GET" }, errToast);
};

request.post = (options, errToast) => {
    return request({ ...options, method: "POST" }, errToast);
};

request.put = (options, errToast) => {
    return request({ ...options, method: "PUT" }, errToast);
};

request.delete = (options, errToast) => {
    return request({ ...options, method: "DELETE" }, errToast);
};

export default request;
