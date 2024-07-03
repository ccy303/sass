<template>
    <div class="cui-filter-bar__wrap" :class="[{ 'is-expand': isExpand }]">
        <!-- 过滤栏 -->
        <div class="cui-filter-bar" :style="{ zIndex }">
            <slot></slot>
        </div>

        <!-- 遮罩层 -->
        <div class="cui-filter-bar__mask" @tap="close" @touchmove.stop.prevent></div>
    </div>
</template>

<script>
    export default defineComponent({
        name: "BaseFilterBar",

        options: { styleIsolation: "shared" },

        props: {
            // 绑定值
            modelValue: { type: Object, default: () => ({}) },
            // 兼容参数
            num: Number
        },

        emits: ["update:modelValue", "change", "clear"],

        setup(props, { emit }) {
            const { proxy } = getCurrentInstance();

            // 表单值
            const form = ref(props.modelValue);

            watch(
                () => props.modelValue,
                val => {
                    form.value = val;
                },
                { immediate: true, deep: true }
            );

            // 计时器
            let timer = null;

            // 是否展开
            const isExpand = ref(false);

            // 层级
            const zIndex = ref(1);

            // 设置是否展开。收起延迟300，避免动画未结束导致层级低了问题
            const setExpand = f => {
                clearTimeout(timer);
                if (f) {
                    zIndex.value = 999;
                } else {
                    timer = setTimeout(() => {
                        zIndex.value = 1;
                    }, 300);
                }

                isExpand.value = f;
            };

            // 收起下拉框
            const collapse = prop => {
                proxy.__children.forEach(e => {
                    e.collapse(prop);
                });
            };

            // 关闭当前遮罩层及收起下拉框
            const close = () => {
                setExpand(false);
                collapse();
            };

            // cl-filter-item 数据发生改变时触发
            const update = data => {
                form.value[data.prop] = data.value;

                if (data.action != "clear") {
                    emit("update:modelValue", form.value);
                    emit("change", data);
                }
            };

            // 清空
            const clear = () => {
                proxy.__children.forEach(e => e.clear());

                emit("update:modelValue", form.value);
                emit("clear");
            };

            return { form, zIndex, isExpand, setExpand, collapse, close, clear, update };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-filter-bar__wrap {
        .cui-filter-bar__mask {
            @apply fixed left-0 top-0 size-100% opacity-0 pointer-events-none;
            background-color: rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease-in-out;
            z-index: $cui-zIndex;
        }

        .cui-filter-bar {
            @apply flex items-center font-size-13 bg-#fff box-border relative;
        }

        &.is-expand {
            .cui-filter-bar__mask {
                @apply opacity-100 pointer-events-auto;
            }
        }
    }
</style>

<style>
    base-filter-item {
        @apply flex-1;
    }
</style>
