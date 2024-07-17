import request from "./request";

export const create = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/shop/save`, data });
};

export const list = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/shop/list`, data });
};

export const dtl = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/shop/detail`, data });
};

export const getAdminShopModules = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/homepagemodules/getModules`, data });
};
