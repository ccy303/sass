import { defineStore } from "pinia";

export const useCommonStore = defineStore("commonStore", () => {
    const shopTenantId = ref(null);
    const loaded = ref(false);
    const homeModules = ref(null);
    const shopId = ref(null);
    const deskNo = ref(null);

    const setLoaded = () => {
        loaded.value = true;
    };

    const setHomeModules = modules => {
        homeModules.value = modules;
    };

    const setShopTenantId = id => {
        shopTenantId.value = id;
        uni.setStorageSync("shopTenantId", id);
    };

    const setShopId = id => {
        shopId.value = id;
        uni.setStorageSync("shopId", id);
    };

    const setDeskNo = id => {
        deskNo.value = id;
        uni.setStorageSync("deskNo", id);
    };

    return { shopId, shopTenantId, loaded, homeModules, setShopTenantId, setLoaded, setHomeModules, setShopId, setDeskNo };
});
