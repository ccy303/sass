<template>
    <div class="cui-list-index">
        <!-- 搜索栏 -->
        <div class="cui-list-index__search" v-if="searchBar">
            <base-input
                class="cui-list-index__search__input"
                v-model="keyWord"
                :border="false"
                round
                :placeholder="placeholder"
                background-color="#f6f7fa"
                clearable
            >
                <template #prepend>
                    <base-icon name="search"></base-icon>
                </template>
            </base-input>
        </div>

        <div class="cui-list-index__container">
            <!-- 滚动视图 -->
            <scroll-view
                class="cui-list-index__scroller"
                scroll-y
                enable-back-to-top
                scroll-with-animation
                :scroll-into-view="`index-${label}`"
                @scroll="onScroll"
            >
                <!-- 追加内容到头部 -->
                <slot name="prepend"></slot>

                <!-- 分组数据 -->
                <div class="group" v-for="(item, index) in flist" :key="index" :id="`index-${item.label}`">
                    <!-- 关键字 -->
                    <div class="header" :class="{ 'is-active': curr?.label == item.label }">
                        <slot name="header" :item="item" :isActive="curr?.label == item.label">
                            <span>{{ item.label }}</span>
                        </slot>
                    </div>

                    <!-- 数据列表 -->
                    <div class="container">
                        <div v-for="(item2, index2) in item.children" :key="index2">
                            <slot name="item" :item="item2" :index="index2" :group="item" :isActive="curr?.label == item.label">
                                <div class="item" :class="{ 'is-disabled': item2.disabled }" @tap="onSelect(item2)">
                                    <base-checkbox
                                        :model-value="isChecked(item2)"
                                        :disabled="item2.disabled"
                                        round
                                        :margin="[0, 10, 0, 0]"
                                        v-if="selectable"
                                    />

                                    <div class="avatar">
                                        <base-avatar :src="item2[localDict.avatar]"></base-avatar>
                                    </div>

                                    <div class="text">
                                        {{ item2[localDict.name] }}
                                    </div>
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>

                <!-- 追加内容到尾部 -->
                <slot name="append"></slot>
            </scroll-view>
        </div>

        <!-- 索引栏 -->
        <div class="cui-list-index__bar" v-if="indexBar">
            <div class="list" @touchmove.stop.prevent="barMove" @touchend="barEnd">
                <div
                    class="block"
                    :class="{ 'is-active': curr?.label == item.label }"
                    v-for="(item, index) in flist"
                    :key="index"
                    :id="`${index}`"
                    @touchstart.stop.prevent="toRow(item)"
                >
                    <span class="text">{{ item.label }}</span>
                </div>
            </div>
        </div>

        <!-- 索引关键字 -->
        <div class="cui-list-index__alert" v-show="alert && curr">{{ curr?.label }}</div>
    </div>
</template>

