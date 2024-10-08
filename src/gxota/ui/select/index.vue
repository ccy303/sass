<template>
    <picker
        class="cui-select__wrap"
        :mode="mode"
        :value="index"
        :range="options"
        :range-key="rangeKey"
        :disabled="disabled"
        :end="end"
        :start="start"
        :fields="fields"
        @change="onChange"
        @columnchange="onColumnChange"
        @cancel="onCancel"
    >
        <slot :label="text" :value="index">
            <base-select-inner
                :height="height"
                :placeholder="placeholder"
                :disabled="disabled"
                :border="border"
                :round="round"
                :backgroundColor="backgroundColor"
                :borderRadius="borderRadius"
                :arrowIcon="arrowIcon"
                :padding="padding"
                :text="text"
            />
        </slot>
    </picker>
</template>

<script>
    import { parseRpx } from "../../utils";
    import { isArray, isEmpty } from "lodash-es";
    import { Props } from "../select-inner/config";

    export default defineComponent({
        name: "BaseSelect",

        props: {
            // 绑定值
            modelValue: null,
            // 模式  PropType<"selector" | "multiSelector" | "region" | "time" | "date">
            mode: { type: String, default: "selector" },
            // 选项列表  PropType<{ label: string; value: any }[]>
            options: { type: Array, default: () => [] },
            labelKey: { type: String, default: "label" },
            valueKey: { type: String, default: "value" },
            separator: { type: String, default: "/" },
            // PropType<"year" | "month" | "day">
            fields: { type: String, default: "day" },
            // 开始时间
            start: String,
            // 结束时间
            end: String,
            // 默认选中第一个
            defaultFirstOption: { type: Boolean, default: true },
            // 设置选项列表时是否解析值
            setOptionsIsParseValue: Boolean,
            ...Props
        },

        emits: ["update:modelValue", "confirm", "change", "column-change", "cancel"],

        setup(props, { emit }) {
            // 选中下标
            const index = ref();

            // 文本
            const text = ref("");

            // key
            const rangeKey = computed(() => (props.mode == "region" ? "" : props.labelKey));

            // 解析值
            const parse = val => {
                // 取下标
                index.value = (() => {
                    switch (props.mode) {
                        // 返回下标
                        case "selector":
                            return props.options.findIndex(e => String(e[props.valueKey]) == String(val));
                        // 返回数组
                        case "multiSelector":
                            return (isArray(val) ? val : [val]).map((v, i) => {
                                return props.options[i].findIndex(e => String(e[props.valueKey]) == String(v));
                            });
                        default:
                            return val;
                    }
                })();

                // 取文本值
                text.value = (() => {
                    switch (props.mode) {
                        case "selector":
                            return props.options[index.value] ? props.options[index.value][props.labelKey] : "";
                        case "multiSelector":
                            return index.value
                                .filter(v => v >= 0)
                                .map((v, i) => props.options[i][v][props.labelKey])
                                .join(props.separator);
                        case "region":
                            console.warn("请使用 base-select-region 代替");
                            return index.value;
                        default:
                            return index.value;
                    }
                })();
            };

            // 监听值
            const onChange = ({ detail }) => {
                if (detail.value < 0 || detail.value === undefined) {
                    return false;
                }

                // 返回的完整数据
                let data = null;

                // 返回的唯一数据
                let value = null;

                switch (props.mode) {
                    case "selector":
                        data = props.options[detail.value];
                        value = data ? data[props.valueKey] : null;
                        break;
                    case "multiSelector":
                        data = detail.value.map(v => (v < 0 ? 0 : v)).map((v, i) => props.options[i][v]);
                        value = data.map(e => e[props.valueKey]);
                        break;
                    default:
                        value = detail.value;
                }

                emit("update:modelValue", value);
                emit("confirm", data);
                emit("change", value);
            };

            // 监听列
            const onColumnChange = ({ detail }) => {
                index.value = index.value.map((v, i) => (i < detail.column ? v : i === detail.column ? detail.value : 0));

                emit("column-change", { ...detail, selects: index.value });
            };

            // 取消
            const onCancel = () => {
                emit("cancel");
            };

            watch(() => props.modelValue, parse, { immediate: true });

            watch(
                () => props.options,
                arr => {
                    // 避免重复设置 options 异常问题
                    if (!props.setOptionsIsParseValue) {
                        parse(props.modelValue);
                    }

                    // 为空时，默认返回列表第一个
                    if (!isEmpty(arr) && props.defaultFirstOption) {
                        if (index.value === undefined || index.value < 0 || index.value === "" || index.value === null) {
                            emit("update:modelValue", arr[0][props.valueKey]);
                        }
                    }
                },
                {
                    immediate: true
                }
            );

            return { index, text, rangeKey, parse, onChange, onColumnChange, onCancel, parseRpx };
        }
    });
</script>

<style lang="scss" scoped></style>
