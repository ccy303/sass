<template>
    <div :class="classNames" :style="styles" @click="tap">
        <slot></slot>
    </div>
</template>

<script>
    import { useTap } from "../../hooks";
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseRow",
        props: {
            // 类型
            type: String,
            // 是否换行
            wrap: Boolean,
            // 带边框
            border: String,
            // 列间距
            gutter: { type: Number, default: 0 },
            // 高度
            height: [String, Number],
            // 宽度
            width: [String, Number],
            // 外间距
            margin: [String, Number, Array],
            // 水平对齐 "start" | "center" | "end" | "space-between" | "space-around"
            justify: { type: String, default: "start" },
            // 垂直对齐  "top" | "center" | "bottom"
            align: { type: String, default: "center" }
        },

        setup(props, { emit }) {
            const { tap } = useTap(emit);

            const margin = computed(() => {
                return props.margin ? parseRpx(props.margin) : `0 -${props.gutter / 2}rpx`;
            });

            const classNames = computed(() => {
                return ["cui-row", `cui-row--${props.type}`, `is-justify-${props.justify}`, `is-align-${props.align}`, { "is-wrap": props.wrap }];
            });

            const styles = computed(() => {
                return [
                    {
                        height: parseRpx(props.height),
                        width: parseRpx(props.width),
                        margin: margin.value,
                        border: props.border
                    }
                ];
            });

            return { tap, styles, classNames };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-row {
        @apply relative box-border;

        &::after,
        &::before {
            content: "";
            display: table;
        }

        &::after {
            @apply clear-both;
        }

        &--flex {
            @apply flex;

            &::after,
            &::before {
                @apply hidden;
            }
        }

        &.is-justify-start {
            @apply justify-start;
        }

        &.is-justify-center {
            @apply justify-center;
        }

        &.is-justify-end {
            @apply justify-end;
        }

        &.is-justify-space-between {
            @apply justify-between;
        }

        &.is-justify-space-around {
            @apply justify-around;
        }

        &.is-align-top {
            @apply items-start;
        }

        &.is-align-center {
            @apply items-center;
        }

        &.is-align-bottom {
            @apply items-end;
        }

        &.is-wrap {
            @apply flex-wrap;
        }
    }
</style>
