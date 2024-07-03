import request from "./request";

export const getAdvertList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/wx/index/getAdvertList`, data });
};

export const getDict = types => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/dict/getByDictTypes`, data: { types } });
};

export const getTotalInfo = () => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/pub/count` });
};

export const getCityInfo = (data = { code: 450000 }) => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/district/getByParentCode` });
};
