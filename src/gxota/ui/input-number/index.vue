<template>
    <div class="cui-input-number" :class="{ 'is-disabled': isDisabled, 'disabled-plus': !isPlus, 'disabled-minus': !isMinus }">
        <!-- 减 -->
        <div class="cui-input-number__minus" @tap="onMinus">
            <base-icon name="minus" :size="30"></base-icon>
        </div>

        <!-- 值 -->
        <div class="cui-input-number__value" @tap="onFocus">
            <span class="text unit" v-if="unit">{{ unit }}</span>
            <span class="text num">{{ value }}</span>
            <span class="text unit" v-if="unit">{{ unit }}</span>

            <input class="input" :type="inputType" v-model="value" :disabled="isDisabled" :focus="isFocus" :style="[inputStyle]" @blur="onBlur" />
        </div>

        <!-- 加 -->
        <div class="cui-input-number__plus" @tap="onPlus">
            <base-icon name="plus" :size="30"></base-icon>
        </div>
    </div>
</template>

<script>
    import { useForm } from "../../hooks";
    import { isDecimal, parseRpx } from "../../utils";
    import { isString } from "lodash-es";

    export default defineComponent({
        name: "BaseInputNumber",

        props: {
            // 绑定值
            modelValue: [String, Number],
            // 步进
            step: { type: Number, default: 1 },
            // 最大值
            max: { type: Number, default: 100 },
            // 最小值
            min: { type: Number, default: 0 },
            // 数值精度
            precision: Number,
            // 是否禁用
            disabled: Boolean,
            // 单位
            unit: String,
            // 输入框样式
            inputStyle: { type: Object, default: () => ({}) }
        },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { disabled } = useForm();

            // 绑定值
            const value = ref(0);

            // 输入框类型
            const inputType = computed(() => {
                return props.precision ? "digit" : "number";
            });

            // 是否禁用
            const isDisabled = computed(() => disabled.value || props.disabled);

            // 可以加
            const isPlus = computed(() => {
                return props.max === undefined ? true : value.value < props.max;
            });

            // 可以减
            const isMinus = computed(() => {
                return props.min === undefined ? true : value.value > props.min;
            });

            // 验证值
            const check = val => {
                if (val === undefined) {
                    val = value.value;
                }

                // 是否字符
                if (isString(val)) {
                    val = Number(val);
                }

                // 是否小数
                if (isDecimal(val)) {
                    val = Number(val.toFixed(props.precision || 0));
                }

                // 最小
                if (val < props.min) {
                    val = props.min;
                }

                // 最大
                if (val > props.max) {
                    val = props.max;
                }

                // 最小不能超过最大
                if (props.min > props.max) {
                    val = props.max;
                }

                value.value = val;
            };

            // 更新值
            const update = () => {
                check();
                emit("update:modelValue", value.value);
                emit("change", value.value);
            };

            // 加
            const onPlus = () => {
                if (!isDisabled.value) {
                    value.value += props.step;

                    if (value.value > props.max) {
                        value.value = props.max;
                    }

                    update();
                }
            };

            // 减
            const onMinus = () => {
                if (!isDisabled.value) {
                    value.value -= props.step;

                    if (value.value < props.min) {
                        value.value = props.min;
                    }

                    update();
                }
            };

            // 是否显示输入框
            const isFocus = ref(false);

            // 聚焦
            const onFocus = () => {
                isFocus.value = true;
            };

            // 失焦
            const onBlur = () => {
                isFocus.value = false;
                update();
            };

            watch(() => props.modelValue, check, { immediate: true });

            // 监听最大最小值变化
            watch(() => props.max, update);
            watch(() => props.min, update);

            return { value, isDisabled, isPlus, isMinus, inputType, onPlus, onMinus, onBlur, onFocus, isFocus, parseRpx };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-input-number {
        @apply inline-flex items-center;
        height: $cui-input-number-size;
        line-height: 1;

        &__plus,
        &__minus {
            @apply inline-flex items-center justify-center bg-#fff;
            height: $cui-input-number-size;
            width: $cui-input-number-size;
            border-radius: $cui-input-number-size;

            .text {
                @apply font-size-14 font-bold;
            }

            &:active {
                @apply opacity-80;
            }
        }

        &__plus {
            background-color: $cui-color-primary;
            color: #fff;
        }

        &__value {
            @apply flex-center h-100% font-size-14 text-center relative mx-10;
            color: $cui-color-primary;

            .input {
                @apply size-100% absolute top-0 left-0 font-size-inherit bg-#fff;
            }

            .unit {
                @apply font-size-10 relative z-9;

                &:nth-child(1) {
                    @apply opacity-0;
                }
            }

            .num {
                @apply mx-10 invisible;
            }
        }

        &.is-disabled {
            .cui-input-number__plus,
            .cui-input-number__minus {
                background-color: $cui-color-disabled-bg;
                color: $cui-color-disabled;
            }
            .cui-input-number__value {
                color: $cui-color-disabled;
            }
        }

        &.disabled-plus {
            .cui-input-number__plus {
                background-color: $cui-color-disabled-bg;
                color: $cui-color-disabled;
            }
        }

        &.disabled-minus {
            .cui-input-number__minus {
                background-color: $cui-color-disabled-bg;
                color: $cui-color-disabled;
            }
        }
    }
</style>
