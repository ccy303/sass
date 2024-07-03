<template>
    <view class="cui-waterfall-column" :style="{ margin, width }">
        <slot></slot>
    </view>
</template>

<script>
    import { getParent } from "../../utils";

    export default defineComponent({
        name: "BaseWaterfallColumn",

        setup() {
            const { proxy } = getCurrentInstance();

            // BaseWaterfall
            const parent = getParent("BaseWaterfall", ["column", "gutter"], ["getRect"]);

            // 宽度
            const width = computed(() => `calc(${100 / parent.value.column}% - ${parent.value.gutter}rpx)`);

            // 间距
            const margin = computed(() => `0 ${parent.value.gutter / 2}rpx`);

            const getRect = () => {
                return new Promise(resolve => {
                    nextTick(() => {
                        uni.createSelectorQuery().in(proxy).select(`.cui-waterfall-column`).boundingClientRect(resolve).exec();
                    });
                });
            };

            return { width, margin, getRect };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-waterfall-column {
        @apply float-left break-inside-avoid;
        float: left;
    }
</style>
