import request from "./request";

const URL = import.meta.env.VITE_BASE_URL

// 搜索热词排行榜top10
export const searchHotkeyApi = () => {
    return request.get({ url: `${URL}/minapp/api/pub/search/hotkey`, });
};

// 文物搜索
export const searchRelicApi = data => {
    return request.get({ url: `${URL}/minapp/api/pub/relic/search`, data });
};

// 博物馆搜索
export const searchMuseumApi = data => {
    return request.get({ url: `${URL}/minapp/api/pub/museum/search`, data });
};

// 活动搜索
export const searchActivityApi = data => {
    return request.get({ url: `${URL}/minapp/api/pub/activity/search`, data });
};
