<template>
    <view class="cui-avatar-group">
        <template v-for="(item, index) in urls" :key="index">
            <base-avatar v-if="index < max" :size="size" :mode="mode" :shape="shape" :src="item" />
        </template>

        <base-avatar :size="size" v-if="overLen > 0 && showMore">
            <view class="cui-avatar-group__more"> {{ overLen }} </view>
        </base-avatar>
    </view>
</template>

<script>
    export default defineComponent({
        name: "BaseAvatarGroup",

        props: {
            // 多个地址  PropType<string[]>
            urls: { type: Array, default: () => [] },
            // 大小
            size: { type: Number, default: 80 },
            // 最大数量
            max: { type: Number, default: 5 },
            // 显示更多
            showMore: { type: Boolean, default: true },
            // 形状   PropType<"circle" | "square">
            shape: { type: String, default: "circle" },
            // 裁剪模式
            mode: { type: String, default: "scaleToFill" }
        },

        setup(props) {
            const overLen = computed(() => props.urls.length - props.max);

            return { overLen };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-avatar-group {
        @apply inline-flex;

        .cui-avatar {
            @apply relative;
            border: $cui-border-width solid rgba(255, 255, 255, 0.2);
        }

        .cui-avatar + .cui-avatar,
        base-avatar + base-avatar {
            @apply ml--10;
        }

        &__more {
            @apply flex-center inline-flex size-100%;
            background-color: $cui-color-primary;

            &::before {
                @apply relative top--1 right--1;
                content: "+";
            }
        }
    }
</style>
