import request from "./request";

export const getUserInfo = () => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/wechat/user/getUserInfo` }, false);
};

export const login = code => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-system/user/getToken`, data: { code } });
};

export const beTenant = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/blade-system/tenant/activate`, data });
};

export const bingPhone = data => {
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/minapp/wechat/user/bindPhone`,
        data
    });
};

export const editUserInfo = data => {
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/minapp/wechat/user/editUserInfo`,
        data
    });
};
