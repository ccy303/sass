<template>
    <div class="cui-collapse-item">
        <div @click="toggle" class="cui-collapse-item__title cui-collapse-item-border" :class="{ 'is-disabled': disabled }">
            <div class="cui-collapse-item__title-wrap">
                <slot name="title">
                    <div class="cui-collapse-item__title-box">
                        <base-image v-if="thumb" :src="thumb" class="cui-collapse-item__title-img" />
                        <span class="cui-collapse-item__title-text">{{ title }}</span>
                    </div>
                </slot>
            </div>
            <div
                v-if="showArrow"
                class="cui-collapse-item__title-arrow"
                :class="{
                    'cui-collapse-item--animation': showAnimation === true,
                    'cui-collapse-item__title-arrow-active': isOpen
                }"
            >
                <base-icon name="arrow-bottom" :size="28" />
            </div>
        </div>
        <div class="cui-collapse-item__wrap" :class="{ 'is--transition': showAnimation }" :style="{ height: isOpen ? `${height}px` : 0 }">
            <div class="cui-collapse-item__wrap-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import { uuid } from "../../utils";
    export default defineComponent({
        name: "BaseCollapseItem",
        props: {
            // 列表标题
            title: { type: String, default: "" },
            // 唯一标志符
            name: { type: [Number, String], default: "" },
            // 是否禁用
            disabled: { type: Boolean, default: false },
            // 是否显示动画
            showAnimation: { type: Boolean, default: true },
            // 缩略图
            thumb: { type: String, default: "" },
            // 标题分隔线显示类型
            titleBorder: { type: String, default: "auto" },
            // 是否显示分隔线 ['auto'|'show'|'none']
            border: { type: Boolean, default: true },
            // 是否显示右侧箭头
            showArrow: { type: Boolean, default: true }
        },
        setup(props) {
            const { proxy } = getCurrentInstance();

            const { setChildInstance, setValue, setChange } = inject("COLLAPSE");

            const isOpen = ref(false);
            const height = ref(0);
            const elId = ref(`cui_${uuid()}`);

            const toggle = () => {
                if (props.disabled) return;

                setValue({
                    name: props.name || elId.value,
                    value: isOpen.value
                });
            };

            const getContentHeight = () => {
                uni.createSelectorQuery()
                    .in(proxy)
                    .select(".cui-collapse-item__wrap-content")
                    .boundingClientRect(rect => {
                        const { height: h } = rect;
                        height.value = h;
                    })
                    .exec();
            };

            onMounted(() => {
                setChildInstance?.(props.name || elId.value, { proxy, name: props.name });
                getContentHeight();
                watch(
                    () => isOpen.value,
                    val => setChange?.(props.name, val)
                );
            });

            return { isOpen, elId, height, toggle, getContentHeight };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-collapse-item {
        @apply box-border;

        &__title {
            @apply flex w-100% box-border flex-row items-center;
            transition: border-bottom-color 0.3s;

            &-wrap {
                @apply w-100% flex;
            }

            &-box {
                @apply px-10 flex w-100% box-border flex-row justify-between items-center h-48 line-height-48 bg-#fff color-#303133 font-14 font-500;
            }

            &-img {
                @apply important-size-30 mr-10;
            }

            &-text {
                @apply flex-1 font-size-14 whitespace-nowrap color-inherit overflow-hidden text-ellipsis;
            }

            &-arrow {
                @apply flex box-border items-center justify-center mr-10 rotate-0;

                &-active {
                    @apply rotate--180;
                }
            }

            &.is-disabled {
                .cui-collapse-item__title-text {
                    @apply color-#999;
                }
                .cui-collapse-item__title-arrow {
                    @apply color-#999;
                }
            }

            &.cui-collapse-item-border {
                @apply border-b-2 border-b-solid border-b-#ebeef5;
            }

            &.is-open {
                @apply border-transparent;
            }
        }

        &__wrap {
            @apply will-change-height box-border bg-#fff overflow-hidden relative;

            &.is--transition {
                @apply transition-height-300;
            }

            &-content {
                @apply font-size-13 color-#303133 border-transparent p-10;

                &.cui-collapse-item--border {
                    @apply border-b-1 border-#ebeef5;
                }

                &.open {
                    @apply relative;
                }
            }
        }

        &--animation {
            @apply transition-transform-300;
        }
    }
</style>
