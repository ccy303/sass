<template>
    <div class="cui-waterfall" v-if="visible">
        <!-- 纵向 -->
        <template v-if="direction === 'vertical'">
            <div class="cui-waterfall__item" v-for="(item, index) in list" :key="index">
                <slot :item="item" :index="index"></slot>
            </div>
        </template>

        <!-- 横向 -->
        <template v-else-if="direction === 'horizontal'">
            <slot :list="list"></slot>
        </template>

        <!-- 空态 -->
        <slot name="empty" v-if="showEmpty">
            <base-empty />
        </slot>
    </div>
</template>

<script>
    import { flatMap, isEmpty } from "lodash-es";
    import { parseRpx } from "../../utils";
    import { onShow } from "@dcloudio/uni-app";

    export default defineComponent({
        name: "BaseWaterfall",

        options: { styleIsolation: "shared" },

        props: {
            // 列的数量
            column: { type: Number, default: 2 },
            // 列间隔
            gutter: { type: Number, default: 20 },
            // 布局方向   PropType<"horizontal" | "vertical">
            direction: { type: String, default: "horizontal" },
            // 匹配值
            nodeKey: { type: String, default: "id" }
        },

        setup(props) {
            const { proxy } = getCurrentInstance();

            const visible = ref(true);

            // 列表
            const list = ref([]);

            // 每次追加的数据
            let data = [];

            // 列数量
            const columnCount = computed(() => (props.direction == "vertical" ? props.column : "none"));

            // 列间距
            const columnGap = computed(() => (props.direction == "vertical" ? parseRpx(props.gutter) : "none"));

            // 是否空
            const showEmpty = computed(() => {
                return list.value.filter(e => !isEmpty(e)).length == 0;
            });

            // 刷新列表
            const refresh = data => {
                visible.value = false;

                nextTick(() => {
                    visible.value = true;

                    switch (props.direction) {
                        case "horizontal":
                            list.value = new Array(props.column).fill(1).map(() => []);

                            // 等待 cl-waterfall-column 渲染完成后追加数据
                            nextTick(() => {
                                append(data);
                            });
                            break;
                        case "vertical":
                            list.value = data;
                            break;
                    }
                });
            };

            // 计算高度，一个个往列表追加
            const append = async arr => {
                data = arr;

                for (let i = 0; i < arr.length; i++) {
                    const next = async () => {
                        const rects = await getRect();

                        // 获取不到的时候阻断掉
                        if (isEmpty(rects) && i !== 0) {
                            return false;
                        }

                        // 获取 cl-waterfall-column 的高度，比较后在最小的列中塞入
                        return Promise.all(rects).then(res => {
                            let colsHeight = res.map(e => e.height);

                            let minH = Math.min(...colsHeight);
                            let index = colsHeight.indexOf(minH);

                            if (index < 0) {
                                index = 0;
                            }

                            list.value[index]?.push(arr[i]);

                            return true;
                        });
                    };

                    await next();
                }
            };

            // 更新单条数据，根据nodeKey来匹配
            const update = (id, data) => {
                const next = e => {
                    const d = e[props.nodeKey] === id;

                    if (d) {
                        Object.assign(e, data);
                    }

                    return Boolean(d);
                };

                switch (props.direction) {
                    case "horizontal":
                        list.value.find(col => {
                            return col.find(next);
                        });
                        break;
                    case "vertical":
                        list.value.find(next);
                        break;
                }
            };

            // 清空列表
            const clear = () => {
                list.value = [];
            };

            // 获取列
            const getRect = () => {
                return new Promise(resolve => {
                    // #ifdef MP
                    let timer = null;

                    const fn = () => {
                        const children = proxy.$children;
                        if (isEmpty(children)) {
                            timer = setTimeout(() => {
                                fn();
                            }, 50);
                        } else {
                            clearTimeout(timer);
                            const arr = children.filter(e => e.getRect).map(e => e.getRect());
                            resolve(arr);
                        }
                    };

                    fn();
                    // #endif

                    // #ifndef MP
                    nextTick(() => {
                        uni.createSelectorQuery().in(proxy.$root).selectAll(`.cui-waterfall-column`).boundingClientRect(resolve).exec();
                    });
                    // #endif
                });
            };

            // 重新布局，在加载中切换页面导致计算错误，返回页面时 onShow 重新计算
            const doLayout = () => {
                // 列空的时候 重新追加数据
                if (isEmpty(flatMap(list.value)) && !isEmpty(data)) {
                    append(data);
                }
            };

            onShow(() => {
                doLayout();
            });

            return { visible, list, columnCount, columnGap, refresh, append, update, clear, showEmpty, doLayout };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-waterfall {
        @apply w-100% box-border;

        &::after {
            content: "";
            @apply block clear-both;
        }
    }
</style>
