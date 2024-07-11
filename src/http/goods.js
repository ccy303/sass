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

export const getGoodsList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/list`, data });
};

export const getGoods = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/detail`, data });
}

export const deleteGoods = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/goods/remove?ids=${data.join(",")}` });
}