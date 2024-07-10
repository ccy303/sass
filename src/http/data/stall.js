import request from "@/api/request";

export const create = (data) => {
  return request.post({ url: "/blade-mall/shop/save", data });
};

export const list = (data) => {
  return request.get({ url: "/blade-mall/shop/list", data });
};

export const dtl = (data) => {
  return request.get({ url: "/blade-mall/shop/detail", data });
};
