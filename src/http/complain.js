import request from "./request";

export const getPageList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserComplaint/list`, data });
};

export const getDtl = id => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserComplaint/${id}` });
};

export const addComplain = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserComplaint`, data });
};
