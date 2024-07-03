<template>
    <div class="cui-textarea" :class="[{ 'is-disabled': isDisabled, 'is-count': count, 'is-border': border }]" :style="[baseStyle]">
        <textarea
            class="cui-textarea__inner"
            v-model="value"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :auto-focus="autoFocus"
            :focus="focus"
            :auto-height="autoHeight"
            :fixed="fixed"
            :placeholder-style="placeholderStyleComputed"
            :cursor-spacing="cursorSpacing"
            :cursor="cursor"
            :show-confirm-bar="showConfirmBar"
            :selection-start="selectionStart"
            :selection-end="selectionEnd"
            :adjust-position="adjustPosition"
            :disable-default-padding="disableDefaultPadding"
            :hold-keyboard="holdKeyboard"
            :maxlength="maxlength"
            @focus="onFocus"
            @blur="onBlur"
            @linechange="onLinechange"
            @input="onInput"
            @confirm="onConfirm"
            @keyboardheightchange="onKeyboardheightchange"
        />

        <!-- #ifndef MP-ALIPAY -->
        <span class="cui-textarea__count" v-if="count">{{ value?.length || 0 }}/{{ maxlength }}</span>
        <!-- #endif -->
    </div>
</template>

<script>
    import { useForm, useStyle } from "../../hooks";
    import { keys } from "lodash-es";

    export default defineComponent({
        name: "BaseTextarea",

        props: {
            // 绑定值
            modelValue: { type: String, default: "" },
            // 是否显示统计字数
            placeholder: { type: String, default: "请填写" },
            // 是否禁用
            disabled: { type: Boolean, default: null },
            // 带边框
            border: { type: Boolean, default: true },
            // 统计数字
            count: Boolean,
            // 自动聚焦
            autoFocus: Boolean,
            // 获取焦点
            focus: Boolean,
            placeholderStyle: Object,
            autoHeight: Boolean,
            fixed: Boolean,
            cursorSpacing: { type: Number, default: 0 },
            cursor: Number,
            showConfirmBar: { type: Boolean, default: true },
            selectionStart: { type: Number, default: -1 },
            selectionEnd: { type: Number, default: -1 },
            adjustPosition: { type: Boolean, default: true },
            disableDefaultPadding: { type: Boolean, default: true },
            holdKeyboard: Boolean,
            maxlength: { type: Number, default: 150 }
        },

        emits: ["update:modelValue", "change", "clear", "focus", "blur", "linechange", "confirm", "keyboardheightchange"],

        setup(props, { emit }) {
            const { disabled } = useForm();

            // 绑定值
            const value = ref("");

            watch(
                () => props.modelValue,
                val => {
                    value.value = val;
                },
                { immediate: true }
            );

            // 是否禁用
            const isDisabled = computed(() => disabled.value || props.disabled);

            // 占位符样式
            const placeholderStyle = computed(() => {
                const d = {
                    lineHeight: 1.2,
                    color: "#a8abb2",
                    ...props.placeholderStyle
                };

                return keys(d)
                    .map(k => `${k}:${d[k]};`)
                    .join("");
            });

            const onFocus = e => {
                emit("focus", e);
            };

            const onBlur = e => {
                emit("blur", e);
            };

            const onLinechange = e => {
                emit("linechange", e);
            };

            const onInput = e => {
                emit("update:modelValue", e.detail.value);
            };

            const onConfirm = e => {
                emit("confirm", e);
            };

            const onKeyboardheightchange = e => {
                emit("keyboardheightchange", e);
            };

            return {
                value,
                isDisabled,
                placeholderStyleComputed: placeholderStyle.value,
                onFocus,
                onBlur,
                onLinechange,
                onInput,
                onConfirm,
                onKeyboardheightchange,
                ...useStyle({ height: 150 })
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-textarea {
        @apply relative w-100% bg-#fff box-border;
        border-radius: $cui-border-radius;
        padding: 10rpx $cui-padding;

        &__inner {
            @apply size-100%;
            font-size: $cui-font-size;
            line-height: 1.2;
        }

        &.is-disabled {
            background-color: $cui-color-disabled-bg;
            color: $cui-color-disabled;
        }

        &__count {
            @apply absolute right-5 bottom-5 font-size-12;
            letter-spacing: 1rpx;
            color: $cui-color-info;
        }

        &.is-border {
            border: $cui-border-width solid $cui-border-color;
        }
    }
</style>
