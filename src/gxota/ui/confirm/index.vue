<template>
    <view class="cui-confirm">
        <base-dialog
            v-model="visible"
            :title="conf.title"
            :width="conf.width"
            :close-on-click-modal="conf.closeOnClickModal"
            @close="onClose"
            @closed="onClosed"
        >
            <template #header>
                <view class="cui-confirm__header">
                    <base-icon :size="24" name="toast-error" v-if="conf.type == 'error'"></base-icon>
                    <base-icon :size="24" name="toast-warning" v-else-if="conf.type == 'warning'"></base-icon>
                    <base-icon :size="24" name="toast-success" v-else-if="conf.type == 'success'"></base-icon>
                    <span class="cui-confirm__title">{{ conf.title }}</span>
                </view>
            </template>

            <view class="cui-confirm__container" :style="{ textAlign: conf.message ? 'center' : 'left' }">
                <slot>
                    <view class="cui-confirm__message">{{ conf.message }}</view>
                </slot>
            </view>

            <template #footer v-if="conf.showCancelButton || conf.showConfirmButton">
                <view class="cui-confirm__footer">
                    <view class="cui-confirm__footer-item" v-if="conf.showCancelButton">
                        <base-button fill @tap="close('cancel')"> {{ conf.cancelButtonText }}</base-button>
                    </view>

                    <view class="cui-confirm__footer-item" v-if="conf.showConfirmButton">
                        <base-button fill type="primary" :loading="loading" @tap="close('confirm')">
                            {{ conf.confirmButtonText }}
                        </base-button>
                    </view>
                </view>
            </template>
        </base-dialog>
    </view>
</template>

<script>
    export default defineComponent({
        name: "BaseConfirm",
        options: { styleIsolation: "shared" },
        setup() {
            // 是否可见
            const visible = ref(false);

            // 是否已关闭
            const closed = ref(true);

            // 是否加载中
            const loading = ref(false);

            // 配置
            const conf = ref({});

            // 计时器
            let timer;

            // 锁
            let lock = false;

            // 打开
            const open = options => {
                lock = false;
                visible.value = false;
                clearTimeout(timer);

                const next = () => {
                    visible.value = true;
                    closed.value = false;

                    // 设置选项
                    nextTick(() => {
                        conf.value = {
                            width: "500rpx",
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: "确认",
                            cancelButtonText: "取消",
                            closeOnClickModal: true,
                            ...options
                        };

                        // 是否定时关闭
                        if (conf.value.duration) {
                            timer = setTimeout(() => {
                                close("close");
                            }, conf.value.duration);
                        }
                    });
                };

                if (!closed.value) {
                    setTimeout(() => {
                        next();
                    }, 350);
                } else {
                    next();
                }
            };

            // 关闭
            const close = (action = "close") => {
                lock = true;

                // 完成
                const done = () => {
                    if (conf.value.callback) {
                        conf.value.callback(action);
                    }

                    nextTick(() => {
                        visible.value = false;
                        hideLoading();
                    });
                };

                // 加载中
                const showLoading = () => {
                    loading.value = true;
                };

                // 关闭加载
                const hideLoading = () => {
                    loading.value = false;
                };

                if (conf.value.beforeClose) {
                    conf.value.beforeClose(action, { done, showLoading, hideLoading });
                } else {
                    done();
                }
            };

            // 监听关闭
            const onClose = () => {
                clearTimeout(timer);

                if (!lock) {
                    close("close");
                }
            };

            // 监听关闭后
            const onClosed = () => {
                closed.value = true;
            };

            return { visible, loading, conf, open, close, onClose, onClosed };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-confirm {
        position: relative;

        &__message {
            word-break: break-all;
        }

        &__header {
            @apply flex-center;

            :deep(.cui-icon-toast-error),
            :deep(.cui-icon-toast-success),
            :deep(.cui-icon-toast-warning) {
                @apply color-#fff h-18 w-18 flex-center mr-5 border-rd-100%;
            }

            :deep(.cui-icon-toast-error) {
                background-color: $cui-color-error;
            }

            :deep(.cui-icon-toast-success) {
                background-color: $cui-color-success;
            }

            :deep(.cui-icon-toast-warning) {
                background-color: $cui-color-warning;
            }
        }

        &__container {
        }

        &__title {
            @apply font-size-16 font-bold;
        }

        &__footer {
            @apply flex justify-center flex-1 my-0 mx--5 pb-20;

            &-item {
                @apply relative flex-1 mx-5;
            }
        }

        :deep(.cui-dialog__footer) {
            padding-bottom: 0 !important;
        }
    }
</style>
