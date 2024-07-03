import request from "./request";

export const getUserInfo = () => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/wechat/user/getUserInfo` }, false);
};

export const login = token => {
    return request.post({
        url: `${import.meta.env.VITE_BASE_URL}/auth/login`,
        data: {
            tenantId: import.meta.env.VITE_TENANT_ID,
            appId: import.meta.env.VITE_APP_ID,
            clientId: import.meta.env.VITE_CLIENT_ID,
            grantType: "xcx",
            xcxCode: token
        },
        headers: { isEncrypt: true }
    });
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

// 分页查询用户收藏藏品列表
export const getUserFavorCollection = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/my/fav/relic/pageList`, data });
};

// 分页查询用户收藏博物馆列表
export const getUserFavorMuseum = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/my/fav/museum/pageList`, data });
};

// 新增小程序用户收藏记录
export const addUserFavor = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/minapp/my/fav/add`, data });
};

// 删除小程序用户收藏记录
export const delUserFavor = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/minapp/my/fav/delete`, data });
};

// 检查收藏
export const checkUserFavor = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/minapp/my/fav/check`, data }, false);
};

// 分页查询用户 场馆预约 信息列表
export const getVenueAppointmentList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserReservation/museum/pageList`, data });
};

//分页查询用户 文博活动预约 信息列表
export const getActivityAppointmentList = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserReservation/optActivity/pageList`, data });
};

// 获取用户预约信息详细信息
export const getAppointmentDetail = id => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserReservation/${id}` });
};

export const cancelAppointment = id => {
    return request.put({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserReservation/cancelReservation/${id}` });
};
