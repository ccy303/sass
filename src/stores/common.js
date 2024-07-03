import { defineStore } from "pinia";
import { getDict as httpGetDict } from "@/http/home";
import BMapWX from "@/libs/bmap-wx.js";
import { AsyncQueue } from "@/utils/vueuse";

export const useCommonStore = defineStore("commonStore", () => {
    const location = ref(null);
    const cityInfo = ref(null);

    const dict = ref({});

    const dictQueue = new AsyncQueue();
    const cityInfoQueue = new AsyncQueue();

    const _getDict = async types => {
        const res = {};
        const noIndex = [];
        for (let i = 0; i < types.length; i++) {
            if (dict.value[types[i]]) {
                res[types[i]] = dict.value[types[i]];
            } else {
                noIndex.push(types[i]);
            }
        }
        if (noIndex.length) {
            const data = await httpGetDict(noIndex.join(","));
            const dicts = {};
            for (let key in data) {
                dicts[key] = data[key].map(item => ({ label: item.dictLabel, value: item.dictValue }));
                res[key] = dicts[key];
            }
            dict.value = { ...dict.value, ...dicts };
        }
        return res;
    };

    const getDict = async types => {
        const data = await dictQueue.enqueue(_getDict.bind(null, types));
        return data;
    };

    const getDictLabel = async types => {
        const res = {};
        const data = await getDict(types);
        for (let key in data) {
            res[key] = {};
            data[key].map(item => {
                res[key][item.value] = item.label;
            });
        }
        return res;
    };

    const getLocation = async () => {
        const res = await uni.getLocation({ type: "gcj02" });
        location.value = res;
    };

    const _getCityInfo = async () => {
        if (cityInfo.value) {
            return cityInfo.value;
        }
        const BMap = new BMapWX({
            ak: "7AwFpawYgHtk786Rwh9Moj0B4uIgEtLU"
        });
        return new Promise((resolve, reject) => {
            BMap.regeocoding({
                fail: res => {
                    reject("百度SDK位置转化调用失败", res);
                },
                success: res => {
                    const { originalData } = res;
                    const { result } = originalData || {};
                    const { addressComponent } = result || {};
                    cityInfo.value = addressComponent;
                    resolve(cityInfo.value);
                }
            });
        });
    };

    const getCityInfo = async () => {
        const data = await cityInfoQueue.enqueue(_getCityInfo);
        return data;
    };

    return { location, cityInfo, getLocation, getDict, getDictLabel, getCityInfo };
});
