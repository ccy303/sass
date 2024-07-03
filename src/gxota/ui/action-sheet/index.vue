<template>
    <view class="cui-action-sheet">
        <base-popup v-model="visible" direction="bottom" :padding="0" border-radius="32rpx 32rpx 0 0" :close-on-click-modal="conf.closeOnClickModal">
            <view class="cui-action-sheet__title" v-if="conf.title">
                {{ conf.title }}
            </view>

            <!-- 列表 -->
            <button
                class="cui-action-sheet__item"
                v-for="(item, index) in conf.list"
                :key="index"
                :class="[item.disabled ? 'is-disabled' : '']"
                :style="{ color: item.color, fontSize: item.size }"
                :open-type="item.openType"
                @getphonenumber="onEvent(item, 'getphonenumber')"
                @getuserinfo="onEvent(item, 'getuserinfo')"
                @contact="onEvent(item, 'contact')"
                @error="onEvent(item, 'error')"
                @opensetting="onEvent(item, 'opensetting')"
                @tap="select(index, item)"
            >
                <base-icon :name="item.icon" :size="34" :margin="[0, 10, 0, 0]" v-if="item.icon" />
                <text class="cui-action-sheet__label">{{ item.label }}</text>
            </button>

            <!-- 取消按钮 -->
            <button class="cui-action-sheet__item cui-action-sheet__item--cancel" @tap="close('cancel')" v-if="conf.showCancel">
                {{ conf.cancelText }}
            </button>
        </base-popup>
    </view>
</template>

<script>
    import { ref, defineComponent } from "vue";

    export default defineComponent({
        name: "BaseActionSheet",

        setup() {
            // 是否可见
            const visible = ref(false);

            // 配置
            const conf = ref({});

            // 打开
            const open = options => {
                conf.value = Object.assign(
                    { title: "", list: [], callback: null, closeOnClickModal: true, showCancel: true, cancelText: "取消" },
                    options
                );

                visible.value = true;
            };

            // 关闭
            const close = action => {
                const done = () => {
                    visible.value = false;

                    if (conf.value.callback) {
                        conf.value.callback(action);
                    }
                };

                if (conf.value.beforeClose) {
                    conf.value.beforeClose(action, done);
                } else {
                    done();
                }
            };

            // 选择
            const select = (index, item) => {
                if (item.disabled) {
                    return false;
                }

                if (item.click) {
                    item.click(() => {
                        visible.value = false;
                    });
                } else {
                    close(index);
                }
            };

            // 事件
            const onEvent = (item, name) => {
                if (item[name]) {
                    item[name]();
                }
            };

            return { visible, conf, open, close, select, onEvent };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-action-sheet {
        @apply relative;

        .cui-popup__container {
            @apply bg-#fff overflow-hidden;
            border-radius: 32rpx 32rpx 0 0;
        }

        &__title {
            @apply flex items-center font-size-12 px-23 h-45;
            background-color: $cui-color-bg;
        }

        &__item {
            @apply flex-center p-15 font-size-14 bg-#fff border-rd-0;
            line-height: 1.4;
            border-bottom: $cui-border-width solid $cui-color-bg;

            &:last-child {
                @apply border-b-0;
            }

            &.is-disabled {
                color: $cui-color-disabled;
            }

            &:not(.is-disabled):active {
                background-color: $cui-color-active;
            }

            &--cancel {
                border-top: 10rpx solid $cui-color-bg;
            }

            &:after {
                @apply border-0;
            }
        }
    }
</style>
