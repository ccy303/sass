<template>
    <dic class="cui-loadmore__wrap">
        <base-divider :background-color="backgroundColor" :color="color" :width="divider ? '400rpx' : '0rpx'">
            <div class="cui-loadmore">
                <base-loading :color="iconColor" :theme="loadingTheme" :size="40" v-if="!finish && loading" />
                <span class="cui-loadmore__text" :style="{ color }" v-if="message">{{ message }}</span>
            </div>
        </base-divider>
    </dic>
</template>

<script>
    export default defineComponent({
        name: "BaseLoadmore",

        props: {
            // 是否加载中
            loading: Boolean,
            // 是否加载完成
            finish: Boolean,
            // 是否显示分割符
            divider: { type: Boolean, default: true },
            // 字体颜色
            color: String,
            // 图标颜色
            iconColor: String,
            // 背景颜色
            backgroundColor: String,
            // 普通状态下显示内容
            text: { type: String, default: "上拉加载更多" },
            // 加载完成显示内容
            finishText: { type: String, default: "没有更多了" },
            // 加载中显示内容
            loadingText: { type: String, default: "加载中" },
            // 加载图标主题
            loadingTheme: String
        },

        setup(props) {
            const message = computed(() => {
                return props.finish ? props.finishText : props.loading ? props.loadingText : props.text;
            });

            return { message };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-loadmore__wrap {
        .cui-loadmore {
            @apply flex items-center;

            &__text {
                @apply text-13 ml-7;
                color: $cui-color-info;
            }
        }
    }
</style>
