<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-captcha focus></base-captcha>
        </base-card>

        <base-card label="其他数量">
            <base-captcha :len="6" :gutter="10" :height="100"></base-captcha>
        </base-card>

        <base-card label="自动完成">
            <base-captcha v-model="val" @done="onDone"></base-captcha>
        </base-card>
    </base-page>
</template>

<script setup>
    import { useUi } from "@/gxota/ui";

    const ui = useUi();

    const val = ref("");

    const onDone = () => {
        ui.showToast(val.value);
    };
</script>
