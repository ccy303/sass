<template>
    <view>
        <view
            v-if="popMenu && (leftBottom || rightBottom || leftTop || rightTop) && content.length > 0"
            :class="{
                'cui-fab--leftBottom': leftBottom,
                'cui-fab--rightBottom': rightBottom,
                'cui-fab--leftTop': leftTop,
                'cui-fab--rightTop': rightTop
            }"
            class="cui-fab"
            :style="nvueBottom"
        >
            <view
                :class="{
                    'cui-fab__content--left': horizontal === 'left',
                    'cui-fab__content--right': horizontal === 'right',
                    'cui-fab__content--flexDirection': direction === 'vertical',
                    'cui-fab__content--flexDirectionStart': flexDirectionStart,
                    'cui-fab__content--flexDirectionEnd': flexDirectionEnd
                }"
                :style="{ width: boxWidth, height: boxHeight, backgroundColor: styles.backgroundColor }"
                class="cui-fab__content"
                elevation="5"
            >
                <view v-if="flexDirectionStart || horizontalLeft" class="cui-fab__item cui-fab__item--first" />
                <view
                    v-for="(item, index) in content"
                    :key="index"
                    :class="{ 'cui-fab__item--active': isShow }"
                    class="cui-fab__item"
                    @click="_onItemClick(index, item)"
                >
                    <image :src="item.active ? item.selectedIconPath : item.iconPath" class="cui-fab__item-image" mode="aspectFit" />
                    <text class="cui-fab__item-text" :style="{ color: item.active ? styles.selectedColor : styles.color }">{{ item.text }}</text>
                </view>
                <view v-if="flexDirectionEnd || horizontalRight" class="cui-fab__item uni-fab__item--first" />
            </view>
        </view>
        <view
            :class="{
                'cui-fab__circle--leftBottom': leftBottom,
                'cui-fab__circle--rightBottom': rightBottom,
                'cui-fab__circle--leftTop': leftTop,
                'cui-fab__circle--rightTop': rightTop
            }"
            class="cui-fab__circle cui-fab__plus"
            :style="{ 'background-color': styles.buttonColor, bottom: nvueBottom }"
            @click="_onClick"
        >
            <base-icon
                class="fab-circle-icon"
                :name="styles.icon"
                :color="styles.iconColor"
                :size="50"
                :class="{ 'cui-fab__plus--active': isShow && content.length > 0 }"
            />
        </view>
    </view>
</template>

