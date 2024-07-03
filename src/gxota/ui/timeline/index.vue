<template>
    <view class="cui-timeline">
        <slot></slot>
    </view>
</template>

<script>
    export default defineComponent({
        name: "BaseTimeline",
        props: {
            // 左侧时间宽度
            timestampWidth: { type: Number, default: 150 }
        }
    });
</script>
