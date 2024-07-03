<template>
    <view :class="classs">
        <slot></slot>
    </view>
</template>

<script>
    export default defineComponent({
        name: "BaseGrid",
        props: {
            // 列的数量
            column: { type: Number, default: 3 },
            // 是否带边框
            border: { type: Boolean, default: true }
        },
        setup(props) {
            const classs = computed(() => {
                return ["cui-grid", `cui-grid__column-${props.column}`, { "is-border": props.border }];
            });
            return { classs };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-grid {
        @apply box-border;
        &::after,
        &::before {
            content: "";
            display: table;
        }
        &::after {
            clear: both;
        }
    }

    .is-border {
        border: 2rpx solid #dcdfe6;
        border-bottom: 0;
        border-right: 0;
    }
</style>
