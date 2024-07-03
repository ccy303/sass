import { parseRpx } from "../utils";
import { fromPairs } from "lodash-es";
import { getParent } from "../utils";

// 点击
export const useTap = emit => {
    const tap = e => {
        // #ifdef MP-WEIXIN
        emit("click", e);
        // #endif

        // #ifdef MP-ALIPAY || H5
        emit("tap", e);
        // #endif
    };
    return { tap };
};

// 表单
export const useForm = () => {
    const form = getParent("BaseForm", ["disabled"]);
    const disabled = computed(() => form.value?.disabled);
    return { disabled };
};

export const useStyle = (data = {}) => {
    const styles = [
        { key: "padding", rpx: true },
        { key: "margin", rpx: true },
        { key: "height", rpx: true },
        { key: "width", rpx: true },
        { key: "font-size", rpx: true },
        { key: "fontSize", rpx: true },
        { key: "border-radius", alias: ["radius"], rpx: true },
        { key: "background-color" },
        { key: "backgroundColor" },
        { key: "background" },
        { key: "custom-style" }
    ];

    const instance = getCurrentInstance();
    // 基础样式
    const baseStyle = computed(() => {
        return fromPairs(
            styles
                .map(e => {
                    // keys
                    const keys = [e.key, ...(e.alias || [])];
                    // val
                    const val = keys
                        .map(k => {
                            // 标签值
                            const a = instance?.proxy?.$attrs[k];
                            // 默认值
                            const b = data[k];
                            // 判定值
                            return a !== undefined ? a : b;
                        })
                        .find(e => e !== undefined);
                    // 是否需要 rpx 解析
                    return [e.key, e.rpx ? parseRpx(val) : val];
                })
                // 过滤空值
                .filter(e => e[1] !== undefined)
        );
    });
    return { baseStyle };
};

export const useRefs = () => {
    const refs = reactive({});
    const setRefs = name => {
        return el => {
            refs[name] = el;
        };
    };
    return { refs, setRefs };
};
