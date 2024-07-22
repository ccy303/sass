<template>
    <div class="cui-scroller__wrap">
        <div class="cui-scroller__loading" :style="{ transform, transition }">
            <slot name="loading" :text="text" :status="status" :move="touch.move">
                <base-loading :size="40" v-if="status == 'loading'"></base-loading>
                <base-text :size="26" :margin="[0, 0, 0, 14]" :value="text"></base-text>
            </slot>
        </div>

        <div class="cui-scroller" :style="{ transform, transition }" @touchmove="onTouchMove" @touchstart="onTouchStart" @touchend="onTouchEnd">
            <scroll-view
                class="cui-scroller__view"
                scroll-y
                :lower-top="bottom"
                :scroll-top="scrollTop2"
                :scroll-into-view="scrollIntoView"
                :scroll-with-animation="scrollWithAnimation"
                :enable-back-to-top="enableBackToTop"
                :show-scrollbar="showScrollbar"
                :enable-flex="enableFlex"
                @scroll="onScroll"
                @scrolltolower="up"
            >
                <slot></slot>
            </scroll-view>
        </div>

        <!-- 回到顶部 -->
        <div class="cui-scroller__back-top" :class="[{ fadeIn: backTopButtonFadeIn }]" @tap="backTop" v-if="showBackTopButton">
            <base-icon name="top" color="#666"></base-icon>
            <span class="cui-scroller__back-top-text">顶部</span>
        </div>
    </div>
</template>

<script>
    export default defineComponent({
        name: "BaseSticky",
        props: {
            // 距离顶部多少px触发
            top: { type: Number, default: 80 },
            // 距离底部多少px触发
            bottom: { type: Number, default: 100 },
            // 正在刷新文案
            loadingText: { type: String, default: "正在刷新" },
            // 下拉刷新文案
            pullingText: { type: String, default: "下拉刷新" },
            // 释放刷新文案
            releaseText: { type: String, default: "释放刷新" },
            // 滚动条距离顶部位置
            scrollTop: Number,
            // 滚动到对应元素id
            scrollIntoView: String,
            // 滚动是否动画
            scrollWithAnimation: { type: Boolean, default: true },
            // 点击回顶部
            enableBackToTop: Boolean,
            // 是否显示返回顶部按钮
            showBackTopButton: { type: Boolean, default: true },
            // 是否显示滚动条
            showScrollbar: Boolean,
            // 开启 flex 布局
            enableFlex: Boolean,
            // 开启刷新
            refresherEnabled: { type: Boolean, default: true }
        },

        emits: ["down", "up", "scroll"],

        setup(props, { emit }) {
            const { proxy } = getCurrentInstance();

            // 按下
            const touch = reactive({ start: 0, move: 0 });

            // 滚动距离
            const scrollTop2 = ref(0);

            watch(
                () => props.scrollTop,
                val => {
                    scrollTop2.value = val || 0;
                },
                { immediate: true }
            );

            // 回到顶部
            const backTopButtonFadeIn = ref(false);

            // 状态
            const status = ref("end");

            // 过渡效果
            const transform = computed(() => {
                return touch.move ? `translate3d(0, ${touch.move}px, 0)` : "";
            });

            // 动画
            const transition = computed(() => {
                return ["end", "loading"].includes(status.value) ? "transform 0.3s" : "";
            });

            // 是否可释放
            const isReleasable = computed(() => touch.move >= props.top);

            //文案
            const text = computed(() => {
                switch (status.value) {
                    case "pulling":
                        return isReleasable.value ? props.releaseText : props.pullingText;
                    case "loading":
                        return props.loadingText;
                    default:
                        return props.pullingText;
                }
            });

            // 滚动开始
            const onTouchStart = e => {
                if (status.value == "end" && props.refresherEnabled) {
                    touch.start = e.changedTouches[0].clientY;
                    status.value = "pulling";
                }
            };

            // 滚动中
            const onTouchMove = e => {
                if (status.value == "pulling" && scrollTop2.value <= 10) {
                    let offset = e.changedTouches[0].clientY - touch.start;

                    if (offset <= 200) {
                        touch.move = offset;
                    }
                }
            };

            // 滚动结束
            const onTouchEnd = () => {
                if (isReleasable.value) {
                    down();
                } else {
                    end();
                }
            };

            // 滚动监听
            const onScroll = e => {
                backTopButtonFadeIn.value = e.detail.scrollTop >= 200;
                emit("scroll", e);
            };

            // 下拉刷新
            const down = () => {
                uni.createSelectorQuery()
                    .in(proxy)
                    .select(".cui-scroller__loading")
                    .fields({ size: true }, d => {
                        status.value = "loading";
                        touch.move = d.height || 0;
                        emit("down");
                    })
                    .exec();
            };

            // 上拉加载
            const up = () => {
                emit("up");
            };

            // 收起，结束
            const end = () => {
                status.value = "end";
                touch.move = 0;
            };

            // 滚动到
            const scrollTo = top => {
                scrollTop2.value = top;
            };

            // 回到顶部
            const backTop = () => {
                scrollTop2.value = Math.random();
            };

            return {
                touch,
                scrollTop2,
                backTopButtonFadeIn,
                status,
                transform,
                transition,
                isReleasable,
                text,
                onScroll,
                onTouchStart,
                onTouchMove,
                onTouchEnd,
                down,
                up,
                end,
                scrollTo,
                backTop
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-scroller__wrap {
        @apply relative h-100% overflow-hidden;
    }

    .cui-scroller {
        @apply h-100%;

        &__loading {
            @apply flex-center w-100% absolute left-0 bottom-100% min-h-50;
        }

        &__view {
            @apply h-100%;
        }

        &__back-top {
            @apply flex flex-col justify-center items-center absolute right-15 bottom-50 size-40 border-rd-40 opacity-0 z-99;
            background-color: rgba(255, 255, 255, 0.8);
            border: $cui-border-width solid #ddd;
            transform: translateX(160rpx);
            transition: all 0.3s;

            &.fadeIn {
                transform: translateX(0);
                opacity: 1;
            }

            &-text {
                @apply font-size-10 color-#444 mt--2;
            }
        }
    }
</style>
