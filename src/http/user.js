import request from "./request";

export const login = code => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-system/user/getToken`, data: { code } });
};

export const beTenant = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-system/tenant/activate`, data });
};
