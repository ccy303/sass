import { defineStore } from "pinia";

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

    return { user, setUser, token, setToken };
});
