import request from "./request";

export const createCategory = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/blade-mall/category/save`, data });
};
