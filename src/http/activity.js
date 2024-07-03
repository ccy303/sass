import request from "./request";

// 文化展览
export const getPageList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/optActivity/pageList`, data });
};

export const getDtl = id => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/optActivity/${id}` });
};

// 文博活动
export const getWbPageList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/wbActivity/pageList`, data });
};

export const getWbDtl = id => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/wbActivity/${id}` });
};