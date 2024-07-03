<template>
    <div class="cui-captcha" :class="{ 'is-border': border }">
        <input
            class="cui-captcha__input"
            v-model="value"
            type="number"
            :focus="focus"
            :maxlength="len"
            @focus="onFocus"
            @blur="onBlur"
            @input="onInput"
        />

        <div class="cui-captcha__code">
            <div
                class="cui-captcha__item"
                :style="{ height: parseRpx(height), margin: `0 ${parseRpx(gutter)}`, backgroundColor }"
                v-for="(_, index) in list"
                :key="index"
            >
                <span class="cui-captcha__value">{{ value[index] }}</span>
                <div class="cui-captcha__cursor" v-if="value.length == index && isFocus"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseCaptcha",

        props: {
            // 绑定值
            modelValue: String,
            // 是否自动聚焦
            focus: Boolean,
            // 验证码高度
            height: { type: [String, Number], default: 100 },
            // 验证码位数
            len: { type: Number, default: 4 },
            // 间隔
            gutter: { type: Number, default: 20 },
            // 带边框
            border: Boolean,
            // 背景色
            backgroundColor: { type: String, default: "#ebecee" }
        },

        emits: ["update:modelValue", "done"],

        setup(props, { emit }) {
            const value = ref();

            // 是否聚焦
            const isFocus = ref(props.focus);

            // 头条小程序下，无法 v-for 数字
            const list = computed(() => new Array(props.len).fill(1));

            watch(
                () => props.modelValue,
                val => {
                    value.value = val || "";
                },
                { immediate: true }
            );

            const onFocus = () => {
                isFocus.value = true;
            };

            const onBlur = () => {
                isFocus.value = false;
            };

            const onInput = e => {
                const val = e.detail.value;
                emit("update:modelValue", val);
                val.length === props.len && emit("done", val);
            };

            return { value, isFocus, list, parseRpx, onFocus, onBlur, onInput };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-captcha {
        @apply relative w-100% overflow-hidden;

        &__input {
            @apply relative left--100% h-100% w-200% opacity-0;
        }

        &__code {
            @apply flex w-100%;
        }

        &__item {
            @apply flex justify-center items-center flex-1 border-rd-5;
        }

        &__value {
            @apply font-size-20 font-500;
        }

        &__cursor {
            @apply h-20 w-2 bg-#000;
            animation: flash 1s infinite ease;
        }

        &.is-border {
            .cui-captcha__item {
                border: 2rpx solid $cui-color-primary;
            }
        }

        @keyframes flash {
            0% {
                @apply opacity-20;
            }

            50% {
                @apply opacity-50;
            }

            100% {
                @apply opacity-20;
            }
        }
    }
</style>
