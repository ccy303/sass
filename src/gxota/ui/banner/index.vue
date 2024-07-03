<template>
    <div class="cui-banner" :class="[`cui-banner--${type}`, `cui-banner--dot-${dotType}`]" :style="{ height: parseRpx(height) }" @tap="onTap">
        <swiper
            class="swiper"
            :indicator-dots="indicatorDots"
            :indicator-color="indicatorColor"
            :indicator-active-color="indicatorActiveColor"
            :active-class="activeClass"
            :changing-class="changingClass"
            :autoplay="autoplay"
            :current="current"
            :interval="interval"
            :duration="duration"
            :circular="circularStyle"
            :vertical="vertical"
            :previous-margin="previousMargin"
            :next-margin="nextMargin"
            :acceleration="acceleration"
            :disable-programmatic-animation="disableProgrammaticAnimation"
            :display-multiple-items="displayMultipleItems"
            :skip-hidden-item-layout="skipHiddenItemLayout"
            :disable-touch="disableTouch"
            :easing-function="easingFunction"
            @transition="onTransition"
            @animationfinish="onAnimationfinish"
            @change="onChange"
        >
            <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
                <div class="cui-banner-item" :class="[{ 'is-active': current === index }]">
                    <slot name="item" :item="item" :index="index">
                        <img class="cui-banner-item__image" :style="{ 'border-radius': parseRpx(radius) }" :mode="imageMode" :src="item.url" />
                    </slot>
                </div>
            </swiper-item>
        </swiper>

        <div class="cui-banner__btn" v-if="arrow">
            <button class="button cui-banner__btn-prev" @tap="onPrev" v-if="isPrev">
                <i class="cui-icon-arrow-left"></i>
            </button>
            <button class="button cui-banner__btn-next" @tap="onNext" v-if="isNext">
                <i class="cui-icon-arrow-right"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseBanner",

        props: {
            // 绑定值
            modelValue: Number,
            // 类型 PropType<"chain" | "card" | "">
            type: String,
            // 是否显示切换箭头
            arrow: Boolean,
            list: { type: Array, default: () => [] },
            // 图片裁剪, 缩放模式
            imageMode: { type: String, default: "aspectFill" },
            // 高
            height: { type: [String, Number], default: 300 },
            // 圆角
            radius: { type: [String, Number], default: 10 },
            // 间距
            margin: { type: Array, default: () => [] },
            indicatorDots: { type: Boolean, default: true },
            indicatorColor: { type: String, default: "rgba(0, 0, 0, .3)" },
            indicatorActiveColor: { type: String, default: "#000000" },
            // 指示器类型  PropType<"round" | "circle" | "square">
            dotType: { type: String, default: "round" },
            activeClass: String,
            changingClass: String,
            autoplay: { type: Boolean, default: true },
            currentItemId: String,
            interval: { type: Number, default: 5000 },
            duration: { type: Number, default: 500 },
            circular: Boolean,
            vertical: Boolean,
            acceleration: Boolean,
            disableProgrammaticAnimation: Boolean,
            displayMultipleItems: { type: Number, default: 1 },
            skipHiddenItemLayout: { type: Boolean, default: false },
            disableTouch: Boolean,
            touchable: { type: Boolean, default: true },
            easingFunction: { type: String, default: "default" }
        },

        emits: ["update:modelValue", "change", "select", "transition", "animationfinish"],

        setup(props, { emit }) {
            const current = ref(0);

            watch(
                () => props.modelValue,
                val => {
                    current.value = val || 0;
                },
                { immediate: true }
            );

            // 上一个间距
            const previousMargin = computed(() => {
                let [a, b, c] = props.margin;

                switch (props.type) {
                    case "chain":
                        switch (current.value) {
                            case 0:
                                return a || "0";
                            case (props.list || []).length - 1:
                                return c || "120rpx";
                            default:
                                return b || "70rpx";
                        }
                    case "card":
                        return a || "80rpx";
                    default:
                        return a || "0";
                }
            });

            // 下一个间距
            const nextMargin = computed(() => {
                let [a, b, c] = props.margin;

                switch (props.type) {
                    case "chain":
                        switch (current.value) {
                            case 0:
                                return c || "120rpx";
                            case (props.list || []).length - 1:
                                return a || "0";
                            default:
                                return b || "70rpx";
                        }
                    case "card":
                        return b || "80rpx";
                    default:
                        return b || "0";
                }
            });

            // 是否采用衔接滑动
            const circular = computed(() => {
                switch (props.type) {
                    case "card":
                        return true;
                    default:
                        return props.circular;
                }
            });

            // 是否有上一个
            const isPrev = computed(() => circular.value || current.value > 0);

            // 是否有下一个
            const isNext = computed(() => circular.value || current.value < props.list.length - 1);

            // 监听值变化
            const onChange = e => {
                current.value = e.detail.current;
                emit("update:modelValue", current.value);
                emit("change", current.value);
            };

            // swiper-item 的位置发生改变时会触发
            const onTransition = e => {
                emit("transition", e);
            };

            // 动画结束时会触发
            const onAnimationfinish = e => {
                emit("animationfinish", e);
            };

            // 上一个
            const onPrev = () => {
                current.value -= isPrev.value ? 1 : 0;
            };

            // 下一个
            const onNext = () => {
                current.value += isNext.value ? 1 : 0;
            };

            // 点击，返回序号
            const onTap = () => {
                emit("select", current.value);
            };

            return {
                current,
                isPrev,
                isNext,
                circularStyle: circular,
                previousMargin,
                nextMargin,
                onChange,
                onTransition,
                onAnimationfinish,
                onPrev,
                onNext,
                onTap,
                parseRpx
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-banner {
        @apply relative;

        .swiper,
        .swiper-item {
            @apply h-100%;
        }

        .cui-banner-item {
            @apply flex-center size-100%;

            :deep(view) {
                @apply size-100%;
            }

            :deep(scoped-slots-default) {
                @apply size-100%;
            }

            &__image {
                @apply size-100% border-rd-6;
            }

            &__video {
                @apply size-100%;
            }
        }

        &--card {
            .cui-banner-item {
                @apply w-100%;
                transform: scale(0.95, 0.9);
                transition: all 0.2s ease-in 0s;

                &.is-active {
                    transform: none;
                    transition: all 0.2s ease-in 0s;
                }
            }
        }

        &--chain {
            .cui-banner-item {
                @apply mx-5;
                width: calc(100% - 20rpx);
            }
        }

        &--dot-round {
            // .wx-swiper-dot,
            // .a-swiper-dot,
            // .uni-swiper-dot {
            //     @apply bg-#ddd opacity-60 size-6 border-rd-6 mx-3 border-width-0;
            // }

            // .wx-swiper-dot-active,
            // .a-swiper-dot-active,
            // .uni-swiper-dot-active {
            //     @apply bg-#fff opacity-1 w-13;
            // }
        }

        &--dot-circle {
            // .wx-swiper-dot,
            // .a-swiper-dot,
            // .uni-swiper-dot {
            //     @apply bg-#ddd opacity-50 size-5 border-rd-7 mx-1 border-width-2 border-color-transparent border-solid;
            // }

            // .wx-swiper-dot-active,
            // .a-swiper-dot-active,
            // .uni-swiper-dot-active {
            //     @apply opacity-100;
            //     border-color: $cui-color-primary;
            // }
        }

        &--dot-square {
            // .wx-swiper-dot,
            // .a-swiper-dot,
            // .uni-swiper-dot {
            //     @apply bg-#ddd h-6 w-7 mx-1 border-rd-0;
            // }

            // .wx-swiper-dot-active,
            // .a-swiper-dot-active,
            // .uni-swiper-dot-active {
            //     @apply w-15;
            //     background-color: $cui-color-primary;
            // }
        }

        &__btn {
            .button {
                @apply absolute size-30 border-rd-30 border-0 line-height-30 p-0 m-0 color-#ddd font-size-16;
                top: calc(50% - 30rpx);
                background-color: rgba(0, 0, 0, 0.4);

                &::after {
                    @apply border-0;
                }
            }

            &-prev {
                @apply left-10;
            }

            &-next {
                @apply right-10;
            }
        }
    }
</style>
