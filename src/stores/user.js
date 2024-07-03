import { defineStore } from "pinia";
import { getUserInfo as httpGetUserInfo } from "@/http/user";

export const useUserStore = defineStore("userStore", () => {
    const user = ref(null);
    const token = ref(null);

    const setUser = info => {
        user.value = info;
        if (!info) {
            return uni.removeStorageSync("accountInfo");
        } else {
            uni.setStorageSync("accountInfo", info);
        }
    };

    const setToken = tokenStr => {
        token.value = tokenStr;
        if (!tokenStr) {
            return uni.removeStorageSync("accessToken");
        } else {
            uni.setStorageSync("accessToken", tokenStr);
        }
    };

    const getUserInfo = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const accountInfo = await httpGetUserInfo();
                setUser(accountInfo);
                resolve(accountInfo);
            } catch (err) {
                reject(err);
            }
        });
    };

    return { user, setUser, token, setToken, getUserInfo };
});
