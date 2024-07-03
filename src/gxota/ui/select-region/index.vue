<template>
    <view class="cui-select-region">
        <base-select
            mode="multiSelector"
            :model-value="value"
            :options="list"
            :label-key="labelKey"
            :value-key="valueKey"
            :separator="separator"
            :disabled="disabled"
            :border="border"
            set-options-is-parse-value
            @columnChange="onColumnChange"
            @change="onChange"
        />
    </view>
</template>

<script>
    import { isEmpty } from "lodash-es";
    import CityPca from "./city-pca.json";

    let cities = CityPca;

    export default defineComponent({
        name: "BaseSelectRegion",
        props: {
            // 绑定值
            modelValue: Array,
            // 城市数据接口
            api: String,
            // 是否禁用
            disabled: { type: Boolean, default: null },
            // 是否带有边框
            border: { type: Boolean, default: true },
            // 显示关键字
            labelKey: { type: String, default: "name" },
            // 值关键字
            valueKey: { type: String, default: "code" },
            // 分隔符
            separator: { type: String, default: " - " }
        },
        emits: ["update:modelValue", "change"],
        setup(props, { emit }) {
            const list = ref([[], [], []]);
            // 绑定值
            const value = ref([]);
            // 监听值改变
            const onChange = arr => {
                value.value = arr;
                emit("update:modelValue", arr);
                emit("change", arr);
            };

            // 监听更新
            const onUpdate = () => {
                const [x, y, z] = props.modelValue;
                value.value = [x, y, z];

                let a = 0;
                let b = 0;

                if (!x) {
                    a = 0;
                    b = 0;
                } else {
                    a = cities.findIndex(e => e[props.valueKey] == x);

                    if (a >= 0) {
                        b = cities[a].children.findIndex(e => e[props.valueKey] == y);
                    }
                }

                updateList([a, b]);
            };

            // 监听列变化
            const onColumnChange = ({ selects }) => {
                updateList(selects.map(e => (e < 0 ? 0 : e)));
            };

            // 更新列表值
            const updateList = ([a = 0, b = 0]) => {
                if (a < 0) {
                    a = 0;
                }
                if (b < 0) {
                    b = 0;
                }

                list.value = [cities, cities[a].children, cities[a].children[b].children];
            };

            watch(
                () => props.modelValue,
                () => {
                    if (!isEmpty(cities)) {
                        onUpdate();
                    } else {
                        if (props.api) {
                            uni.request({
                                url: props.api,
                                success(res) {
                                    cities = res.data;
                                    onUpdate();
                                }
                            });
                        }
                    }
                },
                { immediate: true }
            );

            return { list, value, onChange, onUpdate, onColumnChange, updateList };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-select-region {
        width: 100%;
    }
</style>
