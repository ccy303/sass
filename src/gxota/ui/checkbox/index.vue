<template>
    <div class="cui-checkbox" :class="[classList]" :style="[baseStyle]" @tap.stop="change">
        <slot name="icon" :checked="checked">
            <div class="cui-checkbox__input" :style="{ height: sizeComputed, width: sizeComputed }">
                <base-icon class="cui-checkbox__input__icon" name="toast-success" :size="24" v-if="checked"></base-icon>
            </div>
        </slot>

        <div class="cui-checkbox__label">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { isArray, isBoolean } from "lodash-es";
    import { getParent, parseRpx } from "../../utils";
    import { useForm, useStyle } from "../../hooks";

    export default defineComponent({
        name: "BaseCheckbox",
        props: {
            // 绑定值
            modelValue: [String, Number, Boolean],
            // 标识
            label: [String, Number, Boolean],
            // 是否禁用
            disabled: { type: Boolean, default: null },
            // 是否边框样式
            border: { type: Boolean, default: null },
            // 是否圆角
            round: { type: Boolean, default: null },
            // 是否只显示文字
            text: { type: Boolean, default: null },
            // 图标大小
            size: [String, Number]
        },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { disabled } = useForm();

            // <base-checkbox-group />
            const parent = getParent("BaseCheckboxGroup", ["modelValue", "round", "border", "fill", "disabled", "size", "text", "onChange"]);
            // 是否选中
            const checked = ref(false);

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

            // 绑定值改变
            const change = () => {
                if (isDisabled.value) {
                    return false;
                }

                checked.value = !checked.value;

                emit("update:modelValue", checked.value);
                emit("change", checked.value);

                // 传递给父组件
                if (parent.value) {
                    parent.value.onChange(props.label);
                }
            };

            // 监听绑定值变化
            watch(
                () => (parent.value ? parent.value.modelValue : props.modelValue),
                val => {
                    if (isArray(val)) {
                        checked.value = val.includes(props.label);
                    } else {
                        checked.value = val;
                    }
                },
                { immediate: true }
            );

            return { sizeComputed: size, checked, classList, change, ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-checkbox {
        @apply inline-flex items-center mr-30 relative;
        height: $cui-height;

        &__input {
            @apply flex-center inline-flex color-#fff relative box-border;
            border: $cui-border-width solid $cui-border-color;
            border-radius: $cui-border-radius;
            height: $cui-checkbox-size;
            width: $cui-checkbox-size;

            &__icon {
                @apply font-size-12 absolute;
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
            .cui-checkbox__input {
                background-color: $cui-color-primary;
                border-color: $cui-color-primary;
                color: #fff;
            }

            &.is-text {
                .cui-checkbox__label {
                    color: $cui-color-primary;
                }
            }
        }

        &.is-disabled {
            .cui-checkbox__input {
                background-color: $cui-color-disabled-bg;
                border-color: transparent;
                color: $cui-color-disabled;
            }

            .cui-checkbox__label {
                color: $cui-color-disabled;
            }
        }

        &.is-text {
            .cui-checkbox__input {
                @apply hidden;
            }

            .cui-checkbox__label {
                @apply ml-0;
            }
        }

        &.is-border {
            @apply px-10 mt-10 mr-10 box-border;
            border-radius: $cui-border-radius;
            border: $cui-border-width solid $cui-border-color;
            line-height: normal;

            &.is-checked {
                color: $cui-color-primary;
                border-color: $cui-color-primary;

                .cui-checkbox__label {
                    color: $cui-color-primary;
                }
            }
        }

        &.is-fill {
            @apply mr-0 w-100%;
        }

        &.is-round {
            border-radius: $cui-checkbox-size;

            .cui-checkbox__input {
                @apply border-rd-100%;
            }
        }
    }

    /* #ifdef MP */
    base-checkbox {
        @apply inline-flex;
    }

    .cui-checkbox-group {
        &.is-fill {
            base-checkbox {
                @apply inline;
            }
        }
    }
    /* #endif */
</style>
