<template>
    <div class="cui-filter-item" :class="classList" @tap="tapItem">
        <!-- 文本内容 -->
        <span class="cui-filter-item__label">{{ dropdown.name || label }}</span>

        <!-- 下拉菜单 -->
        <template v-if="type == 'dropdown'">
            <base-icon class="cui-filter-item__dropdown-icon" name="caret-bottom"></base-icon>
        </template>

        <!-- 开关 -->
        <template v-else-if="type == 'switch'"> </template>

        <!-- 排序 -->
        <template v-else-if="type == 'order'">
            <div class="cui-filter-item__order" :class="[`is-${value}`]">
                <!-- 升序，降序图标 -->
                <span class="cui-filter-item__order-asc"></span>
                <span class="cui-filter-item__order-desc"></span>
            </div>
        </template>

        <!-- 展开内容 -->
        <div class="cui-filter-item__dropdown-box" :class="[`theme-${theme}`]">
            <slot name="dropdown">
                <template v-if="dropdown.list">
                    <!-- 数据 -->
                    <template v-if="dropdown.list.length > 0">
                        <!-- 列表 -->
                        <scroll-view class="cui-filter-item__dropdown-box__list" scroll-y>
                            <div
                                class="cui-filter-item__dropdown-box__item"
                                :class="[item.checked ? 'is-checked' : '', item.disabled ? 'is-disabled' : '']"
                                :style="{ width: itemWidth }"
                                v-for="(item, index) in dropdown.list"
                                :key="index"
                                @tap.stop="checkItem(item)"
                            >
                                <text class="cui-filter-item__dropdown-box__label">{{ item.label }}</text>
                                <base-icon class="cui-icon-check" name="check"></base-icon>
                            </div>
                        </scroll-view>

                        <!-- 多选下的操作按钮 -->
                        <div class="cui-filter-item__dropdown-box__btn" v-if="multiple">
                            <base-row :gutter="30">
                                <base-col :span="12">
                                    <base-button fill round @tap="clear">清空</base-button>
                                </base-col>

                                <base-col :span="12">
                                    <base-button fill round type="primary" @tap="confirm">确认</base-button>
                                </base-col>
                            </base-row>
                        </div>
                    </template>

                    <!-- 空态 -->
                    <template v-else>
                        <slot name="empty">
                            <div class="cui-filter-item__dropdown-box__empty">暂无数据</div>
                        </slot>
                    </template>
                </template>
            </slot>
        </div>
    </div>
</template>

