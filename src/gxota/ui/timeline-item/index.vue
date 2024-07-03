<template>
    <div class="cui-timeline-item" :class="[{ 'is-line': showLine }]">
        <div class="cui-timeline-item__timestamp" :style="{ width: `${parent?.timestampWidth}rpx` }">
            <slot name="timestamp">
                <text class="cui-timeline-item__date">{{ timestampText[0] }}</text>
                <text class="cui-timeline-item__time">{{ timestampText[1] }}</text>
            </slot>
        </div>

        <div class="cui-timeline-item__node">
            <div class="cui-timeline-item__node-box">
                <slot name="icon">
                    <base-icon v-if="icon" class="cui-timeline-item__icon" :name="icon" :style="{ color }" />

                    <text v-else class="cui-timeline-item__dot" :style="{ 'background-color': color || '#999' }"></text>
                </slot>
            </div>
        </div>

        <div class="cui-timeline-item__content" select>
            <slot name="content">
                <span selectable user-select>{{ content }}</span>
            </slot>
        </div>
    </div>
</template>

<script>
    import { getParent } from "../../utils";

    export default defineComponent({
        name: "BaseTimelineItem",

        props: {
            // 时间
            timestamp: String,
            // 内容
            content: String,
            // 是否显示竖线
            showLine: Boolean,
            // 图标
            icon: String,
            // 图标颜色
            color: { type: String, default: "#999" }
        },

        setup(props) {
            // cl-timeline
            const parent = getParent("BaseTimeline", ["timestampWidth"]);

            // 时间
            const timestampText = computed(() => {
                return (props.timestamp || "").split(" ");
            });

            return { timestampText, parent };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-timeline-item {
        display: flex;
        width: 100%;
        position: relative;

        &__timestamp {
            font-size: 24rpx;
            margin: 0 20rpx;
            text-align: center;
        }

        &__date {
            display: block;
            font-size: 24rpx;
            text-align: right;
        }

        &__time {
            display: block;
            font-size: 22rpx;
            text-align: right;
            color: #666;
        }

        &__node {
            display: flex;
            justify-content: center;
            position: relative;
            width: 52rpx;
            color: #ccc;

            &::after {
                content: "";
                display: block;
                height: calc(100% - 32rpx);
                width: 4rpx;
                background-image: linear-gradient(to bottom, currentColor 0%, currentColor 80%, transparent 50%);
                background-size: 4rpx 18rpx;
                background-repeat: y-repeat;
                transform: scaleX(1);
                position: absolute;
                top: 32rpx;
                border-radius: 10rpx;
            }

            &-box {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 32rpx;
                width: 32rpx;
            }
        }

        &__dot {
            display: block;
            height: 16rpx;
            width: 16rpx;
            z-index: 9;
            border-radius: 18rpx;
        }

        &__icon {
            font-size: 40rpx;
            z-index: 2;
            position: relative;
        }

        &__content {
            font-size: 24rpx;
            flex: 1;
            margin: 0 20rpx;
            position: relative;
            padding-bottom: 60rpx;
        }

        &.is-line {
            .cui-timeline-item__node::after {
                display: none;
            }
        }
    }
</style>
