const request = async (options, errToast = true) => {
  const accessToken = uni.getStorageSync("access_token");

  const config = { ...options };

  const headers = {
    Authorization: "Basic c3dvcmQ6c3dvcmRfc2VjcmV0",
    "Tenant-Id": "000000",
    ...config.header,
  };

  const baseUrl = "http://175.178.88.155:8081";

  console.log(accessToken);

  if (accessToken) {
    headers["Blade-Auth"] = `Bearer ${accessToken}`;
  }

  return new Promise((resolve, reject) => {
    uni.showLoading({ title: "数据加载中", mask: true });
    uni.request({
      timeout: 60 * 1000,
      dataType: "json",
      withCredentials: true,
      success: (res) => {
        uni.hideLoading();
        const { data: originalData } = res;
        let data = {};
        data = originalData;

        if (data.code != 200) {
          errToast !== false && uni.showToast({ icon: "error", title: data.msg || "接口调用失败" });
          reject(res);
        } else {
          let result = {};
          if (data.rows) {
            result = { ...data };
            delete result.code;
            delete result.msg;
          } else {
            result = data.data;
          }
          resolve(result);
        }
      },
      fail: (arg) => {
        errToast !== false && uni.showToast({ icon: "error", title: "接口请求失败" });
        reject(arg);
      },
      complete: () => {},
      ...config,
      url: baseUrl + config.url,
      header: headers,
      data: config.data,
    });
  });
};

request.get = (options, errToast) => {
  return request({ ...options, method: "GET" }, errToast);
};

request.post = (options, errToast) => {
  return request({ ...options, method: "POST" }, errToast);
};

request.put = (options, errToast) => {
  return request({ ...options, method: "PUT" }, errToast);
};

request.delete = (options, errToast) => {
  return request({ ...options, method: "DELETE" }, errToast);
};

export default request;