<script>
    import { getParent } from "../../utils";

    export default defineComponent({
        name: "BaseFilterItem",

        props: {
            // 唯一标识
            prop: { type: String, required: true },
            // 类型  PropType<"dropdown" | "order" | "switch">
            type: { type: String, default: "switch" },
            // 标题
            label: String,
            // 是否禁用
            disabled: Boolean,
            // 下拉框是否多选
            multiple: Boolean,
            // 下拉框主题  PropType<"default" | "grid">
            theme: { type: String, default: "default" },
            // 格布局下的列数
            gridCols: { type: Number, default: 4 },
            // 下拉数据选项  PropType<Item[]>
            options: { type: Array, default: () => [] }
        },

        emits: ["change"],

        setup(props, { emit }) {
            // <base-filter-bar />
            const parent = getParent("BaseFilterBar", ["form", "setExpand", "update", "close", "collapse"], ["collapse", "clear"]);

            // 下拉框
            const dropdown = reactive({ name: "", list: [], isExpand: false });

            watch(
                () => props.options,
                val => {
                    dropdown.list = val;
                },
                { immediate: true }
            );

            // 绑定值
            const value = computed(() => {
                const v = parent.value?.form[props.prop];

                switch (props.type) {
                    case "dropdown":
                        if (!props.multiple) {
                            const d = dropdown.list.find(e => e.value == v);
                            if (d) {
                                // eslint-disable-next-line
                                dropdown.name = d.label;
                            }
                        }
                        break;
                }
                return v;
            });

            // 样式
            const classList = computed(() => {
                return [
                    {
                        "is-switch": value.value && props.type == "switch",
                        "is-expand": dropdown.isExpand,
                        "is-only": !parent.value,
                        "is-disabled": props.disabled
                    }
                ];
            });

            // 每项宽度
            const itemWidth = computed(() => {
                return props.theme == "grid" ? `calc(${100 / props.gridCols}% - 20rpx)` : "auto";
            });

            // 点击项
            const tapItem = () => {
                // 已禁用
                if (props.disabled) {
                    return false;
                }

                // 关闭其他遮罩层
                if (parent.value) {
                    parent.value.collapse(props.prop);
                }

                switch (props.type) {
                    case "dropdown":
                        if (dropdown.isExpand) {
                            collapse();
                        } else {
                            let arr = props.multiple ? value.value || [] : [value.value];

                            dropdown.list.map(e => {
                                e.checked = arr.includes(e.value);

                                // 设置单选的选中标题
                                if (e.checked) {
                                    if (!props.multiple) {
                                        dropdown.name = e.label;
                                    }
                                }
                            });

                            expand();
                        }
                        break;

                    case "switch":
                        update(!value.value);
                        break;

                    case "order":
                        // 修改排序
                        if (!value.value) {
                            update("asc");
                        } else if (value.value == "asc") {
                            update("desc");
                        } else if (value.value == "desc") {
                            update("");
                        }
                        break;
                }
            };

            // 选择项
            const checkItem = item => {
                // 已禁用
                if (item.disabled) {
                    return false;
                }

                if (props.multiple) {
                    item.checked = !item.checked;
                } else {
                    if (item.checked) {
                        item.checked = false;

                        dropdown.name = props.label || "";
                        update(undefined);
                    } else {
                        dropdown.list.forEach(e => {
                            e.checked = e.value == item.value;
                        });

                        // 更新标题
                        dropdown.name = item.label;
                        // 更新数据
                        update(item.value);
                    }

                    // 收起下拉框
                    collapse();
                }
            };

            // 展开下拉框
            const expand = () => {
                if (!dropdown.isExpand) {
                    dropdown.isExpand = true;

                    if (parent.value) {
                        parent.value.setExpand(true);
                    }
                }
            };

            // 收起下拉框：prop 为空收起当前，否则收起除 prop 外的所有
            const collapse = prop => {
                if (prop == props.prop) {
                    return false;
                }

                if (dropdown.isExpand) {
                    dropdown.isExpand = false;

                    if (parent.value) {
                        parent.value.setExpand(false);
                    }
                }
            };

            // 下拉框多选确认
            const confirm = () => {
                update(dropdown.list.filter(e => e.checked).map(e => e.value));
                collapse();
            };

            // 清空
            const clear = () => {
                if (props.multiple) {
                    update([], "clear");
                } else {
                    update(undefined, "clear");
                }

                dropdown.name = props.label || "";

                collapse();
            };

            // 更新数据
            const update = (value, action) => {
                emit("change", value);

                if (parent.value) {
                    parent.value.update({
                        prop: props.prop,
                        value,
                        action
                    });
                }
            };

            return { value, classList, dropdown, itemWidth, checkItem, tapItem, confirm, clear, collapse };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-filter-item {
        @apply flex-center flex-1 h-40 w-100% bg-#fff color-#727272 px-10 box-border;

        &__label {
            @apply mr-2 overflow-hidden text-ellipsis whitespace-nowrap;
        }

        &__order {
            @apply flex flex-col items-center w-16;

            &-asc,
            &-desc {
                @apply my-1 size-0 border-rd-3 border-5 border-solid border-transparent;
            }

            &-asc {
                @apply border-b-#ccc;
            }

            &-desc {
                @apply border-t-#ccc;
            }

            &.is-asc {
                .cl-filter-item__order-asc {
                    border-bottom-color: $cui-color-primary;
                }
            }

            &.is-desc {
                .cui-filter-item__order-desc {
                    border-top-color: $cui-color-primary;
                }
            }
        }

        &__dropdown {
            &-icon {
                @apply block font-size-16 transition-transform transition-duration-300;
            }

            &-box {
                @apply absolute top-40 left-0 max-h-0 w-100% bg-#fff transition-max-height transition-duration-300 overflow-hidden;

                &__label {
                    @apply flex-1 overflow-hidden text-ellipsis whitespace-nowrap;
                }

                &__empty {
                    @apply text-center m-25 color-#999;
                }

                &__btn {
                    @apply px-15 py-10;
                }

                &__list {
                    @apply max-h-250;
                }

                &.theme-default {
                    .cui-filter-item__dropdown-box {
                        &__item {
                            @apply flex items-center h-40 px-20;

                            .cui-icon-check {
                                @apply hidden;
                            }

                            &.is-checked {
                                color: $cui-color-primary;

                                .cui-icon-check {
                                    @apply block;
                                }
                            }

                            &.is-disabled {
                                color: $cui-color-disabled;
                            }
                        }
                    }
                }

                &.theme-grid {
                    .cui-filter-item__dropdown-box {
                        &__list {
                            @apply flex flex-wrap box-border px-10;
                        }

                        &__item {
                            @apply inline-flex items-center text-center h-35 bg-#f6f7fa border-rd-5 m-5 px-5 box-border;

                            .cui-icon-check {
                                @apply hidden;
                            }

                            &.is-checked {
                                @apply font-bold;
                                color: $cui-color-primary;
                                background-color: rgba($cui-color-primary, 0.1);
                            }

                            &.is-disabled {
                                color: $cui-color-disabled;
                            }
                        }
                    }
                }
            }
        }

        &.is-expand {
            .cui-filter-item__dropdown-icon {
                @apply transform-rotate-180;
            }

            .cui-filter-item {
                &__dropdown-icon,
                &__label {
                    color: $cui-color-primary;
                }

                &__dropdown-box {
                    @apply max-h-298 transition-max-height transition-delay-300;
                }
            }
        }

        &.is-only {
            @apply relative z-9;
        }

        &.is-switch {
            color: $cui-color-primary;
        }

        &.is-disabled {
            color: $cui-color-disabled;
        }
    }
</style>
