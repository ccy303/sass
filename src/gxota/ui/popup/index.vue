<template>
    <div
        v-if="visible"
        :class="['cui-popup__wrapper', `cui-popup__wrapper--${direction}`, `is-${status ? 'open' : 'close'}`, { 'is-modal': modal }]"
        :style="{ zIndex: cssZIndex }"
        @touchmove.stop.prevent
    >
        <!-- 遮罩层 -->
        <div class="cui-popup__modal" :style="{ background: modalBackground }" @tap="modalClose" v-if="modal"></div>

        <!-- 内容 -->
        <div class="cui-popup" :style="{ height, width, backgroundColor, borderRadius: parseRpx(borderRadius) }">
            <div class="cui-popup__header" v-if="title && showHeader">
                <slot name="header">{{ title }}</slot>
            </div>

            <div class="cui-popup__container" :style="{ padding: parseRpx(padding), paddingTop }">
                <slot></slot>
            </div>

            <div class="cui-popup__close" v-if="status && showCloseBtn" @tap="close">
                <base-icon name="close"></base-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import { parseRpx, getNavHeight } from "../../utils";
    import { useUi } from "../index";

    let id = 1;

    export default defineComponent({
        name: "BasePopup",
        props: {
            // 是否可见
            modelValue: Boolean,
            // 标题
            title: String,
            // 是否显示头部
            showHeader: { type: Boolean, default: true },
            // 弹出方向  "top" | "right" | "bottom" | "center" | "left"
            direction: { type: String, default: "center" },
            // 弹出框宽度
            size: { type: [String, Number], default: "auto" },
            // 內间距
            padding: { type: [String, Number], default: 32 },
            // 弹出框圆角
            borderRadius: [Number, Array, String],
            // 显示关闭按钮
            showCloseBtn: Boolean,
            // 背景色
            backgroundColor: { type: String, default: "#fff" },
            // 是否显示遮罩层
            modal: { type: Boolean, default: true },
            // 遮罩层背景色
            modalBackground: { type: String, default: "rgba(0, 0, 0, 0.4)" },
            // 点击遮罩层是否关闭
            closeOnClickModal: { type: Boolean, default: true },
            // 层级
            zIndex: { type: Number, default: 600 }
        },

        emits: ["update:modelValue", "open", "opened", "close", "closed"],

        setup(props, { emit }) {
            const { statusBarHeight } = uni.getSystemInfoSync();
            // 是否可见
            const visible = ref(false);
            // 是否已打开
            const isOpened = ref(false);
            // 是否已关闭
            const isClosed = ref(true);
            // 动画状态
            const status = ref(false);
            // 层级
            const cssZIndex = ref(0);

            const ui = useUi();
            const h = getNavHeight();

            // 计时器
            let timer;
            // 是否聚焦
            const isFocus = computed(() => {
                // #ifdef MP
                return isOpened.value;
                // #endif

                // #ifndef MP
                // eslint-disable-next-line
                return true;
                // #endif
            });

            // 高
            const height = computed(() => {
                if (["top", "bottom"].includes(props.direction)) {
                    return parseRpx(props.size);
                }
                if (["left", "right"].includes(props.direction)) {
                    return "100%";
                }
                return undefined;
            });

            // 宽
            const width = computed(() => {
                if (["top", "bottom"].includes(props.direction)) {
                    return "100%";
                }
                if (["left", "right", "center"].includes(props.direction)) {
                    return parseRpx(props.size);
                }
                return undefined;
            });

            // 顶部距离
            const paddingTop = computed(() => {
                if (["left", "right", "top"].includes(props.direction)) {
                    let height = statusBarHeight;
                    ui.widthNav && (height += Number(h.value));
                    let [t] = parseRpx(props.padding).split(" ");
                    if (t == "0rpx") {
                        t = "0px";
                    }
                    return `calc(${height}px + ${t})`;
                } else {
                    return 1;
                }
            });

            // 打开
            const open = () => {
                // 层级
                cssZIndex.value = props.zIndex + id++;
                if (!visible.value) {
                    // 显示内容
                    visible.value = true;
                    // 未打开
                    isClosed.value = false;
                    emit("update:modelValue", true);
                    emit("open");
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        // 开始动画
                        status.value = true;
                        // 等待动画结束
                        timer = setTimeout(() => {
                            // 已打开
                            isOpened.value = true;
                            emit("opened");
                        }, 350);
                    }, 50);
                }
            };

            // 关闭
            const close = () => {
                if (status.value) {
                    const done = () => {
                        isOpened.value = false;
                        // 关闭动画
                        status.value = false;
                        emit("close");
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            // 隐藏内容
                            visible.value = false;
                            emit("update:modelValue", false);
                            // 已关闭
                            isClosed.value = true;
                            emit("closed");
                        }, 300);
                    };
                    done();
                }
            };

            // 遮罩层关闭
            const modalClose = () => {
                if (!props.closeOnClickModal) {
                    return false;
                }
                close();
            };

            watch(
                () => props.modelValue,
                val => {
                    val ? open() : close();
                },
                { immediate: true }
            );

            return {
                visible,
                isOpened,
                isClosed,
                isFocus,
                status,
                height,
                width,
                paddingTop,
                cssZIndex,
                parseRpx,
                open,
                close,
                modalClose
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-popup__wrapper {
        @apply fixed top-0 left-0 bottom-0 right-0 opacity-0;
        transition: all 0.3s;
        pointer-events: none;

        &.is-open {
            pointer-events: auto;
            opacity: 1;
            .cui-popup {
                transition: all 0.4s;
                transform: translate(0, 0);
            }
        }

        &::after {
            content: "";
            display: inline-block;
            height: 100%;
            width: 0;
            vertical-align: middle;
        }

        .cui-popup__modal {
            @apply h-100% w-100% absolute top-0 left-0 right-0 bottom-0;
        }

        .cui-popup {
            background-color: #fff;
            position: absolute;
            transition: all 0.3s;
            box-sizing: border-box;

            &__header {
                @apply flex-center line-height-1 font-size-15 h-45 font-500 tracking-0.5;
            }

            &__container {
                height: 100%;
                box-sizing: border-box;
            }

            &__close {
                @apply absolute top-13 right-13 font-size-15 line-height-1;
            }
        }

        &--left {
            .cui-popup {
                @apply top-0 left-0;
                transform: translateX(-100%);
            }
        }

        &--right {
            .cui-popup {
                @apply right-0 top-0;
                transform: translateX(100%);
            }
        }

        &--top {
            .cui-popup {
                @apply left-0 top-0;
                transform: translateY(-100%);
            }
        }

        &--bottom {
            .cui-popup {
                @apply left-0 bottom-0;
                transform: translateY(100%);
            }
        }

        &--center {
            @apply flex-col flex-center;
            .cui-popup {
                transform: scale(1.3);
            }
        }

        &--left,
        &--right,
        &--bottom {
            .cui-popup {
                padding-bottom: env(safe-area-inset-bottom);
            }
        }
    }
</style>
