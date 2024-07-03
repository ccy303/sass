<template>
    <div class="cui-radio" :class="[classList]" :style="[baseStyle]" @tap.stop="change">
        <slot name="icon" :checked="checked">
            <div class="cui-radio__input" :style="{ height: sizeComputed, width: sizeComputed }">
                <span class="cui-radio__input__text" v-if="checked"></span>
            </div>
        </slot>

        <div class="cui-radio__label">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { useForm, useStyle } from "../../hooks";
    import { getParent, parseRpx } from "../../utils";
    import { isBoolean } from "lodash-es";

    export default defineComponent({
        name: "BaseRadio",

        props: {
            // 绑定值
            modelValue: [String, Number],
            // 标识
            label: [String, Number, Boolean],
            // 是否禁用
            disabled: { type: Boolean, default: null },
            // 是否边框样式
            border: { type: Boolean, default: null },
            // 是否宽度填充
            fill: { type: Boolean, default: null },
            // 是否只显示文字
            text: { type: Boolean, default: null },
            // 是否圆角
            round: { type: Boolean, default: null },
            // 图标大小
            size: [String, Number]
        },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { disabled } = useForm();

            // base-radio-group
            const parent = getParent("BaseRadioGroup", ["modelValue", "disabled", "border", "fill", "size", "text", "round", "change"]);

            // 是否选中
            const checked = ref(false);

            // 监听绑定值变化
            watch(
                () => (parent.value ? parent.value.modelValue : props.modelValue),
                val => {
                    checked.value = val === props.label;
                },
                { immediate: true }
            );

            // 是否禁用
            const isDisabled = computed(() => {
                return disabled.value || (isBoolean(props.disabled) ? props.disabled : parent.value?.disabled);
            });

            // 大小
            const size = computed(() => {
                return parseRpx(props.size || parent.value?.size);
            });

            // 样式
            const classList = computed(() => {
                const d = {
                    "is-disabled": isDisabled.value,
                    "is-checked": checked.value
                };

                ["border", "fill", "text", "round"].forEach(k => {
                    d[`is-${k}`] = isBoolean(props[k]) ? props[k] : parent.value?.[k];
                });

                return d;
            });

            // 值改变
            const change = () => {
                if (isDisabled.value) {
                    return false;
                }

                checked.value = true;

                // 更新 <base-checkbox-group />
                if (parent.value) {
                    parent.value.change(props.label);
                } else {
                    emit("update:modelValue", props.label);
                    emit("change", props.label);
                }
            };

            return { sizeComputed: size, checked, classList, change, ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-radio {
        @apply inline-flex items-center mr-30 relative;
        height: $cui-height;

        &__input {
            @apply flex-center inline-flex color-#fff box-border relative bg-#fff;

            border: $cui-border-width solid $cui-border-color;
            height: $cui-radio-size;
            width: $cui-radio-size;
            border-radius: $cui-radio-size;

            &__text {
                @apply inline-block absolute border-rd-10 size-7;
            }
        }

        &__label {
            @apply font-size-14 ml-8 flex-1 overflow-hidden text-ellipsis;
            line-height: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }

        &.is-checked {
            .cui-radio__input {
                background-color: $cui-color-primary;
                border: $cui-color-primary;
                &__text {
                    @apply bg-#fff;
                }
            }

            &.is-text {
                .cui-radio__label {
                    color: $cui-color-primary;
                }
            }
        }

        &.is-disabled {
            .cui-radio__input {
                background-color: $cui-color-disabled-bg;
                color: $cui-color-disabled;
                &__text {
                    background-color: $cui-color-disabled;
                }
            }

            .cui-radio__label {
                color: $cui-color-disabled;
            }
        }

        &.is-text {
            .cui-radio__input {
                @apply hidden;
            }

            .cui-radio__label {
                @apply ml-0;
            }
        }

        &.is-border {
            @apply border-rd-5 px-10 mr-10 mb-10 box-border;
            border: $cui-border-width solid $cui-border-color;
            line-height: normal;

            &.is-checked {
                border-color: $cui-color-primary;
                color: $cui-color-primary;

                .cui-radio__label {
                    color: $cui-color-primary;
                }
            }
        }

        &.is-round {
            border-radius: $cui-radio-size;
        }

        &.is-fill {
            @apply mr-0 w-100%;
        }
    }

    /* #ifdef MP */
    base-radio {
        @apply inline-flex;
    }

    .cui-radio-group {
        &.is-fill {
            base-radio {
                @apply inline;
            }
        }
    }
    /* #endif */
</style>
