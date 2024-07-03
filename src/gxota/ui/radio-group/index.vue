<template>
    <div class="cui-radio-group" :class="{ 'is-fill': fill }">
        <slot></slot>
    </div>
</template>

<script>
    export default defineComponent({
        name: "BaseRadioGroup",

        props: {
            // 绑定值
            modelValue: null,
            // 是否禁用
            disabled: Boolean,
            // 是否边框样式
            border: Boolean,
            // 是否宽度填充
            fill: Boolean,
            // 是否只显示文字
            text: Boolean,
            // 是否圆角
            round: Boolean,
            // 图标大小
            size: [String, Number]
        },

        emits: ["update:modelValue", "change"],

        setup(_, { emit }) {
            const change = label => {
                emit("update:modelValue", label);
                emit("change", label);
            };

            return {
                change
            };
        }
    });
</script>
