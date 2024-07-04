<template>
    <div class="cui-read-more">
        <div class="cui-read-more__content" :style="{ height: `${viewHeight}px` }">
            <div class="cui-read-more__content__inner">
                <slot></slot>
            </div>
        </div>
        <div class="cui-read-more__toggle" v-if="isOverflow" @click="toggleOpen" :class="{ is_mask: !isOpen }">
            <slot name="toggle">
                <div class="cui-read-more__toggle__text">
                    <span class="mr-5">{{ isOpen ? closeText : openText }}</span>
                    <base-icon :name="isOpen ? 'arrow-top' : 'arrow-bottom'"></base-icon>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import props from "./props.js";

    export default defineComponent({
        name: "BaseReadMore",
        props,
        emits: [],
        setup(props) {
            const { proxy } = getCurrentInstance();

            const isOpen = ref(false);
            const isOverflow = ref(false);
            const viewHeight = ref(props.showHeight);
            const contentHeight = ref(0);

            const getContentHeight = () => {
                uni.createSelectorQuery()
                    .in(proxy)
                    .select(".cui-read-more__content__inner")
                    .boundingClientRect(res => {
                        const { height } = res;
                        contentHeight.value = height;
                        isOverflow.value = height > props.showHeight;
                    })
                    .exec();
            };

            getContentHeight();

            watch(
                () => isOpen.value,
                e => {
                    viewHeight.value = e ? contentHeight.value : props.showHeight;
                }
            );

            const toggleWarpHeight = computed(() => {
                return `${props.showHeight / 3}px`;
            });

            const toggleOpen = () => {
                isOpen.value = !isOpen.value;
            };

            return { isOpen, isOverflow, toggleWarpHeight, toggleOpen, viewHeight };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-read-more {
        @apply relative;
        &__content {
            @apply overflow-hidden transition-height-300;
        }

        &__toggle {
            &__text {
                @apply flex w-100% h-100% flex-center font-size-14 mt-10;
                color: $cui-color-primary;
            }
        }

        .is_mask {
            @apply absolute bottom-0 left-0 right-0 flex;
            padding-top: v-bind(toggleWarpHeight);
            background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, $cui-page-theme-color 80%);
        }
    }
</style>
