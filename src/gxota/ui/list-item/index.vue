<template>
    <div
        class="cui-list-item"
        :class="[itemClass]"
        :style="[baseStyle]"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @click="tap"
    >
        <div class="cui-list-item__swiper" :style="{ transform }">
            <div class="cui-list-item__container">
                <div class="cui-list-item__icon" v-if="$slots.icon">
                    <slot name="icon"></slot>
                </div>

                <span class="cui-list-item__label" v-if="label && label != 'true'">{{ label }}</span>

                <div class="cui-list-item__content" :class="contentClass">
                    <slot></slot>
                </div>

                <div class="cui-list-item__append">
                    <slot name="append">
                        <base-icon v-if="arrowIcon" name="arrow-right"></base-icon>
                    </slot>
                </div>
            </div>

            <template v-if="swipe">
                <div :class="[`cui-list-item__menu-${swipe}`]">
                    <slot name="menu"></slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import { isBoolean } from "lodash-es";
    import { useTap, useStyle } from "../../hooks";
    import { getParent } from "../../utils";

    export default defineComponent({
        name: "BaseListItem",
        props: {
            // 标签内容
            label: String,
            // 类型   PropType<"primary" | "success" | "error" | "warning" | "info">
            type: String,
            // 水平排序   PropType<"start" | "end" | "center">
            justify: String,
            // 是否滑动   PropType<"left" | "right">
            swipe: String,
            // 是否禁用
            disabled: { type: Boolean, default: null },
            // 是否带有下边框
            border: { type: Boolean, default: null },
            // 是否显示右侧箭头
            arrowIcon: { type: Boolean, default: true }
        },

        setup(props, { slots, emit }) {
            const instance = getCurrentInstance();

            // <base-list />
            const parent = getParent("BaseList", ["justify", "border", "disabled"]);

            // 是否禁用
            const isDisabled = computed(() => {
                return isBoolean(props.disabled) ? props.disabled : parent.value?.disabled;
            });

            // 样式
            const itemClass = computed(() => {
                return [
                    {
                        "is-disabled": isDisabled.value,
                        "is-append": !!slots.append,
                        "is-swipe": !!props.swipe,
                        "is-border": isBoolean(props.border) ? props.border : parent.value?.border
                    }
                ];
            });

            // 内容样式
            const contentClass = computed(() => {
                const list = [];

                if (props.type) {
                    list.push(`is-color-${props.type}`);
                }

                return [`is-color-${props.type}`, `is-justify-${props.justify || parent.value?.justify || "end"}`];
            });

            // 触摸
            const touch = reactive({ start: 0, end: 0, x: 0, maxX: 0, direction: "left", lock: true });

            // 滑动菜单
            const menu = reactive({
                width: 0
            });

            // 横向位置移动
            const transform = computed(() => {
                return props.swipe ? `translateX(${touch.x}px)` : "none";
            });

            // 滑动开始
            const onTouchStart = e => {
                if (props.swipe) {
                    touch.start = e.touches[0].pageX;
                    touch.lock = false;
                }
            };

            // 滑动中
            const onTouchMove = e => {
                const { start, end, lock, maxX } = touch;

                if (!lock) {
                    // 滑动距离
                    const offsetX = e.touches[0].pageX - start;

                    // 移动方向
                    touch.direction = offsetX > 0 ? "right" : "left";

                    // 偏移距离
                    let x = end + offsetX;

                    if (props.swipe == "left") {
                        if (x > maxX) {
                            x = maxX;
                        }

                        if (x < 0) {
                            x = 0;
                        }
                    }

                    if (props.swipe == "right") {
                        if (x < maxX) {
                            x = maxX;
                        }

                        if (x > 0) {
                            x = 0;
                        }
                    }

                    touch.x = x;
                }
            };

            // 滑动结束
            const onTouchEnd = () => {
                const { direction, x, end, lock, maxX } = touch;
                const sw = menu.width / 2 > 50 ? 50 : menu.width / 2;

                if (!lock) {
                    if (Math.abs(x - end) > sw) {
                        if (direction === props.swipe) {
                            touch.x = 0;
                        } else {
                            touch.x = maxX;
                        }

                        touch.end = touch.x;
                    } else {
                        touch.x = end === 0 ? 0 : maxX;
                    }

                    touch.lock = true;
                }
            };

            // 设置菜单宽度
            const setMenu = () => {
                if (props.swipe) {
                    const query = uni.createSelectorQuery().in(instance?.proxy);

                    query
                        .select(`.cui-list-item__menu-${props.swipe}`)
                        .boundingClientRect(data => {
                            if (data) {
                                menu.width = data.width || 0;
                                touch.maxX = menu.width * (props.swipe === "right" ? -1 : 1);
                            }
                        })
                        .exec();
                }
            };

            // 滑动后还原位置的方法
            const restore = cb => {
                touch.start = 0;
                touch.end = 0;
                touch.lock = true;
                touch.x = 0;

                if (cb) {
                    setTimeout(() => {
                        cb();
                    }, 300);
                }
            };

            // 重新设置滑动菜单
            watch(() => props.swipe, setMenu);

            onMounted(() => {
                setMenu();
            });

            return {
                itemClass,
                contentClass,
                touch,
                menu,
                transform,
                restore,
                onTouchStart,
                onTouchMove,
                onTouchEnd,
                ...useTap(emit),
                ...useStyle()
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-list-item {
        @apply flex items-center relative bg-#fff;
        background-color: #fff;

        &.is-append {
            .cui-list__content {
                @apply mr-10;
            }
        }

        &.is-disabled {
            background-color: $cui-color-disabled-bg;
            color: $cui-color-disabled;

            &:after {
                @apply block absolute top-0 left-0 right-0 bottom-0;
                content: "";
            }
        }

        &.is-border {
            border-bottom: $cui-border-width solid #f6f7fa;
        }

        &.is-swipe {
            @apply overflow-hidden;
        }

        &__icon,
        &__label,
        &__append {
            @apply flex-shrink-0;
            line-height: 1;
        }

        &__label,
        &__content,
        &__append {
            @apply flex items-center min-h-40 text-13;
        }

        &__swiper {
            @apply flex items-center w-100% transition-all transition-duration-300;
        }

        &__container {
            @apply flex items-center w-100% box-border;
            padding: 0 $cui-padding;
        }

        &__icon {
            @apply mr-10;
        }

        &__label {
            @apply pr-10 text-14;
        }

        &__content {
            @apply py-5 flex-1;

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

            &.is-color-primary {
                color: $cui-color-primary;
            }

            &.is-color-success {
                color: $cui-color-success;
            }

            &.is-color-warning {
                color: $cui-color-warning;
            }

            &.is-color-error {
                color: $cui-color-error;
            }
        }

        &__menu-left {
            @apply h-100% absolute transition-left transition-duration-300 flex items-center;
            transform: translateX(-100%);
        }

        &__menu-right {
            @apply h-100% absolute right--0.5 transition-left transition-duration-300 flex items-center;
            transform: translateX(100%);
        }
    }
</style>
