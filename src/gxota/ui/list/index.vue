<template>
    <div class="cui-list" :style="[baseStyle]">
        <slot></slot>
    </div>
</template>

<script>
    import { useStyle } from "../../hooks";

    export default defineComponent({
        name: "BaseList",

        options: { styleIsolation: "shared" },

        props: {
            // 水平布局方式 PropType<"start" | "end" | "center">
            justify: String,
            // 是否禁用
            disabled: Boolean,
            // 是否带有下边框
            border: { type: Boolean, default: true }
        },

        setup() {
            return { ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-list {
        @apply mb-10 overflow-hidden relative;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
