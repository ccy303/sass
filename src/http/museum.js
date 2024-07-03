import request from "./request";

export const getPageList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/museum/pageList`, data });
};

export const getDtl = id => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/museum/${id}` });
};
