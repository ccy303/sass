import request from "./request";

export const create = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/shop/save`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const list = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.get({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/shop/list`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const dtl = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.get({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/shop/detail`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const getAdminShopModules = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.get({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/homepagemodules/getModules`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const saveAdminShopModules = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/homepagemodules/saveOrUpdateModules`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const getHomePageModules = data => {
    return request.get({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/homepagemodules/getModules`,
        data
    });
};
