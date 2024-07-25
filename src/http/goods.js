import request from "./request";

export const submitCategory = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/save`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const getCategoryList = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.get({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/list`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const deleteCategory = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/remove?ids=${data.join(",")}`,
        header: { "Tenant-Id": tenant_id }
    });
};

export const updateCategory = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/update`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const getCategory = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.get({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/detail`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const getGoodList = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.get({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/page`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const getGood = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.get({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/detail`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const deleteGood = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/remove?ids=${data.join(",")}`,
        header: { "Tenant-Id": tenant_id }
    });
};

export const submitGood = data => {
    const { tenant_id } = uni.getStorageSync("accountInfo");
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/submit`,
        data,
        header: { "Tenant-Id": tenant_id }
    });
};

export const getCategoryHomeList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/home/list`, data });
};