<script>
    import py from "js-pinyin";
    import { groupBy, isEmpty } from "lodash-es";

    export default defineComponent({
        name: "BaseListIndex",

        props: {
            // 数据列表
            data: { type: Array, required: true, default: () => [] },
            // 字典
            dict: Object,
            // 是否可选
            selectable: Boolean,
            // 已选列表
            selection: { type: Array, default: () => [] },
            // 是否分组
            isGroup: { type: Boolean, default: true },
            // 显示序号栏
            indexBar: { type: Boolean, default: true },
            // 显示搜索栏
            searchBar: { type: Boolean, default: true },
            // 搜索占位内容
            placeholder: { type: String, default: "搜索关键字" },
            // 延迟
            delay: Number
        },

        emits: ["select", "selection-change", "update:selection"],

        setup(props, { emit }) {
            const { proxy } = getCurrentInstance();

            // 列表
            const list = ref([]);

            // 已选列表
            const selection = ref([]);

            // 字典
            const localDict = reactive({ id: "id", avatar: "avatar", name: "name", ...props.dict });

            // 关键字
            const keyWord = ref("");

            // 标签
            const label = ref("");

            // 提示框
            const alert = ref(false);

            // 当前选择
            const curr = ref({});

            // 条
            const bar = reactive({
                top: 0,
                itemH: 0
            });

            // 每项距离顶部的高度
            const tops = ref([]);

            // 过滤列表
            const flist = computed(() => {
                const match = e => {
                    return e ? (e[localDict.name] || "").toLowerCase().includes(keyWord.value.toLowerCase()) : false;
                };

                return list.value
                    .filter(e => e.children && e.children.find(match))
                    .map(e => {
                        return {
                            ...e,
                            children: e.children.filter(match)
                        };
                    });
            });

            // 监听滚动
            const onScroll = e => {
                // 对比每个高度计算
                let num = tops.value.filter(top => e.detail.scrollTop >= top - (props.searchBar ? 60 : 0)).length - 1;

                if (num < 0) {
                    num = 0;
                }

                // 设置当前
                curr.value = list.value[num];
            };

            // 定位到某行
            const toRow = item => {
                alert.value = true;
                curr.value = item;
            };

            // 选择行
            const onSelect = item => {
                if (item.disabled) {
                    return false;
                }

                if (props.selectable) {
                    const index = selection.value.findIndex(e => e[localDict.id] == item[localDict.id]);

                    if (index < 0) {
                        selection.value.push(item);
                    } else {
                        selection.value.splice(index, 1);
                    }

                    emit("selection-change", selection.value);
                    emit("update:selection", selection.value);
                } else {
                    emit("select", item);
                }
            };

            // 移动
            const barMove = e => {
                const max = list.value.length;

                let index = parseInt(String((e.touches[0].clientY - bar.top) / bar.itemH));

                if (index >= max) {
                    index = max - 1;
                }

                if (index < 0) {
                    index = 0;
                }

                curr.value = list.value[index];
            };

            // 离开
            const barEnd = () => {
                if (curr.value) {
                    label.value = curr.value.label;
                }

                alert.value = false;
            };

            // 整理布局
            const doLayout = () => {
                nextTick(() => {
                    setTimeout(() => {
                        // 获取索引栏大小
                        uni.createSelectorQuery()
                            .in(proxy)
                            .select(".cui-list-index__bar .list")
                            .boundingClientRect(res => {
                                if (res) {
                                    bar.top = res.top;
                                    bar.itemH = res.height / list.value.length;
                                }
                            })
                            .exec();

                        // 获取当前距离顶部的高度
                        uni.createSelectorQuery()
                            .in(proxy)
                            .select(".cui-list-index")
                            .boundingClientRect(res => {
                                // 获取每项距离顶部的高度
                                uni.createSelectorQuery()
                                    .in(proxy)
                                    .selectAll(".header")
                                    .fields(
                                        {
                                            rect: true,
                                            size: true
                                        },
                                        () => {}
                                    )
                                    .exec(d => {
                                        tops.value = d[0].map(e => e.top - res.top);
                                    });
                            })
                            .exec();
                    }, props.delay || 0);
                });
            };

            // 是否选中
            const isChecked = item => {
                return Boolean(selection.value.find(e => e[localDict.id] == item[localDict.id]));
            };

            // 更新行数据
            const updateRow = (id, value) => {
                list.value.forEach(a => {
                    if (a.children) {
                        const d = a.children.find(e => e[localDict.id] == id);

                        if (d) {
                            Object.assign(d, value);
                        }
                    }
                });
            };

            // 刷新
            const refresh = () => {
                if (isEmpty(props.data)) {
                    list.value = [];
                    return false;
                }

                // 是否分组
                if (!props.isGroup) {
                    list.value = props.data;
                    return false;
                }

                // 传入列表数据
                const data = props.data.map(e => {
                    return {
                        f: py.getCamelChars(e[localDict.name] || "*")[0],
                        ...e
                    };
                });

                // 数据分组
                const group = [];
                const g = groupBy(data, "f");

                for (const i in g) {
                    group.push({
                        label: i,
                        children: g[i]
                    });
                }

                list.value = group.sort((a, b) => {
                    const n1 = a.label.toUpperCase();
                    const n2 = b.label.toUpperCase();

                    if (n1 < n2) {
                        return -1;
                    }

                    if (n1 > n2) {
                        return 1;
                    }

                    return 0;
                });

                // 重做
                doLayout();
            };

            // 监听列表数据变化
            watch(() => props.data, refresh, {
                immediate: true
            });

            // 监听选择数据变化
            watch(
                () => props.selection,
                val => {
                    selection.value = [...val];

                    // 更新列表数据
                    selection.value.forEach(e => {
                        updateRow(e[localDict.id], e);
                    });
                },
                {
                    immediate: true
                }
            );

            return {
                localDict,
                list,
                keyWord,
                label,
                alert,
                curr,
                bar,
                flist,
                refresh,
                doLayout,
                barEnd,
                barMove,
                toRow,
                onScroll,
                onSelect,
                isChecked,
                updateRow
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-list-index {
        position: relative;
        height: 100%;

        &__search {
            display: flex;
            align-items: center;
            background-color: #fff;
            box-sizing: border-box;
            padding: 0 30rpx;
            height: 100rpx;

            &__input {
                flex: 1;
            }
        }

        &__container {
            height: calc(100% - 100rpx);

            &:first-child {
                height: 100%;
            }
        }

        &__scroller {
            height: 100%;

            .group {
                .header {
                    display: flex;
                    align-items: center;
                    height: 50rpx;
                    padding: 0 30rpx;
                    font-size: 26rpx;
                    position: sticky;
                    top: 0;
                    z-index: 9;
                    background-color: $cui-color-bg;
                    line-height: 1;

                    &.is-active {
                        .text {
                            color: $cui-color-primary;
                        }
                    }
                }

                .container {
                    background-color: #fff;
                }

                .item {
                    display: flex;
                    align-items: center;
                    min-height: 80rpx;
                    font-size: 26rpx;
                    box-sizing: border-box;
                    padding: 20rpx 30rpx;

                    &:last-child {
                        border-bottom: 0;
                    }

                    &:active {
                        background-color: $cui-color-active;
                    }

                    &.is-disabled {
                        opacity: 0.5;
                    }

                    .avatar {
                        height: 80rpx;
                        flex-shrink: 0;
                    }

                    .text {
                        margin: 0 30rpx;
                    }
                }
            }
        }

        &__alert {
            position: absolute;
            top: 0;
            right: 80rpx;
            bottom: 0;
            margin: auto;
            background: rgba(0, 0, 0, 0.5);
            width: 100rpx;
            height: 100rpx;
            border-radius: 10rpx;
            color: #fff;
            line-height: 100rpx;
            text-align: center;
            font-size: 48rpx;
            z-index: 100;
        }

        &__bar {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            right: 20rpx;
            top: 0;
            height: 100%;
            font-size: 24rpx;
            z-index: 20;

            .block {
                padding: 5rpx 10rpx;

                .text {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    height: 30rpx;
                    width: 30rpx;
                    border-radius: 30rpx;
                }

                &.is-active {
                    .text {
                        background-color: $cui-color-primary;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
