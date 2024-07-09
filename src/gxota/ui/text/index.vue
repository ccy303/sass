<template>
    <div :class="classNames" :style="[{ ...styles, ...baseStyle }]" @click="tap">
        <!-- 前缀图标 -->
        <base-icon class="cui-text__prefix-icon" :name="prefixIcon" v-if="prefixIcon" />

        <!-- 价格 -->
        <span class="cui-text__symbol--price" v-if="type == 'price'">￥</span>

        <!-- 文本 -->
        <div class="cui-text__value" :style="{ '-webkit-line-clamp': ellipsis }">
            <slot>{{ text.value }}</slot>
        </div>

        <!-- 小数 -->
        <span class="cui-text__precision" v-if="type == 'price' && precision">.{{ text.precision }}</span>

        <!-- 后缀图标 -->
        <base-icon class="cui-text__suffix-icon" :name="suffixIcon" v-if="suffixIcon"></base-icon>
    </div>
</template>

<script>
    import { useTap, useStyle } from "../../hooks";
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseText",

        props: {
            // 内容
            value: { type: [String, Number], default: "" },
            // 类型  PropType<"text" | "price" | "phone">
            type: { type: String, default: "text" },
            // 手机号是否加密
            encrypt: { type: Boolean, default: true },
            // 是否粗体
            bold: Boolean,
            // 是否块状
            block: Boolean,
            // 文本超出省略
            ellipsis: { type: Number, default: 0 },
            // 字体颜色
            color: { type: String, default: "#444" },
            // 字体大小
            size: [String, Number],
            // 文字对齐 "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
            align: { type: String, default: "left" },
            // 价格小数点
            precision: { type: Boolean, default: true },
            // 穿过文本下的一条线
            lineThrough: Boolean,
            // 行高
            lineHeight: { type: [String, Number], default: 1 },
            // 文本下的一条线
            underline: Boolean,
            // 文本水平间隔
            letterSpacing: { type: [String, Number], default: 0 },
            // 顶部图标
            prefixIcon: String,
            // 尾部图标
            suffixIcon: String,
            // 是否能复制
            copy: Boolean
        },

        setup(props, { emit }) {
            const { tap } = useTap(emit);

            const text = computed(() => {
                if (props.type == "price") {
                    const [value, precision = "00"] = parseFloat(String(props.value) || "0")
                        .toFixed(2)
                        .split(".");

                    if (props.precision) {
                        return { value, precision };
                    } else {
                        return { value };
                    }
                } else if (props.type == "phone") {
                    const str = String(props.value);

                    return { value: props.encrypt ? str.substr(0, 3) + "****" + str.substr(7) : str };
                } else {
                    return { value: props.value };
                }
            });

            const classNames = computed(() => {
                return [
                    `cui-text`,
                    `is-${props.type}`,
                    `is-color-${props.color}`,
                    {
                        "is-bold": props.bold,
                        "is-block": props.block,
                        "is-line-through": props.lineThrough,
                        "is-underline": props.underline,
                        "is-ellipsis": props.ellipsis > 0,
                        "is-copy": props.copy
                    }
                ];
            });

            const styles = computed(() => {
                return {
                    color: props.color,
                    textAlign: props.align,
                    lineHeight: props.lineHeight,
                    fontSize: parseRpx(props.size),
                    letterSpacing: parseRpx(props.letterSpacing)
                };
            });

            return { text, tap, classNames, styles, ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-text {
        @apply inline-flex items-center break-all;
        white-space: normal;
        word-wrap: break-word;
        font-size: $cui-font-size;

        &.is-bold {
            @apply font-700;
        }

        &.is-block {
            @apply block;
        }

        &.is-line-through {
            text-decoration: line-through;
        }

        &.is-underline {
            .cui-text__value {
                text-decoration: underline;
            }
        }

        &.is-ellipsis {
            .cui-text__value {
                @apply overflow-hidden text-ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }
        }

        &.is-copy {
            user-select: text;
        }

        &.is-price {
            align-items: baseline;
        }

        &.is-color-primary {
            color: $cui-color-primary !important;
        }

        &.is-color-success {
            color: $cui-color-success !important;
        }

        &.is-color-error {
            color: $cui-color-error !important;
        }

        &.is-color-warning {
            color: $cui-color-warning !important;
        }

        &.is-color-info {
            color: $cui-color-info !important;
        }

        &__value {
            @apply inline;
        }

        &__symbol--price,
        &__precision {
            @apply font-size-12;
        }

        &__prefix-icon {
            @apply mr-5;
        }

        &__suffix-icon {
            @apply ml-5;
        }

        &__prefix-icon,
        &__suffix-icon {
            @apply font-size-15;
        }
    }
</style>
