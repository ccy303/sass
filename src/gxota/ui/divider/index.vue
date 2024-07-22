<template>
    <div class="cui-divider">
        <div class="cui-divider__line" :style="{ background: lineColor, width }"></div>

        <div class="cui-divider__text" :style="{ backgroundColor }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { isArray } from "lodash-es";

    export default defineComponent({
        name: "BaseDivider",

        props: {
            // 背景颜色
            backgroundColor: String,
            // 线条颜色
            color: { type: [String, Array], default: "#dcdfe6" },
            // 线条宽度
            width: { type: String, default: "100%" }
        },

        setup(props) {
            const lineColor = computed(() => {
                if (isArray(props.color)) {
                    const [a, b] = props.color || [];
                    return `linear-gradient(to right, ${a}, ${b}, ${b}, ${a})`;
                } else {
                    return props.color;
                }
            });

            return { lineColor };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-divider {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80rpx;
        width: 100%;
        position: relative;
        text-align: center;
        box-sizing: border-box;

        &__line {
            position: absolute;
            height: 1rpx;
            top: 50%;
            left: 50%;
            transform: scaleY(0.5) translateX(-50%) translateZ(0);
        }

        &__text {
            position: absolute;
            left: 50%;
            padding: 10rpx 20rpx;
            color: $cui-color-info;
            font-size: 26rpx;
            transform: translateX(-50%);
            background-color: $cui-color-bg;
            width: fit-content;
        }
    }
</style>
