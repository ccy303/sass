import request from "./request";

// 预约规则详情查询
export const getApponitmentRules = params => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/reservationRule/detail`, data: params });
};

// 新增用户预约信息
export const newApponitment = data => {
    return request.post({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpUserReservation`, data });
};

// 已预约人数查询
export const getApponitmentedNum = data => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/api/reservationRule/remain`, data });
};
