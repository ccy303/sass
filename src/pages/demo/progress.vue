<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-progress :value="40"></base-progress>
        </base-card>

        <base-card label="不同颜色">
            <base-progress color="#67C23A" :value="40"></base-progress>
        </base-card>

        <base-card label="可调节颜色">
            <base-progress :value="10" :color="['#F56C6C', '#E6A23C', '#67C23A']"></base-progress>
        </base-card>

        <base-card label="自定义">
            <base-progress :value="val">
                <template #text>
                    <span v-if="val >= 90">优</span>
                    <span v-else-if="val >= 80">良</span>
                    <span v-else-if="val >= 60">及格</span>
                    <span v-else>{{ val }}</span>
                </template>
            </base-progress>
        </base-card>
    </base-page>
</template>

<script setup>
    const val = ref(80);
</script>
