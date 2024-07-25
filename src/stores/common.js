import { defineStore } from "pinia";

export const useCommonStore = defineStore("commonStore", () => {
    const shopTenantId = ref(null);

    const setShopTenantId = id => {
        shopTenantId.value = id;
        uni.setStorageSync("shopTenantId", id);
    };

    return { shopTenantId, setShopTenantId };
});
