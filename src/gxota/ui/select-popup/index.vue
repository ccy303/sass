<template>
    <view class="cui-select-popup" @tap="open" v-if="showPicker">
        <slot :label="text" :value="checked">
            <base-select-inner
                :height="height"
                :placeholder="placeholder"
                :disabled="disabled"
                :border="border"
                :round="round"
                :backgroundColor="backgroundColor"
                :borderRadius="borderRadius"
                :arrowIcon="arrowIcon"
                :padding="padding"
                :text="text"
            />
        </slot>
    </view>

    <!-- 弹出框 -->
    <base-popup
        :ref="setRefs('popup')"
        :padding="0"
        :title="title"
        direction="bottom"
        border-radius="24rpx 24rpx 0 0"
        show-close-btn
        @opened="onOpened"
        @close="onClose"
        @closed="onClosed"
    >
        <view class="cui-select-popup__wrap">
            <scroll-view
                class="cui-select-popup__container"
                :ref="setRefs('scroller')"
                scroll-y
                :scroll-into-view="scroller.view"
                :style="{
                    height: parseRpx(scrollerHeight),
                    maxHeight: parseRpx(scrollerHeight || scrollerMaxHeight)
                }"
            >
                <slot name="list">
                    <view class="cui-select-popup__list">
                        <view
                            class="cui-select-popup__item"
                            v-for="(item, index) in options"
                            :key="index"
                            :class="{ 'is-active': isActive(item.value) }"
                            :id="`item-${item.value}`"
                            @tap="check(item.value)"
                        >
                            <slot name="item" :item="item" :active="isActive(item.value)" :selection="selection">
                                {{ item.label }}

                                <base-icon class="is-check" name="check"></base-icon>
                            </slot>
                        </view>
                    </view>

                    <!-- 空态 -->
                    <view class="cui-select-popup__empty" v-show="options.length == 0">
                        <base-empty :fixed="false" />
                    </view>
                </slot>
            </scroll-view>

            <view class="cui-select-popup__footer" v-if="showFooter">
                <slot name="confirm">
                    <base-button round fill type="primary" size="large" :disabled="required ? selection.length == 0 : false" @tap="confirm">
                        确定
                    </base-button>
                </slot>
            </view>
        </view>
    </base-popup>
</template>

<script>
    import { isArray, isEmpty, last } from "lodash-es";
    import { useRefs } from "../../hooks";
    import { parseRpx } from "../../utils";
    import { Props } from "../select-inner/config";

    export default defineComponent({
        name: "BaseSelectPopup",
        props: {
            ...Props,
            // 绑定值
            modelValue: [String, Number, Array],
            // 标题
            title: String,
            // 滚动高度
            scrollerHeight: [String, Number],
            // 最大滚动高度
            scrollerMaxHeight: { type: [String, Number], default: 600 },
            // 选项列表
            options: { type: Array, default: () => [] },
            // 是否多选
            multiple: Boolean,
            // 是否显示选择器
            showPicker: { type: Boolean, default: true },
            // 是否显示底部
            showFooter: { type: Boolean, default: true },
            // 是否必填
            required: Boolean
        },

        emits: ["update:modelValue", "change", "confirm", "opened", "close", "closed"],

        setup(props, { emit }) {
            const { refs, setRefs } = useRefs();

            // 已选
            const checked = ref([]);

            // 选中项
            const selection = ref([]);

            // 显示的文本内容
            const text = computed(() => {
                return checked.value.map(e => props.options.find(a => a.value == e)?.label).join("、");
            });

            // 滚动条
            const scroller = reactive({
                stop: null,
                view: "",

                clear() {
                    scroller.stop?.();
                    scroller.view = "";
                },

                watch() {
                    scroller.stop = watch(
                        () => [checked.value, props.options],
                        () => {
                            if (!isEmpty(checked.value) && !isEmpty(props.options)) {
                                nextTick(() => {
                                    scroller.view = `item-${last(checked.value)}`;
                                    scroller.stop?.();
                                });
                            }
                        },
                        { immediate: true, deep: true }
                    );
                }
            });

            // 打开
            const open = () => {
                // 打开弹出
                refs.popup?.open();

                // 监听是否滚动
                scroller.watch();

                // 设置选中值
                selection.value = [...checked.value];
            };

            // 打开完成事件
            const onOpened = () => {
                emit("opened");
            };

            // 关闭
            const close = () => {
                refs.popup?.close();
            };

            // 关闭事件
            const onClose = () => {
                scroller.clear();
                emit("close");
            };

            // 关闭完成事件
            const onClosed = () => {
                emit("closed");
            };

            // 选中
            const check = value => {
                const i = selection.value.indexOf(value);

                if (props.multiple) {
                    if (i >= 0) {
                        selection.value.splice(i, 1);
                    } else {
                        selection.value.push(value);
                    }
                } else {
                    if (i >= 0) {
                        selection.value = [];
                    } else {
                        selection.value = [value];
                    }
                }
            };

            // 确认
            const confirm = () => {
                const v = props.multiple ? selection.value : selection.value[0];

                emit("update:modelValue", v);
                emit("change", v);
                emit("confirm", v);
                close();
            };

            // 是否选中
            const isActive = value => {
                return selection.value.includes(value);
            };

            // 监听值
            watch(
                () => props.modelValue,
                value => {
                    if (isArray(value)) {
                        checked.value = [...(value || [])];
                    } else {
                        checked.value = value === undefined ? [] : [value];
                    }

                    selection.value = checked.value;
                },
                { deep: true, immediate: true }
            );

            return {
                refs,
                setRefs,
                checked,
                selection,
                text,
                scroller,
                open,
                onOpened,
                close,
                onClose,
                onClosed,
                confirm,
                check,
                isActive,
                parseRpx
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-select-popup {
        &__list {
            @apply px-15 py-5;
        }

        &__item {
            @apply flex-center font-size-14 h-45;
            border-bottom: $cui-border-width solid #eee;

            .is-check {
                @apply hidden;
            }

            &:last-child {
                @apply border-b-0;
            }

            &.is-active {
                color: $cui-color-primary;

                .is-check {
                    @apply inline-block;
                }
            }
        }

        &__empty {
            @apply pt-15 pb-30;
        }

        &__footer {
            @apply p-15;
        }
    }
</style>
