<template>
    <div class="cui-noticebar" :class="[{ 'is-scrollable': scrollable }]" :style="{ color, backgroundColor }" v-if="visible">
        <base-icon name="close-border" :size="34" :margin="[0, 10, 0, 0]" @tap="close" v-if="closeable" />

        <slot name="icon">
            <base-icon :name="icon" :size="34" :margin="[0, 10, 0, 0]" v-if="icon" />
        </slot>

        <div class="cui-noticebar__box">
            <div
                class="cui-noticebar__scroller"
                :class="[`is-${direction}`]"
                :style="{
                    height: parseRpx(height),
                    top: scroll.top + 'px',
                    left: scroll.left + 'px',
                    transition,
                    transform: `translateX(-${scroll.translateX}px)`
                }"
            >
                <div class="cui-noticebar__item" v-for="(item, index) in list" :key="index">
                    <span class="cui-noticebar__text">{{ item }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { isArray } from "lodash-es";
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseNoticebar",

        props: {
            // 文本内容
            text: { type: [String, Array], default: "", required: true },
            // 方向  PropType<"horizontal" | "vertical">
            direction: { type: String, default: "horizontal" },
            // 字体颜色
            color: String,
            // 背景颜色
            backgroundColor: String,
            // 能否滚动
            scrollable: Boolean,
            // 滚动时长
            duration: { type: Number, default: 10 },
            // 能否关闭
            closeable: Boolean,
            // 左侧图标
            icon: String,
            // 高度
            height: { type: [String, Number], default: 40 }
        },

        emits: ["close"],

        setup(props, { emit }) {
            const { proxy } = getCurrentInstance();

            // 是否可见
            const visible = ref(true);

            // 滚动配置
            const scroll = reactive({ left: 0, top: 0, translateX: 0, duration: 0 });

            // 计时器
            let timer = null;

            // 文案列表
            const list = computed(() => (isArray(props.text) ? props.text : [props.text]));

            // 动画过度
            const transition = computed(() => {
                return props.direction == "horizontal" ? `transform ${scroll.duration}s linear` : `top 0.3s`;
            });

            // 刷新
            const refresh = () => {
                if (props.scrollable) {
                    // 清除定时器
                    clear();

                    // 获取盒子大小
                    uni.createSelectorQuery()
                        .in(proxy)
                        .select(`.cui-noticebar__box`)
                        .boundingClientRect(box => {
                            // 获取文本大小
                            uni.createSelectorQuery()
                                .in(proxy)
                                .select(`.cui-noticebar__text`)
                                .boundingClientRect(text => {
                                    const duration = props.duration * 1000;

                                    // 水平滑动
                                    if (props.direction == "horizontal") {
                                        const fn = () => {
                                            scroll.duration = props.duration;
                                            scroll.left = box.width;
                                            scroll.translateX = text.width + scroll.left;

                                            timer = setTimeout(() => {
                                                scroll.translateX = 0;
                                                scroll.duration = 0;

                                                setTimeout(fn, 500);
                                            }, duration);
                                        };

                                        fn();
                                    }
                                    // 垂直滑动
                                    else {
                                        timer = setInterval(() => {
                                            if (Math.abs(scroll.top) >= box.height * (list.value.length - 1)) {
                                                scroll.top = 0;
                                            } else {
                                                scroll.top -= box.height;
                                            }
                                        }, duration);
                                    }
                                })
                                .exec();
                        })
                        .exec();
                }
            };

            // 关闭
            const close = () => {
                clear();
                visible.value = false;
                emit("close");
            };

            // 清空
            const clear = () => {
                clearInterval(timer);
                clearTimeout(timer);
                timer = null;
            };

            onMounted(() => {
                refresh();
            });

            onUnmounted(() => {
                clear();
            });

            return { visible, scroll, list, transition, refresh, close, clear, parseRpx };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-noticebar {
        @apply flex items-center;

        &__box {
            @apply flex-1 overflow-hidden;
        }

        &__scroller {
            @apply relative;

            &.is-vertical {
                @apply transition-top transition-duration-300 flex-col;

                .cui-noticebar__text {
                    @apply block overflow-hidden text-ellipsis whitespace-nowrap;
                }
            }

            &.is-horizontal {
                @apply flex items-center;
            }
        }

        &__item {
            @apply flex items-center h-100%;
        }

        &__text {
            @apply font-size-13;
            line-height: 1;
        }

        &.is-scrollable {
            .cui-noticebar__text {
                @apply whitespace-nowrap;
            }
        }
    }
</style>
