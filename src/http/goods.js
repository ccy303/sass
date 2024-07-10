import request from "./request";

export const createCategory = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/save`, data });
};

export const getCategoryList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/list`, data });
};

export const deleteCategory = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/remove?ids=${data.join(",")}` });
};
