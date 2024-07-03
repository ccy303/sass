<template>
    <button
        :class="classs"
        :style="[baseStyle, { color }]"
        :size="size"
        :disabled="disabled || loading"
        :form-type="formType"
        :open-type="openType"
        :hover-class="hoverClass"
        :hover-start-time="hoverStartTime"
        :hover-stay-time="hoverStayTime"
        :app-parameter="appParameter"
        :hover-stop-propagation="hoverStopPropagation"
        :lang="lang"
        :session-form="sessionForm"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        @getphonenumber="getPhoneNumber"
        @getuserinfo="getUserInfo"
        @error="error"
        @opensetting="openSetting"
        @launchapp="launchApp"
        @click="click"
    >
        <!-- 加载框 -->
        <div v-if="loading" mr-10 class="cui-button__loading">
            <base-loading :size="32" :color="loadingColor" :theme="loadingTheme" v-if="loading" />
        </div>
        <!-- 图标 -->
        <div class="cui-button__icon" v-if="icon">
            <image class="image" :src="icon" mode="aspectFit" v-if="isImg" />
            <base-icon :name="icon"></base-icon>
        </div>

        <!-- 本文 -->
        <div class="cui-button__text" :style="{ color }">
            <slot></slot>
        </div>
    </button>
</template>

<script>
    import { useTap, useStyle } from "../../hooks";

    export default defineComponent({
        name: "BaseButton",
        props: {
            // 按钮大小 "large" | "default" | "small"
            size: { type: String, default: "default" },
            // 按钮类型 "default" | "primary" | "success" | "danger" | "warning" | "info"
            type: { type: String, default: "default" },
            // 是否朴素
            plain: Boolean,
            // 是否禁用
            disabled: Boolean,
            // 是否加载
            loading: Boolean,
            // 加载图标主题
            loadingTheme: String,
            // 加载图标颜色
            loadingColor: String,
            // 是否圆角
            round: Boolean,
            // 是否带有边框
            border: { type: Boolean, default: true },
            // 图标
            icon: String,
            // 水平填充
            fill: Boolean,
            // 字体颜色
            color: String,
            // 是否粗字体
            bold: Boolean,
            // 是否自定义
            custom: Boolean,
            // 以下查看 uniapp 文档：https://uniapp.dcloud.net.cn/component/button.html
            formType: String,
            openType: String,
            appParameter: String,
            hoverStopPropagation: Boolean,
            sessionForm: String,
            sendMessageTitle: String,
            sendMessagePath: String,
            sendMessageImg: String,
            showMessageCard: Boolean,
            hoverClass: { type: String, default: "button-hover" },
            hoverStartTime: { type: Number, default: 20 },
            hoverStayTime: { type: Number, default: 70 },
            lang: { type: String, default: "en" }
        },
        emits: ["getphonenumber", "getuserinfo", "error", "opensetting", "launchapp"],
        setup(props, { emit }) {
            const { tap } = useTap(emit);

            // 是否图片
            const isImg = computed(() => props.icon?.includes("/"));

            // 事件
            const getPhoneNumber = e => {
                emit("getphonenumber", e);
            };

            const getUserInfo = e => {
                emit("getuserinfo", e);
            };

            const error = e => {
                emit("error", e);
            };

            const openSetting = e => {
                emit("opensetting", e);
            };

            const launchApp = e => {
                emit("launchapp", e);
            };

            const click = e => {
                tap(e);
            };

            const classs = computed(() => {
                return [
                    "cui-button",
                    props.type && `cui-button--${props.type}`,
                    props.size && `cui-button--${props.size}`,
                    {
                        "is-round": props.round,
                        "is-loading": props.loading,
                        "is-plain": props.plain,
                        "is-fill": props.fill,
                        "is-disabled": props.disabled,
                        "is-border": props.border,
                        "is-bold": props.bold,
                        "is-custom": props.custom
                    }
                ];
            });

            return { getPhoneNumber, getUserInfo, error, openSetting, launchApp, click, isImg, classs, ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    @mixin button-color($type, $color) {
        &.cui-button--#{$type} {
            background-color: $color;
            border-color: $color;

            .cui-button__text,
            .cui-button__icon,
            .cui-button__loading {
                color: #fff;
            }

            &.is-plain {
                background-color: #fff;

                .cui-button__text,
                .cui-button__icon {
                    color: rgba($color, 0.8);
                }
                &.is-border {
                    border-color: rgba($color, 0.8);
                }
            }

            &.is-disabled {
                background-color: $color;
            }

            &.button-hover {
                &:not(.is-loading) {
                    background-color: rgba($color, 0.8);
                    &.is-plain {
                        .cui-button__text,
                        .cui-button__icon {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

    .cui-button {
        @apply font-size-13 border-rd-4 h-32 px-15 m-0 flex-center inline-flex box-border bg-#fff overflow-visible vertical-middle;
        white-space: nowrap;

        &__text {
            line-height: 1;
            letter-spacing: 1rpx;
        }

        &__icon {
            @apply mr-5 flex items-center h-100%;

            line-height: 1;

            .image {
                @apply size-25;
            }
        }

        &::after {
            @apply hidden border-width-0;
        }

        &.button-hover {
            @apply bg-#f6f7fa;
        }

        &--large {
            @apply h-40 px-15 font-size-14;
        }

        &--small {
            @apply h-24 px-10 font-size-12 border-rd-4;
        }

        &.is-border {
            @apply border-1 border-solid border-#dcdfe6;
        }

        &.is-round {
            @apply border-rd-32;
        }

        &.is-loading {
            @apply opacity-80;
        }

        &.is-fill {
            @apply w-100%;
        }

        &.is-disabled {
            @apply opacity-50;
        }

        &.is-bold {
            @apply font-bold;
        }

        @include button-color(primary, $cui-color-primary);
        @include button-color(success, $cui-color-success);
        @include button-color(error, $cui-color-error);
        @include button-color(warning, $cui-color-warning);
        @include button-color(info, $cui-color-info);
    }
</style>

<style lang="scss">
    .cui-button + .cui-button,
    base-button + base-button {
        @apply ml-10;
    }
</style>
