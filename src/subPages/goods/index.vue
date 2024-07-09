<template>
    <base-page padding="0">
        <base-tabs v-model="active" :list="list"></base-tabs>
    </base-page>

    <base-fab>
        <div class="actions">
            <navigator class="actions-item" url="/subPages/goods/categorize">
                <base-icon :size="40" name="app" />
                <base-text>分类</base-text>
            </navigator>
            <navigator class="actions-item" url="/subPages/goods/good">
                <base-icon :size="40" name="pay" />
                <base-text>商品</base-text>
            </navigator>
        </div>
    </base-fab>
</template>

<script setup>
    const list = ref([
        { label: "百亿补贴", value: 1 },
        { label: "包邮", value: 2 },
        { label: "限时达", value: 3 },
        { label: "同城速配", value: 4 },
        { label: "货到付款", value: 5 },
        { label: "分期免息", value: 6 },
        { label: "配送全球", value: 7 },
        { label: "促销", value: 8 }
    ]);

    const active = ref(1);
</script>

<style lang="scss" scope>
    .actions {
        @apply flex;
        &-item {
            @apply flex-center flex-col w-55 px-5;
        }
    }
</style>
