import request from "./request";

export const getPageList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserComment/list`, data });
};

export const getDtl = id => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserComment/${id}` });
};

export const addComment = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserComment`, data });
};
