<template>
    <base-select-popup ref="popup" title="选择节点" :max-height="maxHeight" :show-picker="showPicker" @close="onClose">
        <template #list>
            <view class="cui-tree-select">
                <base-tree
                    v-if="visible"
                    v-model="value"
                    :data="data"
                    :row-height="rowHeight"
                    :check-strictly="checkStrictly"
                    :default-expand-all="defaultExpandAll"
                    :auto-expand="autoExpand"
                    :accordion="accordion"
                    :multiple="multiple"
                    :keys="keys"
                />
            </view>
        </template>

        <template #confirm>
            <base-button round fill type="primary" size="large" :disabled="!isChecked" @tap="save">确定</base-button>
        </template>
    </base-select-popup>
</template>

<script>
    import { TreeProps, useTree } from "../tree/helper";
    import { parseRpx } from "../../utils";
    import { cloneDeep, isEmpty } from "lodash-es";

    export default defineComponent({
        name: "BaseTreeSelect",

        props: {
            maxHeight: { type: [String, Number], default: 800 },
            showPicker: { type: Boolean, default: true },
            ...TreeProps
        },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { label } = useTree({ props });

            // 选择弹框
            const popup = ref();

            // 是否可见
            const visible = ref(false);

            // 绑定值
            const value = ref();

            // 是否选择了
            const isChecked = computed(() => {
                return !(props.multiple ? isEmpty(value.value) : value.value === undefined || value.value === null || value.value === "");
            });

            // 打开
            const open = () => {
                visible.value = true;
                value.value = cloneDeep(props.modelValue);
                popup.value?.open();
            };

            // 关闭
            const close = () => {
                popup.value?.close();
            };

            // 关闭事件
            const onClose = () => {
                visible.value = false;
            };

            // 保存
            const save = () => {
                emit("update:modelValue", value.value);
                emit("change", value.value);
                close();
            };

            return { popup, visible, value, label, open, close, save, onClose, parseRpx, isChecked };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-tree-select {
        @apply p-5;
    }
</style>
