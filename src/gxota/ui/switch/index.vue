<template>
    <switch :class="classs" :checked="checked" :disabled="isDisabled" :color="color" @change="onChange" />
</template>

<script>
    import { useForm } from "../../hooks";

    export default defineComponent({
        props: {
            // 绑定值
            modelValue: [Boolean, String, Number],
            // 是否禁用
            disabled: { type: Boolean, default: null },
            // 打开时的值
            activeValue: { type: [Boolean, String, Number], default: true },
            // 关闭时的值
            inactiveValue: { type: [Boolean, String, Number], default: false },
            // 打开时的背景色
            color: String
        },
        options: { styleIsolation: "shared" },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            const { disabled } = useForm();

            // 是否选中
            const checked = computed(() => props.modelValue === props.activeValue);

            // 是否禁用
            const isDisabled = computed(() => disabled.value || props.disabled);

            // 监听变化
            const onChange = e => {
                const v = e.detail.value ? props.activeValue : props.inactiveValue;
                emit("update:modelValue", v);
                emit("change", v);
            };

            const classs = computed(() => {
                return ["cui-switch", { color: props.color }];
            });

            return { checked, isDisabled, onChange, classs };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-switch {
        @apply relative;
    }

    .color {
        :deep(.wx-switch-input) {
            background-color: v-bind(color) !important;
            border-color: v-bind(color) !important;
        }
        :deep(.wx-switch-input-checked) {
            border-color: v-bind(color) !important;
        }
    }

    :deep(.uni-switch-input-checked) {
        background-color: $cui-color-primary !important;
        border-color: $cui-color-primary !important;
    }

    :deep(.wx-switch-input) {
        background-color: $cui-color-primary !important;
        border-color: $cui-border-color !important;
    }
    :deep(.wx-switch-input-checked) {
        border-color: $cui-color-primary !important;
    }
</style>
