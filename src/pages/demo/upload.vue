<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-upload v-model="v1" />
        </base-card>

        <base-card label="上传视频">
            <base-upload v-model="v2" fileMediatype="video" />
        </base-card>

        <base-card label="数量限制">
            <base-upload :limit="1" v-model="v3" />
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";

    const v1 = ref();
    const v2 = ref();
    const v3 = ref();
</script>
