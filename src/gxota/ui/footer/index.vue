<template>
    <div class="cui-footer__wrap">
        <div class="cui-footer__placeholder" :style="{ height: heightStyle, padding: parseRpx(padding) }" v-if="fixed && visible"></div>

        <div
            class="cui-footer"
            :class="{ 'is-border': border, 'is-fixed': fixed }"
            :style="{ backgroundColor, visibility: visible ? 'visible' : 'hidden', bottom: parseRpx(bottom), zIndex }"
        >
            <div class="cui-footer__wrap" :style="{ padding: parseRpx(padding) }">
                <div class="cui-footer__inner" :class="{ 'is-flex': flex }">
                    <slot> </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { parseRpx, sleep } from "../../utils";

    export default defineComponent({
        name: "BaseFooter",

        props: {
            // 背景色
            backgroundColor: { type: String, default: "#fff" },
            // 內间距
            padding: { type: [String, Number], default: "24rpx 36rpx" },
            // 固定高
            height: [String, Number],
            // 层级
            zIndex: { type: Number, default: 99 },
            // 距离底部多少
            bottom: { type: [String, Number], default: 0 },
            // 是否带上边框
            border: Boolean,
            // 是否固定底部定位
            fixed: { type: Boolean, default: true },
            // 是否 flex 布局
            flex: { type: Boolean, default: true },
            // 延迟获取
            delay: { type: Number, default: 0 },
            // 监听对象
            vt: null
        },

        setup(props) {
            const instance = getCurrentInstance();

            // 底部高度
            const height = ref();

            // 是否可见
            const visible = computed(() => {
                return parseInt(height.value) != 0;
            });

            // 重新计算
            const update = async () => {
                if (props.height) {
                    height.value = parseRpx(props.height);
                    return false;
                }

                await sleep(props.delay);
                await nextTick();

                uni.createSelectorQuery()
                    .in(instance?.proxy)
                    .select(".cui-footer__inner")
                    .boundingClientRect(rect => {
                        if (rect) {
                            height.value = Math.floor(rect.height || 0) + "px";
                        }
                    })
                    .exec();
            };

            watch(() => props.vt, update(), { deep: true });

            onMounted(() => {
                update();
            });

            return { heightStyle: height, visible, update, parseRpx };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-footer {
        @apply w-100% relative;

        &__placeholder {
            transition: height 0.3s;
        }

        &__inner {
            & > :deep(base-button) {
                width: 100%;
            }

            &.is-flex {
                @apply flex;
            }
        }

        &.is-border {
            &::before {
                content: "";
                height: $cui-border-width;
                background-color: $cui-color-bg;
                @apply block w-100% absolute top-0 left-0;
            }
        }

        &.is-fixed {
            padding-bottom: env(safe-area-inset-bottom);
            @apply fixed left-0 bottom-0;
        }
    }
</style>
