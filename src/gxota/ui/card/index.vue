<template>
    <div class="cui-card" :style="{ backgroundColor }">
        <div class="cui-card__header" v-if="label">
            <base-text bold :value="label"></base-text>

            <div class="cui-card__loading" v-if="loading">
                <base-loading :size="36" />
            </div>

            <template v-else>
                <div class="cui-card__more" v-if="more" @tap="toMore">
                    <slot name="more">
                        <span class="text">{{ moreText }}</span>
                        <base-icon name="arrow-right"></base-icon>
                    </slot>
                </div>
            </template>
        </div>

        <div class="cui-card__container">
            <slot></slot>
        </div>

        <div class="cui-card__footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default defineComponent({
        name: "BaseCard",
        props: {
            // 标签内容
            label: String,
            // 是否加载中
            loading: { type: Boolean, default: false },
            // 是否显示查看更多
            more: { type: Boolean, default: false },
            // 更多的文本内容
            moreText: { type: String, default: "更多" },
            // 背景色
            backgroundColor: { type: String, default: "#ffffff" }
        },
        emits: ["more"],
        setup(_, { emit }) {
            const toMore = () => {
                emit("more");
            };
            return { toMore };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-card {
        @apply border-rd-8 mb-10;

        &__header {
            @apply h-40 px-10 flex flex-items-center relative;
            border-bottom: 1px solid $cui-border-color;
        }

        &__loading {
            @apply absolute right-10 line-height-0;
        }

        &__more {
            @apply flex flex-center absolute right-10 color-#909399;
            color: $cui-color-info;

            .text {
                @apply font-size-12 mr-2;
            }

            .cui-icon-arrow-right {
                @apply font-size-15 line-height-1;
                font-size: 30rpx;
            }
        }

        &__container {
            @apply p-10;
        }

        &__footer {
            @apply flex justify-end flex-center h-45 px-10;
        }
    }
</style>
