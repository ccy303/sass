<template>
    <view :class="classs" :style="{ width }">
        <slot></slot>
    </view>
</template>

<script>
    import { getParent } from "../../utils";

    export default defineComponent({
        name: "BaseGridItem",

        setup() {
            const parent = getParent("BaseGrid", ["column", "border"]);
            // 宽度
            const width = computed(() => {
                return 100 / (parent.value?.column || 0) + "%";
            });

            const classs = computed(() => {
                return [`cui-grid-item`, { "is-border": parent.value.border }];
            });

            return { width, classs };
        }
    });
</script>

<style lang="scss">
    .cui-grid-item {
        @apply float-left box-border relative;
    }

    .is-border {
        &::before,
        &::after {
            content: "";
            position: absolute;
            display: block;
            background-color: #dcdfe6;
        }
        &::before {
            @apply h-1 w-100% bottom-0 left-0;
        }
        &::after {
            @apply w-1 h-100% right-0 top-0;
        }
    }
</style>
