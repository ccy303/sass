<template>
    <base-page fullscreen>
        <base-list-index :data="pcas"></base-list-index>
    </base-page>
</template>

<script setup>
    import jsonData from "@/gxota/ui/select-region/city-pca.json";

    const pcas = ref();

    pcas.value = jsonData;
</script>
