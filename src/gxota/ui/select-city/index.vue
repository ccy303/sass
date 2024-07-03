<template>
    <view class="cui-select-city" @tap="open">
        <slot :value="modelValue" :label="text" :selection="selection">
            <base-select-inner
                :height="height"
                :placeholder="placeholder"
                :disabled="disabled"
                :border="border"
                :round="round"
                :backgroundColor="backgroundColor"
                :borderRadius="borderRadius"
                :padding="padding"
                :text="text"
            />
        </slot>
    </view>

    <!-- 弹出框 -->
    <base-select-popup :ref="setRefs('popup')" :title="title" :show-picker="false" :show-footer="false" scroller-height="70vh">
        <template #list>
            <view class="cui-select-city__wrap">
                <view class="cui-select-city__tabs">
                    <base-tag
                        v-for="(item, index) in tabs"
                        :key="index"
                        round
                        :type="active == index ? 'primary' : 'info'"
                        :margin="[0, 20, 20, 0]"
                        @tap="toActive(index)"
                    >
                        {{ item?.[labelKey] || "请选择" }}
                    </base-tag>
                </view>

                <view class="cui-select-city__list">
                    <swiper class="swiper" :current="active" @change="onActiveChange">
                        <swiper-item class="swiper-item" v-for="(listItem, index) in list" :key="cache.list[index]">
                            <base-list-index :data="listItem" :search-bar="false" :dict="{ id: valueKey }" :delay="500">
                                <template #item="{ item }">
                                    <view
                                        class="cui-select-city__item"
                                        :class="{ 'is-active': item[valueKey] == value[index] }"
                                        @tap="select(item, index)"
                                    >
                                        <base-icon class="icon" name="toast-success" />
                                        <span>{{ item[labelKey] }}</span>
                                    </view>
                                </template>
                            </base-list-index>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </template>

        <template #confirm></template>
    </base-select-popup>
</template>

<script>
    import { useRefs } from "../../hooks";
    import { cloneDeep, isEmpty } from "lodash-es";
    import { Props } from "../select-inner/config.js";
    import { uuid } from "../../utils";

    import CityPca from "../select-region/city-pca.json";
    // 省市区其他数据来源 https://github.com/modood/Administrative-divisions-of-China

    export default defineComponent({
        name: "BaseSelectCity",

        props: {
            ...Props,
            data: { type: Array, default: CityPca },
            modelValue: Array,
            // 标题
            title: { type: String, default: "请选择所在地区" },
            // 显示关键字
            labelKey: { type: String, default: "name" },
            // 值关键字
            valueKey: { type: String, default: "name" },
            // 占位文本
            placeholder: { type: String, default: "请选择所在地区" },
            // 分隔符
            separator: { type: String, default: " - " }
        },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { refs, setRefs } = useRefs();

            // picker 绑定值
            const value = ref([]);

            // 第几个块
            const active = ref(0);

            // 各个列表
            const list = computed(() => {
                let arr = props.data;

                const ots = value.value.map(a => {
                    const d = arr.find(b => b[props.valueKey] == a);

                    if (d) {
                        arr = d.children || [];
                        return arr;
                    } else {
                        return [];
                    }
                });

                return [props.data, ...ots].filter(e => !isEmpty(e));
            });

            // 选项卡
            const tabs = computed(() => {
                return value.value.map((a, i) => {
                    return list.value[i].find(b => b[props.valueKey] == a);
                });
            });

            // 已选
            const selection = ref([]);

            // 显示文本
            const text = computed(() => {
                return selection.value.map(e => e?.[props.labelKey]).join(props.separator);
            });

            // 设置值
            const setData = val => {
                value.value = cloneDeep(val || props.modelValue || []);

                // 默认值
                if (isEmpty(value.value) || value.value.find(e => !e)) {
                    value.value = [""];
                    active.value = 0;
                }

                // 设置已选
                selection.value = tabs.value.filter(Boolean).map(e => {
                    return {
                        ...e,
                        children: undefined
                    };
                });
            };

            // 缓存，重新渲染 list-index
            const cache = reactive({
                list: [],

                create() {
                    cache.list = value.value.map(uuid);
                },

                update() {
                    value.value.forEach((e, i) => {
                        if (!e) {
                            cache.list.splice(i, 99);
                            cache.list[i] = uuid();
                        }
                    });
                }
            });

            // 打开
            const open = () => {
                // 打开弹窗
                refs.popup.open();

                // 设置值
                setData();

                // 创建缓存
                cache.create();
            };

            // 关闭
            const close = () => {
                refs.popup.close();
            };

            // 保存
            const confirm = () => {
                emit("update:modelValue", value.value);
                emit("change", value.value);
                close();
            };

            // 选择
            const select = (item, index) => {
                // 编辑值，清空后几个
                if (value.value[index]) {
                    value.value.splice(index, 99);
                }

                // 设置值
                value.value[index] = item[props.valueKey];

                // 当前选择块
                const d = list.value[index].find(e => e[props.valueKey] == value.value[index]);

                if (isEmpty(d?.children)) {
                    // 最后一个直接完成
                    confirm();
                } else {
                    // 添加一块
                    value.value.push("");

                    // 更新缓存
                    cache.update();

                    // swiper 滚动
                    nextTick(() => {
                        active.value += 1;
                    });
                }
            };

            // 监听块滚动
            const onActiveChange = e => {
                // 设置序号
                active.value = e.detail.current;
            };

            // 滚动到指定块
            const toActive = index => {
                if (index !== undefined) {
                    active.value = index;
                } else {
                    active.value = value.value.length;
                }
            };

            // 监听值
            watch(() => props.modelValue, setData, {
                immediate: true,
                deep: true
            });

            return { refs, setRefs, list, value, cache, text, tabs, selection, confirm, open, close, select, onActiveChange, active, toActive };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-select-city {
        &__wrap {
            @apply flex flex-col h-100%;
        }

        &__tabs {
            @apply flex flex-wrap px-15;
        }

        &__list {
            @apply box-border flex-1;
            border-top: 1rpx solid $cui-color-bg;
            border-bottom: 1rpx solid $cui-color-bg;

            .swiper {
                @apply h-100%;

                .swiper-item {
                    @apply h-100%;
                }
            }
        }

        &__item {
            @apply flex items-center px-15 h-40 font-size-14;

            .icon {
                @apply hidden;
            }

            &.is-active {
                color: $cui-color-primary;

                .icon {
                    @apply inline-block mr-8;
                }
            }
        }
    }
</style>
