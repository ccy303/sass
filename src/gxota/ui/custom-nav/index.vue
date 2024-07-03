<template>
    <div class="cui-nav" :style="{ backgroundColor: navBgColor }">
        <div flex-1 flex flex-items-center h-30 z-1>
            <div absolute flex items-center>
                <div class="back" mr-10 flex items-center v-if="!!isBack" @click="goBack">
                    <base-icon name="arrow-left" :size="'30'" :color="navBackIconColor" font-bold />
                    <template v-if="navBackText">
                        <div :style="{ color: navBackTextColor }">{{ navBackText }}</div>
                    </template>
                </div>
            </div>
            <div v-if="!slots.title" font-size-18px font-bold flex-1 :style="{ textAlign: navTtitleAlign, color: navTitleColor }">
                {{ navTitle }}
            </div>
            <slot v-else name="title"></slot>
        </div>
    </div>
</template>

<script setup>
    import { getNavHeight } from "../../utils";
    import { customNavProps } from "./helper";

    defineProps({ ...customNavProps });

    const h = getNavHeight();

    const navHeight = computed(() => {
        return `${h.value}px`;
    });

    const slots = useSlots();

    const isBack = computed(() => {
        const pages = getCurrentPages();
        return pages.length > 1;
    });

    const goBack = () => {
        uni.navigateBack({ delta: 1 });
    };
</script>

<style lang="scss" scoped>
    .cui-nav {
        @apply box-border flex flex-items-end px-12 pb-6;
        height: v-bind(navHeight);
    }
</style>
