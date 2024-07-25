<template>
    <view class="cui-toast__wrap">
        <template v-for="item in list" :key="item.id">
            <base-popup v-model="item.visible" :padding="0" :modal="false" :direction="item.position" background-color="transparent">
                <view class="cui-toast" :class="{ 'is-icon': item.image || item.icon }">
                    <view mb-20 v-if="item.image || item.icon">
                        <image
                            block
                            size-60
                            :src="item.image.url"
                            :mode="item.image.mode || 'aspectFill'"
                            :style="item.image.style"
                            v-if="item.image"
                        />
                        <base-icon :size="60" :name="item.icon" v-else></base-icon>
                    </view>
                    <slot>
                        <span font-size-14 text-center>{{ item.message }}</span>
                    </slot>
                </view>
            </base-popup>
        </template>
    </view>
</template>

<script>
    import { isFunction, last, has } from "lodash-es";

    export default defineComponent({
        name: "BaseToast",
        options: { styleIsolation: "shared" },
        setup() {
            let id = 0;
            // 列表
            const list = ref([]);
            const open = d => {
                // 默认
                const options = {
                    id: id++,
                    visible: false,
                    closed: false,
                    icon: "",
                    image: null,
                    message: "",
                    duration: 2000,
                    type: "",
                    position: "center",
                    clear: false
                };

                // 合并
                if (has(d, "message")) {
                    Object.assign(options, d);
                } else {
                    options.message = String(d);
                }

                switch (options.type) {
                    case "success":
                        options.icon = "check-border";
                        break;

                    case "warning":
                        options.icon = "warning-border";
                        break;

                    case "info":
                        options.icon = "help-border";
                        break;

                    case "error":
                        options.icon = "close-border";
                        break;
                }

                // 是否清除之前的
                if (options.clear) {
                    list.value = [options];
                } else {
                    list.value.push(options);
                }

                // 有图标默认居中显示
                if (options.image || options.icon) {
                    options.position = "center";
                }

                setTimeout(() => create(last(list.value)), 50);
            };

            // 关闭
            const close = item => {
                // 清空计时器
                clearTimeout(item.timer);
                item.visible = false;

                // 关闭回调
                if (isFunction(item.onClose)) {
                    item.onClose();
                }

                setTimeout(() => {
                    item.closed = true;
                }, 300);
            };

            // 创建
            const create = item => {
                const { duration } = item || {};

                if (duration > 0) {
                    item.visible = true;
                    item.timer = setTimeout(() => close(item), duration);
                }
            };

            return { list, open, close, create };
        }
    });
</script>

<style lang="scss">
    .cui-toast {
        @apply inline-flex flex-col items-center justify-center border-rd-13 p-20 color-#fff line-height-1;

        background-color: rgba(50, 50, 50, 0.9);

        &.is-icon {
            @apply min-w-55;
        }
    }
    .cui-toast__wrap {
        :deep(.cui-popup__wrapper) {
            pointer-events: none !important;
        }
        :deep(.cui-popup__wrapper--top) {
            top: 100rpx;
            top: calc(env(safe-area-inset-top) + 100rpx);
        }
        :deep(.cui-popup__wrapper--bottom) {
            bottom: 100rpx;
            bottom: calc(env(safe-area-inset-bottom) + 100rpx);
        }
        :deep(.cui-popup__container) {
            text-align: center;
            width: 100%;
        }
    }
</style>
