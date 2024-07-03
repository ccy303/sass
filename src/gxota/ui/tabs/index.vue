<template>
    <div
        class="cui-tabs"
        :class="[{ 'is-content': $slots.default, 'is-fill': fill, 'is-border': border, 'is-dropdown': showDropdown, 'is-checkable': checkable }]"
        :style="{ backgroundColor: backgroundColor }"
    >
        <div class="cui-tabs__header">
            <scroll-view class="cui-tabs__bar" scroll-with-animation scroll-x :scroll-left="scrollLeft" :style="{ height: parseRpx(height) }">
                <div class="cui-tabs__bar-box" :style="{ 'justify-content': justify }">
                    <div
                        class="cui-tabs__bar-item"
                        v-for="(item, index) in tabs"
                        :key="index"
                        :style="{ color: current === item.value ? color : unColor, padding: `0 ${gutter}rpx` }"
                        :class="{ 'is-active': current === item.value }"
                        @tap="change(index)"
                    >
                        <!-- 前缀图标 -->
                        <base-icon v-if="item.prefixIcon" class="cui-tabs__icon is-prefix" :name="item.prefixIcon"></base-icon>

                        <!-- 文本内容 -->
                        <span class="cui-tabs__label">{{ item.label }}</span>

                        <!-- 后缀图标 -->
                        <base-icon v-if="item.suffixIcon" class="cui-tabs__icon is-suffix" :name="item.suffixIcon"></base-icon>
                    </div>

                    <!-- 选中样式 -->
                    <div class="cui-tabs__line" v-if="lineLeft > 0 && showLine" :style="{ 'background-color': color, left: lineLeft + 'px' }"></div>
                </div>
            </scroll-view>

            <!-- 下拉图标 -->
            <div class="cui-tabs__dropdown" @tap="openDropdown" v-if="showDropdown">
                <base-icon :name="`${dropdown.visible ? 'arrow-top' : 'arrow-bottom'}`"></base-icon>
            </div>

            <!-- 下拉列表 -->
            <div class="cui-tabs__dropdown-box" :style="{ maxHeight: dropdown.visible ? dropdown.height : '0' }">
                <slot name="dropdown"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import { parseRpx } from "../../utils";

    export default defineComponent({
        name: "BaseTabs",

        props: {
            // 绑定值
            modelValue: [String, Number],
            // 高度
            height: { type: [String, Number], default: 80 },
            // 标签列表   PropType<{ label: string; value: any; [key: string]: any }[]>
            list: { type: Array, default: () => [] },
            // 是否循环显示
            loop: { type: Boolean, default: true },
            // 标签是否填充
            fill: Boolean,
            // 水平布局  PropType<"start" | "center" | "end">
            justify: { type: String, default: "start" },
            // 是否带有下边框
            border: { type: Boolean, default: true },
            // 标签间隔
            gutter: { type: Number, default: 30 },
            // 选中颜色
            color: { type: String, default: "" },
            // 未选中颜色
            unColor: { type: String, default: "" },
            // 背景色
            backgroundColor: { type: String, default: "#fff" },
            // 是否显示下拉按钮
            showDropdown: Boolean,
            // 显示下划线
            showLine: { type: Boolean, default: true },
            // 是否可选
            checkable: Boolean,
            // 是否禁用
            disabled: Boolean
        },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { proxy } = getCurrentInstance();

            // 当前选中
            const current = ref();

            // 下划线左位移
            const lineLeft = ref(0);

            // 左滚动距离
            const scrollLeft = ref(0);

            // 左位移
            const offsetLeft = ref(0);

            // 宽度
            const width = ref(375);

            // 列表
            const tabs = computed(() => props.list);

            // 刷新
            const refresh = () => {
                nextTick(() => {
                    // 获取选项卡宽度
                    uni.createSelectorQuery()
                        .in(proxy)
                        .select(".cui-tabs")
                        .boundingClientRect(d => {
                            offsetLeft.value = d.left;
                            width.value = d.width;
                            getRect();
                        })
                        .exec();
                });
            };

            // 下拉
            const dropdown = reactive({ visible: false, height: "200rpx", timer: null });

            // 打开下拉框
            const openDropdown = () => {
                dropdown.visible = !dropdown.visible;

                // 清除计时器
                clearTimeout(dropdown.timer);

                if (dropdown.visible) {
                    const fn = () => {
                        uni.createSelectorQuery()
                            .in(proxy)
                            .select(".cui-tabs__dropdown-box")
                            .boundingClientRect(res => {
                                dropdown.height = res.height + "px";
                            })
                            .exec();
                    };

                    // 获取下拉区域高度
                    dropdown.timer = setTimeout(fn, 300);
                }
            };

            // 关闭下拉框
            const closeDropdown = () => {
                dropdown.visible = false;
            };

            // 改变
            const change = async index => {
                if (props.disabled) {
                    return false;
                }

                let { value } = tabs.value[index];

                if (props.checkable) {
                    if (value == current.value) {
                        value = undefined;
                    }
                }

                emit("update:modelValue", value);
                emit("change", value);
                current.value = value;
            };

            // 获取下标
            const getIndex = () => {
                return tabs.value.findIndex(e => e.value == current.value);
            };

            // 上一个
            const prev = () => {
                let index = getIndex();

                change(index <= 0 ? (props.loop ? tabs.value.length - 1 : 0) : index - 1);
            };

            // 下一个
            const next = () => {
                let index = getIndex();

                change(index >= tabs.value.length - 1 ? (props.loop ? 0 : tabs.value.length - 1) : index + 1);
            };

            const rect = ref();

            // 大小
            const getRect = () => {
                nextTick(() => {
                    uni.createSelectorQuery()
                        .in(proxy)
                        .selectAll(".cui-tabs__bar-item")
                        .fields({ rect: true, size: true }, () => {})
                        .exec(d => {
                            rect.value = d[0];
                            onOffset();
                        });
                });
            };

            // 间距
            const onOffset = () => {
                if (rect.value) {
                    nextTick(() => {
                        let item = rect.value[getIndex()];

                        if (item) {
                            let x = item.left - (width.value - item.width) / 2 - offsetLeft.value;

                            if (x < 0) {
                                x = 0;
                            }

                            scrollLeft.value = x;
                            lineLeft.value = item.left + item.width / 2 - uni.upx2px(16) - offsetLeft.value;
                        }
                    });
                }
            };

            // 监听绑定值
            watch(
                () => props.modelValue,
                val => {
                    current.value = val;
                    onOffset();
                },
                { immediate: true }
            );

            // 监听列表改变
            watch(() => props.list, refresh);

            onMounted(() => {
                refresh();
            });

            return { current, scrollLeft, lineLeft, tabs, dropdown, change, prev, next, openDropdown, closeDropdown, parseRpx };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-tabs {
        @apply w-100%;

        &__header {
            @apply flex relative;
        }

        &__bar {
            @apply whitespace-nowrap box-border flex-1;

            .uni-scroll-view::-webkit-scrollbar {
                @apply hidden;
            }

            &-box {
                @apply inline-flex relative size-100%;
            }

            &-item {
                @apply inline-flex items-center justify-center h-100% text-14 box-border;

                .cui-tabs__icon {
                    @apply font-size-15;

                    &.is-prefix {
                        @apply mr-5;
                    }

                    &.is-suffix {
                        @apply ml-5;
                    }
                }

                .cui-tabs__label {
                    @apply whitespace-nowrap;
                }

                &.is-active {
                    color: $cui-color-primary;
                }
            }
        }

        &__dropdown {
            @apply flex-center inline-flex w-50 bg-transparent;

            &-box {
                @apply absolute top-40 left-0 w-100% box-border bg-#fff overflow-hidden z-99 transition-all transition-duration-300;
            }
        }

        &__line {
            @apply h-2 w-16 absolute bottom-1 border-rd-10 transition-all transition-duration-500;
            background-color: $cui-color-primary;
        }

        &.is-content {
            @apply h-100%;
        }

        &.is-fill {
            .cui-tabs__bar-item {
                @apply flex-1;
            }
        }

        &.is-border {
            .cui-tabs__header {
                border-bottom: $cui-border-width solid #eee;
            }
        }

        &.is-dropdown {
            .cui-tabs__bar {
                width: calc(100% - 100rpx);
            }
        }

        &.is-checkable {
            .cui-tabs__label {
                @apply px-10 py-4 border-rd-4;
                background-color: rgba($cui-color-primary, 0.05);
                color: $cui-color-primary;
            }

            .cui-tabs__bar-item {
                @apply p-0 mr-10;

                &.is-active {
                    .cui-tabs__label {
                        @apply color-#fff;
                        background-color: $cui-color-primary;
                    }
                }
            }
        }
    }
</style>
