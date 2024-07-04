import { isArray, isEmpty, isNumber } from "lodash-es";
import { isString } from "lodash-es";

export const getParent = (name, k1, k2) => {
    const { proxy } = getCurrentInstance();
    const d = ref();
    const next = () => {
        let parent = proxy.$parent;
        while (parent) {
            if (parent.$options.name !== name) {
                parent = parent.$parent;
            } else {
                if (isArray(k2)) {
                    nextTick(() => {
                        const child = {};
                        (k2 || []).map(key => proxy[key] && (child[key] = proxy[key]));

                        !parent.__children && (parent.__children = []);

                        !isEmpty(child) && parent.__children.push(child);
                    });
                }

                return (k1 || []).reduce((res, key) => {
                    res[key] = parent[key];
                    return res;
                }, {});
            }
        }
        return parent || d.value;
    };

    return computed(() => next());
};

export const parseRpx = (val, ext = "rpx") => {
    return isArray(val) ? val.map(d => parseRpx(d, ext)).join(" ") : isNumber(val) ? `${val}${ext}` : val;
};

export const getNavHeight = () => {
    const height = computed(() => {
        const { statusBarHeight } = uni.getSystemInfoSync();
        return `${statusBarHeight + 44}`;
    });

    return height;
};

// 是否小数
export const isDecimal = value => {
    return String(value).length - String(value).indexOf(".") + 1 > 0;
};

// uuid
export const uuid = () => {
    const s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
};

// 获取当前颜色
export const getCurrentColor = ({ color, max, value }) => {
    if (isString(color)) {
        return color;
    } else {
        const colorArray = color
            .map((item, index) => {
                if (isString(item)) {
                    return {
                        color: item,
                        value: (index + 1) * (max / color.length)
                    };
                }
                return item;
            })
            .sort((a, b) => a.value - b.value);

        for (let i = 0; i < colorArray.length; i++) {
            if (colorArray[i].value >= value) {
                return colorArray[i].color;
            }
        }

        return colorArray[colorArray.length - 1].color;
    }
};

// 延迟
export const sleep = duration => {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), duration);
    });
};

export const deepMerge = (a, b) => {
    let k;
    for (k in b) {
        a[k] = a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
    }
    return a;
};
