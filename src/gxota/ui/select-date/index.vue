<template>
    <view class="cui-select-date" @tap="open">
        <slot :value="modelValue" :label="modelValue">
            <base-select-inner
                :height="height"
                :placeholder="placeholder"
                :disabled="disabled"
                :border="border"
                :round="round"
                :backgroundColor="backgroundColor"
                :borderRadius="borderRadius"
                arrowIcon="time"
                :padding="padding"
                :text="text"
            />
        </slot>
    </view>

    <!-- 弹出框 -->
    <base-select-popup :ref="setRefs('popup')" :title="title" :show-picker="false">
        <template #list>
            <view class="cui-select-date__wrap">
                <picker-view :value="value" class="cui-select-date__picker" @change="onChange">
                    <picker-view-column v-for="(c, ci) in columns" :key="ci">
                        <view class="cui-select-date__picker-item" v-for="(item, index) in c.list" :key="index"> {{ item }}{{ c.unit }} </view>
                    </picker-view-column>
                </picker-view>
            </view>
        </template>

        <template #confirm>
            <base-button type="primary" size="large" round fill @tap="confirm">选择</base-button>
        </template>
    </base-select-popup>
</template>

<script>
    import { range } from "lodash-es";
    import moment from "moment";
    import { useRefs } from "../../hooks";
    import { Props } from "../select-inner/config";

    export default defineComponent({
        name: "BaseSelectDate",

        props: {
            ...Props,
            // 绑定值
            modelValue: String,
            // 标题
            title: { type: String, default: "选择日期" },
            // 开始年
            startYear: { type: Number, default: 2000 },
            // 模式  <("year" | "month" | "date" | "hour" | "minute" | "second")[]>
            mode: { type: Array, default: () => ["year", "month", "date", "hour", "minute", "second"] },
            // 格式化值
            format: { type: String, default: "YYYY-MM-DD HH:mm:ss" },
            // 格式化显示内容
            displayFormat: Function,
            // 开始时间
            start: String,
            // 结束时间
            end: String,
            // 占位文本
            placeholder: { type: String, default: "请选择时间" }
        },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { refs, setRefs } = useRefs();

            // 选中日期
            const date = ref();

            // picker 绑定值
            const value = ref([]);

            // 显示文本
            const text = computed(() => {
                return props.displayFormat ? props.displayFormat(props.modelValue) : props.modelValue;
            });

            // 列数据
            const columns = computed(() => {
                const years = range(props.startYear, props.startYear + 50);
                const months = range(1, 13);

                // 当前月多少天
                const ed = getDate(date.value).endOf("month").date();
                const days = range(1, ed + 1);

                const hours = range(24);
                const minutes = range(60);
                const seconds = range(60);

                // 格式化
                const d = {
                    year: { list: years, unit: "年" },
                    month: { list: months, unit: "月" },
                    date: { list: days, unit: "日" },
                    hour: { list: hours, unit: "时" },
                    minute: { list: minutes, unit: "分" },
                    second: { list: seconds, unit: "秒" }
                };

                return props.mode.map(k => d[k]);
            });

            // 获取时间
            const getDate = val => {
                let a = moment();

                if (val) {
                    let b = val.split(/\D+/g);
                    props.mode.forEach((k, i) => {
                        let v = Number(b[i]);
                        k == "month" && (v -= 1);
                        a = a.set(k, v);
                    });
                }

                return a;
            };

            // 设置值
            const setDate = (val, isChange = true) => {
                date.value = val || undefined;

                // 日期
                const d = getDate(date.value);

                // 取下标
                const arr = props.mode.map((k, i) => {
                    let v = d[k]?.();

                    k == "month" && (v += 1);

                    return columns.value[i].list.findIndex(e => e == v);
                });

                // 清空，避免 value 重复不刷新
                value.value = props.mode.map(() => 0);

                nextTick(() => {
                    value.value = arr;

                    // 触发监听
                    if (isChange) {
                        onChange({ detail: { value: arr } });
                    }
                });
            };

            // 监听选择
            const onChange = e => {
                value.value = e.detail.value;
                let d = moment();
                // 设置值
                props.mode.forEach((k, i) => {
                    let v = value.value[i];
                    k == "year" && (v += props.startYear);

                    if (k == "date") {
                        v += 1;

                        const ed = d.endOf("month").date();

                        v > ed && (v = ed);
                    }

                    d = d.set(k, v);
                });

                date.value = d.format(props.format);

                // 小于开始时间
                if (props.start) {
                    if (d.isBefore(moment(getDate(props.start)))) {
                        setDate(props.start, false);
                    }
                }

                // 大于结束时间
                if (props.end) {
                    if (d.isAfter(moment(getDate(props.end)))) {
                        setDate(props.end, false);
                    }
                }
            };

            // 保存
            const confirm = () => {
                emit("update:modelValue", date.value);
                emit("change", date.value);
                close();
            };

            // 打开
            const open = () => {
                setDate(props.modelValue);
                refs.popup.open();
            };

            // 关闭
            const close = () => {
                refs.popup.close();
            };

            return { date, columns, value, text, setDate, confirm, onChange, refs, setRefs, open, close };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-select-date {
        &__picker {
            @apply h-250;

            &-item {
                @apply flex-center font-size-16;
            }
        }
    }
</style>
