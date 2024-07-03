<template>
    <view class="cui-rate">
        <view class="cui-rate__icon" v-for="(item, index) in list" :key="index" @tap="onTap(index)">
            <base-icon :name="icon" :size="size" :color="voidColor"></base-icon>

            <view class="cui-rate__icon-active" :style="{ width: item.width }">
                <base-icon :name="icon" :size="size" :color="item.color"></base-icon>
            </view>
        </view>

        <view class="cui-rate__text" v-if="showText">
            {{ text }}
        </view>
    </view>
</template>

<script>
    import { useForm } from "../../hooks";
    import { getCurrentColor } from "../../utils";
    import { isEmpty } from "lodash-es";

    export default defineComponent({
        name: "BaseRate",

        props: {
            // 绑定值
            modelValue: { type: Number, default: 0 },
            // 评分图标
            icon: { type: String, default: "favor-fill" },
            // 选中颜色，Array下为多色   PropType<string | string[]>
            color: { type: [String, Array], default: "" },
            // 空的颜色
            voidColor: { type: String, default: "#C6D1DE" },
            // 图标大小
            size: { type: [Number, String], default: 40 },
            // 最大值
            max: { type: Number, default: 5 },
            // 是否禁用
            disabled: { type: Boolean, default: null },
            // 显示文本
            showText: { type: Boolean, default: null },
            // 文本组
            texts: { type: Array, default: () => [] }
        },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { disabled } = useForm();

            // 绑定值
            const value = ref(0);

            watch(
                () => props.modelValue,
                val => {
                    value.value = Number(val);
                },
                { immediate: true }
            );

            // 文本内容
            const text = computed(() => {
                return isEmpty(props.texts) ? value.value : props.texts[Math.ceil(value.value) - 1];
            });

            // 列表
            const list = computed(() => {
                return new Array(props.max).fill(1).map((_, i) => {
                    const int = parseInt(String(value.value));
                    const dec = value.value - int;

                    // 处理宽度和颜色
                    return {
                        width: (value.value > i ? (int > i ? 100 : dec * 100) : 0) + "%",
                        color: getCurrentColor({
                            value: value.value,
                            color: props.color,
                            max: props.max
                        })
                    };
                });
            });

            // 点击
            const onTap = index => {
                if (disabled.value || props.disabled) {
                    return false;
                }

                value.value = index + 1;

                emit("update:modelValue", value.value);
                emit("change", value.value);
            };

            return { value, list, text, onTap };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-rate {
        @apply inline-flex items-center;

        &__icon {
            @apply relative mr-5;
            color: $cui-color-primary;
        }

        &__icon-active {
            @apply absolute top-0 left-0 overflow-hidden;
        }

        &__text {
            @apply font-size-13 ml-5;
        }
    }
</style>
