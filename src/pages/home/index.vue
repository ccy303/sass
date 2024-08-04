<template>
    <base-page :widthNav="false" :padding="0">
        <template v-if="banner.status">
            <base-banner v-if="banner.status" :list="banner.imgs" :height="500"></base-banner>
        </template>
        <div class="p-10">
            <base-grid :column="2" :border="false">
                <base-grid-item v-for="item in modules" :key="item.id">
                    <div class="size-100% flex-center flex-col mt-10">
                        <div class="border-rd-10 overflow-hidden">
                            <base-image :size="[200, 200]" :src="item.moduleImageList[0].imageUrl" />
                        </div>
                        <base-text>{{ item.description }}</base-text>
                    </div>
                </base-grid-item>
            </base-grid>
        </div>
    </base-page>
</template>

<script setup>
    import { useCommonStore } from "@/stores/common";
    import { storeToRefs } from "pinia";

    const { homeModules } = storeToRefs(useCommonStore());

    const modules = computed(() => {
        return homeModules.value?.filter(item => item.moduleType != 8 && item.status == 1);
    });

    const banner = computed(() => {
        const target = homeModules.value.find(item => item.moduleType == 8) || {};
        return {
            status: target.status,
            imgs: target.moduleImageList.map(img => ({ url: img.imageUrl })) || []
        };
    });
</script>

<style lang="scss" scoped></style>
