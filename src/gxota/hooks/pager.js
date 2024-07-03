import { onPullDownRefresh, onReachBottom, onUnload } from "@dcloudio/uni-app";
import { useUi } from "../ui/index";

export const usePager = data => {
    const { proxy } = getCurrentInstance();
    const ui = useUi();

    // 分页信息
    const pager = reactive({
        params: {},
        pagination: { page: 1, size: 20, total: 0 },
        list: data,
        loading: false,
        finished: false
    });

    // 事件
    const events = {};

    // 列表
    const list = computed(() => pager.list);

    // 刷新
    const refresh = async params => {
        if (pager.loading) {
            return false;
        }

        if (proxy.refresh) {
            await proxy.refresh(params);
        } else if (proxy.$.exposed.refresh) {
            await proxy.$.exposed.refresh(params);
        } else {
            console.log("use defineExpose({ refresh })");
        }
    };

    // 数据
    const onData = cb => {
        events.onData = cb;
    };

    // 刷新
    const onRefresh = (params, options) => {
        const { clear, loading = true } = options || {};

        // 是否清空
        if (clear) {
            if (params.page == 1) {
                pager.list = [];
                pager.finished = false;
            }
        }

        // 合并请求参数
        Object.assign(pager.params, params);

        const data = { ...pager.pagination, ...pager.params, total: undefined };

        // 是否显示加载动画
        data.page == 1 && loading && ui.showLoading();

        pager.loading = true;

        // 完成
        const done = () => {
            ui.hideLoading();
            pager.loading = false;
        };

        return {
            data,
            done,
            next: req => {
                return new Promise((resolve, reject) => {
                    req.then(res => {
                        // 设置列表数据
                        if (data.page == 1) {
                            pager.list = res.list;
                        } else {
                            pager.list.push(...res.list);
                        }

                        // 追加事件
                        if (events.onData) {
                            events.onData(res.list);
                        }

                        // 是否加载完成
                        pager.finished = pager.list.length === res.pagination.total;
                        // 分页信息
                        pager.pagination = res.pagination;

                        done();
                        resolve(res);
                    }).catch(err => {
                        done();
                        ui.showToast(err.message);
                        reject(err);
                    });
                });
            }
        };
    };

    // 关闭
    const close = () => {
        isReg = false;
        ui.hideLoading();
    };

    // 是否注册，避免在组件中重复注入事件问题
    let isReg = true;

    // 上拉加载
    onReachBottom(() => {
        if (isReg) {
            if (!pager.finished) {
                refresh({ page: pager.pagination.page + 1 });
            }
        }
    });

    // 下拉刷新
    onPullDownRefresh(async () => {
        if (isReg) {
            await refresh({ page: 1 });
            uni.stopPullDownRefresh();
        }
    });

    // 组件销毁
    onUnmounted(close);

    // 离开页面
    onUnload(close);

    return { pager, list, onData, onRefresh, onPullDownRefresh, onReachBottom };
};
