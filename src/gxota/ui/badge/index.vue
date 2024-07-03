<template>
    <div class="cui-badge" :class="[`cui-badge--${type}`, { 'is-dot': isDot, 'is-plain': plain }]" v-if="$slots.default">
        <slot></slot>
        <text class="cui-badge__content" :style="[baseStyle, { backgroundColor: color }]" v-if="!isShow && ((content && content != 0) || isDot)">
            {{ content }}
        </text>
    </div>
</template>

<script>
    import { isNumber } from "lodash-es";
    import { useStyle } from "../../hooks";

    export default defineComponent({
        name: "BaseBadge",
        props: {
            // 文本内容
            value: [String, Number],
            // 最大值
            max: Number,
            // 是否点状
            isDot: Boolean,
            // 是否隐藏
            isShow: Boolean,
            // 类型  PropType<"primary" | "success" | "warning" | "error">
            type: { type: String, default: "error" },
            // 颜色
            color: String,
            // 朴素
            plain: Boolean
        },

        setup(props) {
            const content = computed(() => {
                if (props.isDot) return "";

                const value = props.value;
                const max = props.max;

                if (isNumber(value) && isNumber(max) && max > 0) {
                    return max < value ? `${max}+` : value;
                }
                return value;
            });

            return { content, ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-badge {
        position: relative;
        vertical-align: middle;
        display: inline-block;
        z-index: 9;

        &__content {
            display: inline-flex;
            height: 24rpx;
            min-width: 12rpx;
            align-items: center;
            justify-content: center;
            text-align: center;
            white-space: nowrap;
            font-size: 16rpx;
            font-weight: bold;
            color: #fff;
            position: absolute;
            top: -12rpx;
            right: -12rpx;
            border: 2rpx solid rgba(255, 255, 255, 0.8);
            border-radius: 32rpx;
            padding: 0 6rpx;
        }

        &.is-dot {
            .cui-badge__content {
                height: 14rpx;
                width: 14rpx;
                padding: 0;
                border-radius: 50%;
                top: -7rpx;
                right: -7rpx;
            }
        }

        @mixin set-color($type, $color) {
            &--#{$type} {
                .cui-badge__content {
                    background-color: $color;
                }

                &.is-plain {
                    .cui-badge__content {
                        background-color: #fff;
                        color: $color;
                        border: $cui-border-width solid currentColor;
                    }
                }
            }
        }

        @include set-color(primary, $cui-color-primary);
        @include set-color(success, $cui-color-success);
        @include set-color(error, $cui-color-error);
        @include set-color(warning, $cui-color-warning);
        @include set-color(info, $cui-color-info);
    }
</style>
