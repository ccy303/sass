<template>
    <div class="cui-tree-item" :class="{ 'is-expand': data.isExpand, 'is-checked': isChecked }" :style="itemStyle">
        <div class="cui-tree-item__content" :style="childStyle" @tap="toTap">
            <div class="cui-tree-item__expand" @tap.stop="toExpand()" v-if="!isLeaf">
                <base-icon class="icon-caret" name="caret-bottom" />
                <!-- <text class="icon-caret cui-icon-caret-bottom"></text> -->
            </div>

            <div class="cui-tree-item__label">
                <slot name="item" :data="data" :level="level">
                    {{ label }}
                </slot>
            </div>
            <base-icon class="cui-tree-item__check" name="check" />
        </div>

        <div class="cui-tree-item__children" :style="{ maxHeight: maxHeight }" v-if="isExpand">
            <base-tree-item v-for="(item, index) in children" :data="item" :siblings="children" :key="index" :level="level + 1"> </base-tree-item>
        </div>
    </div>
</template>

<script>
    import { getParent, parseRpx } from "../../utils";
    import { isEmpty } from "lodash-es";

    export default defineComponent({
        name: "cl-tree-item",

        props: {
            data: { type: Object, default: () => ({}) },
            siblings: { type: Array, default: () => [] },
            level: { type: Number, default: 0 }
        },

        setup(props) {
            // cl-tree
            const parent = getParent("BaseTree", [
                "value",
                "updateValue",
                "data",
                "keys",
                "getKey",
                "rowHeight",
                "checkStrictly",
                "accordion",
                "noChildren"
            ]);

            // 是否展开
            const isExpand = ref(props.data.isExpand || false);

            // 最大高度
            const maxHeight = ref();

            // 样式
            const itemStyle = computed(() => {
                return {
                    paddingLeft: (props.level ? 26 : 0) + "rpx"
                };
            });

            // 子集样式
            const childStyle = computed(() => {
                return {
                    marginLeft: parent.value?.noChildren ? 0 : isLeaf.value ? "32rpx" : "0",
                    height: parseRpx(parent.value?.rowHeight)
                };
            });

            // 是否叶子节点
            const isLeaf = computed(() => isEmpty(getKey("children")));

            // 是否选中
            const isChecked = computed(() => parent.value?.value.includes(getKey("value")));

            // 文本
            const label = computed(() => getKey("label"));

            // 子集
            const children = computed(() => getKey("children"));

            // 获取高度
            const getHeight = () => {
                let n = 0;

                const deep = arr => {
                    arr.forEach(e => {
                        n += 1;
                        if (e.isExpand && getKey("children", e)) {
                            deep(getKey("children", e));
                        }
                    });
                };

                deep(getKey("children") || []);

                return n * (parent.value?.rowHeight || 50) + "rpx";
            };

            // 展开
            let timer;

            const toExpand = async (invert = true) => {
                if (getKey("children")) {
                    if (invert) {
                        // eslint-disable-next-line
                        props.data.isExpand = !props.data.isExpand;
                    }

                    clearTimeout(timer);

                    if (props.data.isExpand) {
                        isExpand.value = true;

                        // 1 设置0
                        maxHeight.value = "0";

                        await nextTick();

                        setTimeout(() => {
                            // 2 获取高度
                            maxHeight.value = getHeight();

                            timer = setTimeout(() => {
                                // 3 清除高度
                                maxHeight.value = undefined;

                                // 是否每次只打开一个同级树节点展开
                                if (parent.value?.accordion) {
                                    props.siblings.forEach(e => {
                                        if (getKey("value", e) !== getKey("value")) {
                                            e.isExpand = false;
                                        }
                                    });
                                }
                            }, 300);
                        }, 50);
                    } else {
                        // 1 获取高度
                        maxHeight.value = getHeight();

                        await nextTick();

                        setTimeout(() => {
                            // 2 设置0
                            maxHeight.value = "0rpx";

                            timer = setTimeout(() => {
                                isExpand.value = false;
                            }, 300);
                        }, 50);
                    }
                }
            };

            // 选择
            const toCheck = () => {
                parent.value?.updateValue(getKey("value"));
            };

            // 获取key
            const getKey = (key, value) => {
                if (!value) {
                    value = props.data;
                }
                return parent.value?.getKey?.(key, value);
            };

            // 点击
            const toTap = () => {
                if (isLeaf.value || parent.value?.checkStrictly) {
                    toCheck();
                } else {
                    toExpand();
                }
            };

            watch(
                () => props.data.isExpand,
                val => !val && toExpand(false)
            );

            return { isExpand, maxHeight, itemStyle, childStyle, isLeaf, isChecked, label, children, toExpand, getKey, toTap };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-tree-item {
        &__content {
            @apply flex items-center h-100% relative px-5 box-border;
            border-radius: $cui-border-radius;

            &:active {
                background-color: $cui-color-active;
            }
        }

        &__expand {
            @apply inline-flex items-center justify-center h-100%;

            .icon-caret {
                @apply inline-block transform-rotate--90 transition-transform transition-duration-300;
            }
        }

        &__label {
            @apply flex-1 relative pr-25 pl-2;
            font-size: $cui-font-size;
        }

        &__check {
            @apply hidden;
        }

        &__children {
            @apply overflow-hidden transition-all transition-duration-300;
        }

        &.is-expand {
            & > .cui-tree-item__content .icon-caret {
                @apply transform-rotate-0;
            }
        }

        &.is-checked {
            & > .cui-tree-item__content {
                color: $cui-color-primary;

                .cui-tree-item__check {
                    @apply block;
                }
            }
        }
    }
</style>
