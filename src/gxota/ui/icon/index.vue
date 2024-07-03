<template>
    <span :class="['cui-icon', className || `cui-icon-${name}`, `is-${color}`]" :style="[{ ...baseStyle, fontSize: parseRpx(size), color }]"></span>
</template>

<script>
    import { parseRpx } from "../../utils";
    import { useStyle } from "../../hooks";
    export default defineComponent({
        name: "BaseIcon",
        props: {
            // 图标名称
            name: String,
            // 自定义图标名称
            className: String,
            // 图标大小
            size: { type: [String, Number], default: 30 },
            // 图标颜色
            color: String
        },
        setup() {
            return { parseRpx, ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    @import "../iconfont/index.scss";
    .cui-icon {
        @apply inline-flex items-center;

        &.is-primary {
            color: $cui-color-primary;
        }

        &.is-success {
            color: $cui-color-success;
        }

        &.is-warning {
            color: $cui-color-warning;
        }

        &.is-error {
            color: $cui-color-error;
        }

        &.is-info {
            color: $cui-color-info;
        }
    }
</style>
