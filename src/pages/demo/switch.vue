<template>
    <base-page>
        <base-card label="基础用法">
            <base-switch></base-switch>
        </base-card>

        <base-card label="其他颜色">
            <base-switch :color="'#0f0'"></base-switch>
        </base-card>

        <base-card label="禁用">
            <base-switch v-model="v3" disabled></base-switch>
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";

    const v3 = ref(true);
</script>
