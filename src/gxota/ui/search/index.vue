<template>
    <view class="cui-search" :style="{ padding: parseRpx(padding) }">
        <view class="cui-search__prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </view>

        <view class="cui-search__input" :style="{ height: parseRpx(height) }">
            <view class="cui-search__inner">
                <base-input
                    v-model="value"
                    :height="height"
                    :type="type"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :clearable="clearable"
                    :focus="isFocus"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="placeholderClass"
                    :maxlength="maxlength"
                    :cursor-spacing="cursorSpacing"
                    :confirm-type="confirmType"
                    :confirm-hold="confirmHold"
                    :adjust-position="adjustPosition"
                    :holdKeyboard="holdKeyboard"
                    round
                    @change="onChange"
                    @focus="onFocus"
                    @blur="onBlur"
                    @confirm="onConfirm"
                    @clear="onClear"
                    @keyboardheightchange="onKeyboardheightchange"
                >
                    <template #prepend>
                        <base-icon name="search" />
                    </template>
                </base-input>
            </view>

            <view class="cui-search__btn">
                <base-button type="primary" round :border="false" @tap="search" v-if="showSearchButton">
                    {{ searchButtonText }}
                </base-button>
            </view>
        </view>
        <view class="cui-search__append" v-if="$slots.append">
            <slot name="append"></slot>
        </view>
    </view>
</template>

<script>
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseSearch",

        props: {
            modelValue: { type: String, default: "" },
            // PropType<"text" | "number" | "idcard" | "digit" | "tel" | "safe-password" | "nickname">
            type: { type: String, default: "text" },
            padding: { type: [String, Number], default: "15rpx 20rpx" },
            height: Number,
            password: Boolean,
            placeholder: String,
            placeholderStyle: String,
            placeholderClass: String,
            disabled: Boolean,
            focus: Boolean,
            clearable: { type: Boolean, default: true },
            maxlength: { type: Number, default: 140 },
            cursorSpacing: { type: Number, default: 0 },
            confirmType: { type: String, default: "done" },
            confirmHold: Boolean,
            adjustPosition: { type: Boolean, default: true },
            holdKeyboard: { type: Boolean, default: false },
            searchIcon: { type: String, default: "cl-icon-search" },
            showSearchButton: { type: Boolean, default: true },
            searchButtonText: { type: String, default: "搜索" }
        },

        options: { styleIsolation: "shared" },

        emits: ["update:modelValue", "focus", "blur", "confirm", "keyboardheightchange", "search"],

        setup(props, { emit }) {
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
            const isFocus = ref(false);

            watch(
                () => props.focus,
                val => {
                    isFocus.value = val;
                },
                { immediate: true }
            );

            const onChange = e => {
                emit("update:modelValue", e);
            };

            const onFocus = e => {
                emit("focus", e);
            };

            const onBlur = e => {
                emit("blur", e);
            };

            const onConfirm = e => {
                emit("confirm", e);
                search();
            };

            const onClear = () => {
                search();
            };

            const onKeyboardheightchange = e => {
                emit("keyboardheightchange", e);
            };

            const search = () => {
                emit("search", value.value);
            };

            return { value, isFocus, onChange, onFocus, onBlur, onConfirm, onClear, onKeyboardheightchange, search, parseRpx };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-search {
        @apply flex items-center box-border;

        &__input {
            @apply flex items-center flex-1 relative bg-#fff border-rd-50;
            border: $cui-border-width solid #dcdfe6;

            :deep(.cui-input) {
                @apply flex-1 border-0;
            }
        }

        &__inner {
            @apply h-100% flex-1;
        }

        &__btn {
            :deep(.cui-button) {
                @apply h-28 mr-2 px-17;
            }
        }

        &__prepend,
        &__append {
            @apply flex-center;
        }

        &__prepend {
            @apply mr-10;
        }

        &__append {
            @apply ml-10;
        }
    }
</style>
