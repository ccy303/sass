<template>
    <base-page :widthNav="false" :padding="0">
        <base-banner :list="urls" :height="500"></base-banner>
    </base-page>
</template>

<script setup>
    import { useCommonStore } from "@/stores/common";
    import { storeToRefs } from "pinia";

    const urls = ref([
        { url: "https://img2.baidu.com/it/u=304293407,1878548733&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=500" },
        { url: "https://img2.baidu.com/it/u=2019266491,4237591550&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667" },
        { url: "https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280" }
    ]);

    // const { homeModules } = storeToRefs(useCommonStore());

    // const modules = computed(() => {
    //     return homeModules.value;
    // });
</script>

<style lang="scss" scoped></style>
