import request from "./request";

export const submitCategory = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/save`, data });
};

export const getCategoryList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/list`, data });
};

export const deleteCategory = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/remove?ids=${data.join(",")}` });
};

export const updateCategory = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/update`, data });
};

export const getCategory = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/detail`, data });
};

export const getGoodList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/page`, data });
};

export const getGood = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/detail`, data });
};

export const deleteGood = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/remove?ids=${data.join(",")}` });
};

export const submitGood = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/submit`, data });
};
