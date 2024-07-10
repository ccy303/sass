<template>
    <view
        class="cui-fab"
        :class="{
            'cui-fab--leftBottom': position == 'leftBottom',
            'cui-fab--rightBottom': position == 'rightBottom',
            'cui-fab--leftTop': position == 'leftTop',
            'cui-fab--rightTop': position == 'rightTop'
        }"
    >
        <div class="cui-fab__circle cui-fab__plus" :style="{ 'background-color': styles.buttonColor }" @click="click">
            <base-icon
                class="fab-circle-icon"
                :name="styles.icon"
                :color="styles.iconColor"
                :size="50"
                :class="{ 'cui-fab__plus--active': isShow }"
            />
        </div>
        <div
            :class="{
                'cui-fab__content--left': popDirection == 'horizontal' && (position == 'leftBottom' || position == 'leftTop'),
                'cui-fab__content--right': popDirection == 'horizontal' && (position == 'rightBottom' || position == 'rightTop'),
                'cui-fab__content--vertical__top': popDirection == 'vertical' && (position == 'leftBottom' || position == 'rightBottom'),
                'cui-fab__content--vertical__bottom': popDirection == 'vertical' && (position == 'leftTop' || position == 'rightTop'),
                'cui-fab__content--active': isShow
            }"
            :style="{ backgroundColor: styles.backgroundColor }"
            class="cui-fab__content"
            elevation="5"
        >
            <slot />
        </div>
    </view>
</template>

<script>
    export default defineComponent({
        name: "BaseFab",
        props: {
            position: { type: String, default: "leftBottom" },
            // horizontal，vertical,
            popDirection: { type: String, default: "horizontal" }
        },
        emits: ["fabClick"],
        setup(props, { slots, emit }) {
            const fabShow = ref(false);
            const isShow = ref(false);
            const styles = ref({
                color: "#3c3e49",
                selectedColor: "#007AFF",
                backgroundColor: "#fff",
                buttonColor: "#007AFF",
                iconColor: "#fff",
                icon: "plus"
            });

            const isConetnt = computed(() => {
                return slots.default;
            });

            const click = () => {
                emit("fabClick");
                if (!slots.default) {
                    return;
                }
                isShow.value = !isShow.value;
            };

            return { fabShow, isShow, styles, isConetnt, click };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-fab {
        @apply fixed flex-center z-10 border-rd-45;

        &--leftBottom {
            @apply left-15 bottom-30;
        }

        &--leftTop {
            @apply left-15 top-30;
        }

        &--rightBottom {
            @apply right-15 bottom-30;
        }

        &--rightTop {
            @apply right-15 top-30;
        }

        &__circle {
            @apply flex-center size-55 bg-#3c3e49 border-rd-45 z-11;
            box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.3);

            &-icon {
                @apply rotate-0 transition-transform-300 font-200;
            }
        }

        &__content {
            @apply size-0 box-border flex flex-row border-rd-55 overflow-hidden absolute;
            transition-property: width, height;
            transition-duration: 0.5s;

            &--left {
                @apply left-0 pl-55 h-55;
                &.cui-fab__content--active {
                    @apply w-auto;
                }
            }
            &--right {
                @apply right-0 pr-55 h-55;
                &.cui-fab__content--active {
                    @apply w-auto;
                }
            }
            &--vertical__top {
                @apply w-55 bottom-0 pb-55;
                &.cui-fab__content--active {
                    @apply h-auto;
                }
            }
            &--vertical__bottom {
                @apply w-55 top-0 pt-55;
                &.cui-fab__content--active {
                    @apply h-auto;
                }
            }

            &--active {
                @apply border-#fff border-1 border-solid;
                box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.3);
            }
        }
    }

    .cui-fab__plus {
        @apply font-bold;
        &--active {
            transform: rotate(135deg);
        }
    }
</style>
