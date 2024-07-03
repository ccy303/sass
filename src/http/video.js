import request from "./request";

export const getVideoCover = ({ filePath, framesLength = 5 }) => {
    return request.get({ url: `${import.meta.env.VITE_BASE_URL}/minapp/mpVideoHandle/videoCover?filePath=${filePath}&framesLength=${framesLength}`, });
};