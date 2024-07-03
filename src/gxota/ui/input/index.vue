<template>
    <div
        class="cui-input"
        :class="[{ 'is-round': round, 'is-border': border, 'is-disabled': isDisabled, 'is-focus': isFocus }]"
        :style="[baseStyle]"
        @click="click"
    >
        <!-- 只读 -->
        <div class="cui-input__readonly" v-if="readonly"></div>

        <!-- 前 -->
        <div class="cui-input__prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>

        <div class="cui-input__wrap">
            <input
                class="cui-input__inner"
                v-model="value"
                :type="type"
                :password="password"
                :placeholder="placeholder"
                :disabled="isDisabled"
                :focus="focus"
                :placeholder-style="placeholderStyles"
                :placeholder-class="placeholderClass"
                :maxlength="maxlength"
                :cursor-spacing="cursorSpacing"
                :confirm-type="confirmType"
                :confirm-hold="confirmHold"
                :adjust-position="adjustPosition"
                :holdKeyboard="holdKeyboard"
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
                @confirm="onConfirm"
                @keyboardheightchange="onKeyboardheightchange"
            />

            <!-- 清空 -->
            <div class="cui-input__clear" v-if="isFocus && clearable && value" @tap="clear">
                <base-icon name="close-border" :size="28"></base-icon>
            </div>
        </div>

        <!-- 后 -->
        <div class="cui-input__append" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
    import { useForm, useStyle, useTap } from "../../hooks";
    import { keys } from "lodash-es";

    export default defineComponent({
        name: "BaseInput",

        props: {
            modelValue: { type: String, default: "" },
            // <"text" | "number" | "idcard" | "digit" | "tel" | "safe-password" | "nickname">
            type: { type: String, default: "text" },
            password: Boolean,
            placeholder: { type: String, default: "请填写" },
            clearable: { type: Boolean, default: true },
            placeholderStyle: Object,
            placeholderClass: String,
            readonly: Boolean,
            disabled: Boolean,
            round: Boolean,
            border: { type: Boolean, default: true },
            focus: Boolean,
            maxlength: { type: [Number, String], default: 140 },
            cursorSpacing: { type: Number, default: 0 },
            confirmType: { type: String, default: "done" },
            confirmHold: Boolean,
            adjustPosition: { type: Boolean, default: true },
            holdKeyboard: { type: Boolean, default: false }
        },
        emits: ["update:modelValue", "change", "focus", "blur", "confirm", "search", "clear", "keyboardheightchange"],

        setup(props, { emit }) {
            const { tap } = useTap(emit);

            const form = useForm();

            // 绑定值
            const value = ref("");

            watch(
                () => props.modelValue,
                val => {
                    value.value = val;
                },
                { immediate: true }
            );

            // 是否聚焦
            const isFocus = ref(props.focus);

            // 是否禁用
            const isDisabled = computed(() => {
                return form.disabled.value || props.disabled;
            });

            // 占位符样式
            const placeholderStyle = computed(() => {
                const d = { lineHeight: 1, color: "#a8abb2", ...props.placeholderStyle };

                return keys(d)
                    .map(k => `${k}:${d[k]};`)
                    .join("");
            });

            // 输入
            const onInput = () => {
                emit("update:modelValue", value.value);
                emit("change", value.value);

                isFocus.value = Boolean(value.value);
            };

            // 聚焦
            const onFocus = e => {
                emit("focus", e);

                if (value.value) {
                    isFocus.value = true;
                }
            };

            // 失焦
            const onBlur = e => {
                emit("blur", e);

                setTimeout(() => {
                    isFocus.value = false;
                }, 0);
            };

            // 按下确认键
            const onConfirm = e => {
                emit("confirm", e);
                search();
            };

            // 按下搜索键
            const search = () => {
                emit("search", value.value);
            };

            // 清空
            const clear = () => {
                value.value = "";
                emit("update:modelValue", "");
                emit("change", "");
                emit("clear");
            };

            // 键盘高度变化
            const onKeyboardheightchange = e => {
                emit("keyboardheightchange", e);
            };

            // 点击
            const click = e => {
                !isDisabled.value && tap(e);
            };

            return {
                value,
                isDisabled,
                isFocus,
                click,
                onInput,
                onFocus,
                onBlur,
                onConfirm,
                search,
                clear,
                onKeyboardheightchange,
                placeholderStyles: placeholderStyle.value,
                ...useStyle({
                    padding: "0 20rpx",
                    fontSize: 26
                })
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-input {
        @apply flex w-100% relative vertical-middle box-border px-10 bg-#fff;
        height: $cui-height;
        border-radius: $cui-border-radius;
        transition: border-color 0.2s;
        font-size: $cui-font-size;

        &--focus {
            border-color: rgba($cui-color-primary, 0.7);
        }

        &__wrap {
            @apply flex items-center flex-1 h-100% relative;
        }

        &__inner {
            @apply h-100% flex-1 border-0 p-0 bg-transparent font-size-inherit;
            outline: none;
        }

        &__prepend,
        &__append {
            @apply flex items-center;
        }

        &__prepend {
            @apply mr-10;
        }

        &__append {
            @apply ml-10;
        }

        &__icon {
            @apply flex-center inline-flex h-100% font-size-17 color-#999 cursor-pointer;
        }

        &__clear {
            @apply flex-center inline-flex ml-10 h-100% font-size-14 relative z-9;
            color: $cui-color-placeholder;
        }

        &__readonly {
            @apply absolute left-0 top-0 size-100% z-2;
        }

        &:not(.is-disabled) {
            -webkit-box-shadow: 0 0 0 1000px transparent inset;
        }

        &--prefix,
        &--suffix {
            @apply flex-shrink-0;
        }

        &--prefix {
            .cui-input__icon {
                @apply mr-10;
            }
        }

        &--suffix {
            .cui-input__icon {
                @apply ml-10;
            }
        }

        &.is-border {
            border: $cui-border-width solid $cui-border-color;
        }

        &.is-disabled {
            background-color: $cui-color-disabled-bg;

            .cui-input__inner {
                color: $cui-color-disabled;
            }
        }

        &.is-round {
            @apply border-rd-50;
        }
    }

    .cui-form-item--error {
        .cui-input__inner {
            border-color: $cui-color-error;
        }
    }
</style>
