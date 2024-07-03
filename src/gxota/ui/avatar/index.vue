<template>
    <view :class="['cui-avatar', `cui-avatar--${shape}`]" :style="[{ height: parseRpx(size), width: parseRpx(size) }, baseStyle]" @click="tap">
        <slot v-if="$slots.default || $slots.$default"> </slot>

        <template v-else>
            <slot name="placeholder" v-if="!src">
                <view class="cui-avatar__placeholder">
                    <base-icon name="my" :size="parseRpx(size / 2)" v-if="!name"></base-icon>
                    <span :style="{ fontSize: parseRpx(size / 2) }" v-else> {{ name[0] }}</span>
                </view>
            </slot>

            <slot name="error" v-else-if="isError">
                <view class="cui-avatar__error"> Error </view>
            </slot>

            <image class="cui-avatar__target" :src="src" :mode="mode" :lazy-load="lazyLoad" @error="handleError" @load="handleLoad" v-else />
        </template>
    </view>
</template>

<script>
    import { useStyle, useTap } from "../../hooks";
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseAvatar",

        props: {
            // 图片地址
            src: String,
            // 名称
            name: { type: String, default: "" },
            // 懒加载
            lazyLoad: Boolean,
            // 头像大小
            size: { type: Number, default: 80 },
            // 形状   PropType<"circle" | "square">
            shape: { type: String, default: "circle" },
            // 裁剪模式
            mode: { type: String, default: "scaleToFill" }
        },

        emits: ["error", "load"],

        setup(_, { emit }) {
            // 是否加载失败
            const isError = ref(false);

            // 处理加载
            const handleLoad = e => {
                isError.value = false;
                emit("load", e);
            };

            // 处理错误
            const handleError = e => {
                isError.value = true;
                emit("error", e);
            };

            return { isError, handleLoad, handleError, ...useTap(emit), ...useStyle(), parseRpx };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-avatar {
        @apply flex-center overflow-hidden box-border;
        font-size: $cui-font-size;

        &--circle {
            @apply border-rd-100%;
        }

        &--square {
            @apply border-rd-5;
        }

        &__placeholder {
            @apply flex-center color-#fff;
            background-color: $cui-color-disabled;
        }

        &__error {
            @apply flex-center inline-flex text-center color-#fff;
            background-color: $cui-color-placeholder;
        }

        &__target,
        &__placeholder,
        &__error {
            @apply size-100%;
        }
    }
</style>
