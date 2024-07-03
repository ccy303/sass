<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-banner :list="urls"></base-banner>
        </base-card>
        <base-card label="卡片">
            <base-banner :list="urls" type="card"></base-banner>
        </base-card>

        <base-card label="衔接">
            <base-banner :list="urls" type="chain" @select="onSelect"></base-banner>
        </base-card>
    </base-page>
</template>

<script setup>
    const urls = ref([
        { url: "https://img2.baidu.com/it/u=304293407,1878548733&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=500" },
        { url: "https://img2.baidu.com/it/u=2019266491,4237591550&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667" },
        { url: "https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280" }
    ]);

    const onSelect = i => {
        console.log(i);
    };
</script>
