<template>
    <div
        class="cui-tag"
        :class="[`cui-tag--${type}`, `cui-tag--${size}`, { 'is-plain': plain, 'is-round': round }]"
        :style="[baseStyle, { backgroundColor: color }]"
        @click="tap"
        v-if="visible"
    >
        <slot></slot>
        <base-icon class="cui-tag__close" name="close" v-if="closable" @tap.stop="close"></base-icon>
    </div>
</template>

<script>
    import { useStyle, useTap } from "../../hooks";

    export default defineComponent({
        name: "BaseTag",

        props: {
            // 类型 PropType<"primary" | "success" | "error" | "warning" | "info">
            type: { type: String, default: "primary" },
            // 朴素样式
            plain: Boolean,
            // 标签大小 as PropType<"default" | "small" | "larget">
            size: { type: String, default: "default" },
            // 颜色
            color: String,
            // 是否可关闭
            closable: Boolean,
            // 圆角
            round: Boolean
        },

        emits: ["close"],

        setup(_, { emit }) {
            const { tap } = useTap(emit);

            // 是否可见
            const visible = ref(true);

            // 打开
            const open = () => {
                visible.value = true;
            };

            // 关闭
            const close = () => {
                visible.value = false;
                emit("close");
            };

            return { visible, tap, open, close, ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    @mixin color($color) {
        background-color: $color;

        &.is-plain {
            @apply bg-#fff;
            color: $color;
            border-collapse: $color;
        }
    }

    .cui-tag {
        @apply border-rd-3 color-#fff inline-flex items-center;
        line-height: 1;

        &__close {
            @apply ml-5 relative top-0.5;
        }

        &--default {
            @apply px-10 py-6 font-size-12;
        }

        &--small {
            @apply px-7 py-4 font-size-11;
        }

        &--large {
            @apply px-12 py-8 font-size-13;
        }

        &.is-round {
            @apply border-rd-25;
        }

        &.is-plain {
            border-width: $cui-border-width;
            border-style: solid;
        }

        &--primary {
            @include color($cui-color-primary);
        }

        &--success {
            @include color($cui-color-success);
        }

        &--warning {
            @include color($cui-color-warning);
        }

        &--error {
            @include color($cui-color-error);
        }

        &--info {
            @include color($cui-color-info);
        }
    }
</style>
