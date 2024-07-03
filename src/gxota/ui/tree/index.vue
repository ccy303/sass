<template>
    <div class="cui-tree">
        <base-tree-item v-for="(item, index) in data" :key="index" :data="item" :siblings="data"> </base-tree-item>
    </div>
</template>

<script>
    import { TreeProps, useTree } from "./helper";

    export default defineComponent({
        name: "BaseTree",

        props: { ...TreeProps },

        emits: ["update:modelValue", "change"],

        setup(props, { emit }) {
            return { ...useTree({ props, emit }) };
        }
    });
</script>

<style lang="scss" scoped>
    .cl-tree {
    }

    .cl-tree-select {
        padding: 10rpx;
    }
</style>
