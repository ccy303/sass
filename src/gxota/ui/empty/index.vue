<template>
    <div class="cui-empty" :class="{ 'is-fixed': fixed }" :style="[baseStyle]">
        <img class="cui-empty__icon" :src="`/static/empty/${icon}.png`" :style="{ height: parseRpx(iconSize) }" mode="aspectFit" v-if="showIcon" />

        <span class="cui-empty__text" v-if="text">{{ text }}</span>

        <div class="cui-empty__container" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { useStyle } from "../../hooks";
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseEmpty",

        props: {
            // 图标
            icon: { type: String, default: "comm" },
            // 图标大小
            iconSize: [String, Number],
            // 暂无数据文案
            text: { type: String, default: "暂无数据" },
            // 是否固定
            fixed: { type: Boolean, default: true },
            // 是否显示图标
            showIcon: { type: Boolean, default: true }
        },

        setup() {
            return { ...useStyle({ height: "100%" }), parseRpx };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-empty {
        @apply flex-center flex-col pointer-events-none;

        &__icon {
            @apply h-80 mb-10;
        }

        &__text {
            @apply font-size-14 tracking-0.5;
            color: $cui-color-info;
        }

        &__container {
            @apply mt-30;
            pointer-events: all;
        }

        &.is-fixed {
            @apply fixed left-0 top-0 size-100%;
        }
    }
</style>
