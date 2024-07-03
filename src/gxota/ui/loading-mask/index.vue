<template>
    <div class="cui-loading-mask__wrap">
        <div :class="classs" :style="styles">
            <div class="cui-loading-mask__content" v-show="loading">
                <div class="cui-loading-mask__border">
                    <base-loading :theme="loadingTheme" :color="border ? '#ffffff' : color" :size="60" />
                    <span v-if="text" class="cui-loading-mask__text">{{ text }}</span>
                </div>
            </div>
        </div>

        <slot></slot>
    </div>
</template>

<script>
    export default defineComponent({
        name: "BaseLoadingMask",

        props: {
            // 加载时文本
            text: String,
            // 是否加载中
            loading: Boolean,
            // 加载图标主题
            loadingTheme: String,
            // 是否全屏显示
            fullscreen: Boolean,
            // 加载图标颜色
            color: String,
            // 是否显示静态库
            modal: { type: Boolean, default: true },
            // 是否带边框
            border: Boolean,
            // 背景颜色
            background: { type: String, default: "rgba(255, 255, 255, 0.7)" }
        },

        setup(props) {
            const classs = computed(() => {
                return ["cui-loading-mask", { "is-fullscreen": props.fullscreen, "is-show": props.loading, "is-border": props.border }];
            });
            const styles = computed(() => {
                return { background: props.modal && !props.border ? props.background : "transparent", color: props.color };
            });

            return { classs, styles };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-loading-mask__wrap {
        position: relative;

        .cui-loading-mask {
            position: absolute;
            z-index: $cui-zIndex;
            margin: 0;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;

            &.is-show {
                opacity: 1;
                pointer-events: auto;
            }

            &.is-fullscreen {
                position: fixed;
            }

            &__content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
            }

            &__text {
                font-size: 26rpx;
                margin-top: 16rpx;
                letter-spacing: 1rpx;
                color: $cui-color-primary;
            }

            &__border {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            &.is-border {
                .cui-loading-mask__border {
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 20rpx;
                    width: 200rpx;
                    padding: 40rpx 20rpx;
                }

                .cui-loading-mask__text {
                    color: #fff;
                    margin-top: 30rpx;
                    text-align: center;
                }
            }
        }
    }
</style>
