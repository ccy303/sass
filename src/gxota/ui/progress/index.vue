<template>
    <div class="cui-progress">
        <div class="cui-progress-bar" v-if="type === 'line'">
            <div class="cui-progress-bar__outer" :style="{ height: parseRpx(strokeWidth), backgroundColor: unColor }">
                <div class="cui-progress-bar__inner" :style="{ backgroundColor, width }"></div>
            </div>
        </div>

        <slot name="text">
            <div class="cui-progress__text" v-if="showText">
                <template v-if="!status">{{ value }}%</template>
                <base-icon :size="30" v-else :name="icon" />
            </div>
        </slot>
    </div>
</template>

<script>
    import { parseRpx, getCurrentColor } from "../../utils";

    export default defineComponent({
        name: "BaseProgress",

        props: {
            // 绑定值
            value: { type: Number, default: 0, required: true },
            // 类型
            type: { type: String, default: "line" },
            // 线条宽度
            strokeWidth: { type: Number, default: 12 },
            // 是否显示文本
            showText: { type: Boolean, default: true },
            // 线条颜色, 支持多色   PropType<string | string[]>
            color: { type: [String, Array], default: "" },
            // 未选中颜色
            unColor: { type: String, default: "#ebeef5" },
            // 状态
            status: Boolean,
            // 尾部图标
            icon: String
        },

        setup(props) {
            // 宽度
            const width = computed(() => {
                if (props.value > 100) {
                    return "100%";
                } else if (props.value < 0) {
                    return 0;
                } else {
                    return `${props.value}%`;
                }
            });

            // 背景颜色
            const backgroundColor = computed(() => {
                return getCurrentColor({
                    value: props.value,
                    color: props.color,
                    max: 100
                });
            });

            return { parseRpx, width, backgroundColor };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-progress {
        @apply flex items-center min-h-17;

        &-bar {
            @apply box-border flex-1;

            &__outer {
                @apply border-rd-25 overflow-hidden relative;
            }

            &__inner {
                @apply absolute left-0 top-0 h-100% text-right border-rd-25 whitespace-nowrap;
                background-color: $cui-color-primary;
                transition: width 0.6s ease;
            }
        }

        &__text {
            @apply inline-block h-17 w-50 line-height-17 color-#606266 font-size-12 text-left ml-5;
        }

        &.is-success {
            .cui-progress-bar__inner {
                background-color: $cui-color-success;
            }

            .cui-progress__text {
                color: $cui-color-success;
            }
        }

        &.is-warning {
            .cui-progress-bar__inner {
                background-color: $cui-color-warning;
            }

            .cui-progress__text {
                color: $cui-color-warning;
            }
        }

        &.is-error {
            .cui-progress-bar__inner {
                background-color: $cui-color-error;
            }

            .cui-progress__text {
                color: $cui-color-error;
            }
        }
    }
</style>