<script>
    export default {
        name: "BaseFab",
        emits: ["fabClick", "trigger"],
        props: {
            pattern: { type: Object, default: () => ({}) },
            horizontal: { type: String, default: "left" },
            vertical: { type: String, default: "bottom" },
            direction: { type: String, default: "horizontal" },
            content: { type: Array, default: () => [] },
            show: { type: Boolean, default: false },
            popMenu: { type: Boolean, default: true }
        },
        data() {
            return {
                fabShow: false,
                isShow: false,
                styles: {
                    color: "#3c3e49",
                    selectedColor: "#007AFF",
                    backgroundColor: "#fff",
                    buttonColor: "#007AFF",
                    iconColor: "#fff",
                    icon: "plus"
                }
            };
        },
        computed: {
            contentWidth(e) {
                return (this.content.length + 1) * 55 + 15 + "px";
            },
            contentWidthMin() {
                return "55px";
            },
            // 动态计算宽度
            boxWidth() {
                return this.getPosition(3, "horizontal");
            },
            // 动态计算高度
            boxHeight() {
                return this.getPosition(3, "vertical");
            },
            // 计算左下位置
            leftBottom() {
                return this.getPosition(0, "left", "bottom");
            },
            // 计算右下位置
            rightBottom() {
                return this.getPosition(0, "right", "bottom");
            },
            // 计算左上位置
            leftTop() {
                return this.getPosition(0, "left", "top");
            },
            rightTop() {
                return this.getPosition(0, "right", "top");
            },
            flexDirectionStart() {
                return this.getPosition(1, "vertical", "top");
            },
            flexDirectionEnd() {
                return this.getPosition(1, "vertical", "bottom");
            },
            horizontalLeft() {
                return this.getPosition(2, "horizontal", "left");
            },
            horizontalRight() {
                return this.getPosition(2, "horizontal", "right");
            },
            // 计算 nvue bottom
            nvueBottom() {
                return 30;
            }
        },
        watch: {
            pattern: {
                handler(val, oldVal) {
                    this.styles = Object.assign({}, this.styles, val);
                },
                deep: true
            }
        },
        created() {
            this.isShow = this.show;
            if (this.top === 0) {
                this.fabShow = true;
            }
            // 初始化样式
            this.styles = Object.assign({}, this.styles, this.pattern);
        },
        methods: {
            _onClick() {
                this.$emit("fabClick");
                if (!this.popMenu) {
                    return;
                }
                this.isShow = !this.isShow;
            },
            open() {
                this.isShow = true;
            },
            close() {
                this.isShow = false;
            },
            /**
             * 按钮点击事件
             */
            _onItemClick(index, item) {
                if (!this.isShow) {
                    return;
                }
                this.$emit("trigger", {
                    index,
                    item
                });
            },
            /**
             * 获取 位置信息
             */
            getPosition(types, paramA, paramB) {
                if (types === 0) {
                    return this.horizontal === paramA && this.vertical === paramB;
                } else if (types === 1) {
                    return this.direction === paramA && this.vertical === paramB;
                } else if (types === 2) {
                    return this.direction === paramA && this.horizontal === paramB;
                } else {
                    return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    $uni-shadow-base: 0 1px 5px 2px
        rgba(
            $color: #000000,
            $alpha: 0.3
        ) !default;

    .uni-fab {
        @apply fixed flex-center z-10 border-rd-45;
    }

    .cui-fab--active {
        @apply opacity-100;
    }

    .cui-fab--leftBottom {
        @apply left-15 bottom-30;
    }

    .cui-fab--leftTop {
        @apply left-15 top-30;
    }

    .cui-fab--rightBottom {
        @apply right-15 bottom-30;
    }

    .cui-fab--rightTop {
        @apply right-15 top-30;
    }

    .cui-fab__circle {
        @apply fixed flex-center size-55 bg-#3c3e49 border-rd-45 z-11;
    }

    .cui-fab__circle--leftBottom {
        @apply left-15 bottom-30;
    }

    .cui-fab__circle--leftTop {
        @apply left-15 top-30;
    }

    .cui-fab__circle--rightBottom {
        @apply right-15 bottom-30;
    }

    .cui-fab__circle--rightTop {
        @apply right-15 top-30;
    }

    .cui-fab__circle--left {
        @apply left-0;
    }

    .cui-fab__circle--right {
        @apply right-0;
    }

    .cui-fab__circle--top {
        @apply top-0;
    }

    .cui-fab__circle--bottom {
        @apply bottom-0;
    }

    .cui-fab__plus {
        @apply font-bold;
    }

    .fab-circle-icon {
        @apply rotate-0 transition-transform-300 font-200;
    }

    .cui-fab__plus--active {
        transform: rotate(135deg);
    }

    .cui-fab__content {
        @apply box-border flex flex-row border-rd-55 overflow-hidden w-55 border-#fff border-1 border-solid;
        transition-property: width, height;
        transition-duration: 0.2s;
    }

    .cui-fab__content--left {
        @apply justify-start;
    }

    .cui-fab__content--right {
        @apply justify-end;
    }

    .cui-fab__content--flexDirection {
        @apply flex-col justify-end;
    }

    .cui-fab__content--flexDirectionStart {
        @apply flex-col justify-start;
    }

    .cui-fab__content--flexDirectionEnd {
        @apply flex-col justify-end;
    }

    .cui-fab__item {
        @apply flex flex-col items-center justify-center size-55 opacity-0 transition-opacity-200;
    }

    .cui-fab__item--active {
        @apply opacity-100;
    }

    .cui-fab__item-image {
        @apply size-20 mb-4;
    }

    .cui-fab__item-text {
        @apply color-#fff font-size-12 line-height-12 mt-2;
    }

    .cui-fab__item--first {
        @apply w-55;
    }
</style>
