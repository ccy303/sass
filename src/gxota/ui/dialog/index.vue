<template>
    <view class="cui-dialog__wrapper">
        <base-popup
            v-model="visible"
            direction="center"
            :close-on-click-modal="closeOnClickModal"
            :size="width"
            :border-radius="16"
            :padding="0"
            @close="onClose"
            @closed="onClosed"
        >
            <view class="cui-dialog">
                <!-- 顶部 -->
                <view class="cui-dialog__header" v-if="title">
                    <slot name="header">
                        {{ title }}
                    </slot>
                </view>

                <!-- 内容 -->
                <view class="cui-dialog__container" :style="{ textAlign }">
                    <slot> </slot>
                </view>

                <!-- 底部 -->
                <view class="cui-dialog__footer" v-if="$slots.footer">
                    <slot name="footer"> </slot>
                </view>

                <!-- 关闭按钮 -->
                <view class="cui-dialog__close" v-if="showCloseBtn" @tap="close">
                    <base-icon size="16" name="close"></base-icon>
                </view>
            </view>
        </base-popup>
    </view>
</template>

<script>
    export default defineComponent({
        name: "BaseDialog",

        props: {
            // 是否可见
            modelValue: Boolean,
            // 标题
            title: String,
            // 文字对齐   <"left" | "center" | "right">
            textAlign: { type: String, default: "left" },
            // 宽度
            width: { type: String, default: "80%" },
            // 点击遮罩层是否关闭
            closeOnClickModal: { type: Boolean, default: true },
            // 显示关闭按钮
            showCloseBtn: Boolean
        },

        emits: ["update:modelValue", "close", "closed"],

        setup(props, { emit }) {
            const visible = ref(false);

            watch(
                () => props.modelValue,
                val => {
                    visible.value = val;
                },
                { immediate: true }
            );

            const open = () => {
                visible.value = true;
            };

            const close = () => {
                visible.value = false;
            };

            const onClose = () => {
                emit("update:modelValue", false);
                emit("close");
            };

            const onClosed = () => {
                emit("closed");
            };

            return {
                visible,
                open,
                close,
                onClose,
                onClosed
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-dialog__wrapper {
        .cui-dialog {
            @apply relative;

            &__header {
                @apply flex-center relative h-45 font-size-16 font-500;
            }

            &__container {
                @apply relative px-20 pb-20 font-size-14;

                &:first-child {
                    @apply pt-20;
                }
            }

            &__footer {
                @apply flex justify-end px-20 pb-20;
            }

            &__close {
                @apply flex-center inline-flex size-25 absolute b--40 border-rd-25;
                left: calc(50% - 25rpx);
                color: $cui-border-color;
                border: 1px solid currentColor;
            }
        }
    }
</style>
