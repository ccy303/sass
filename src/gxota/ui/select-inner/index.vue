<template>
    <div class="cui-select-inner" :class="[{ 'is-disabled': isDisabled, 'is-round': round, 'is-border': border }]" :style="[baseStyle]">
        <slot>
            <div class="cui-select-inner__value">
                {{ text }}
                <span class="cui-select-inner__placeholder" v-if="!text">
                    {{ placeholder }}
                </span>
            </div>

            <base-icon class="cui-select-inner__icon" :name="arrowIcon" v-if="arrowIcon"></base-icon>
        </slot>
    </div>
</template>

<script>
    import { useForm, useStyle } from "../../hooks";
    import { Props } from "./config.js";

    export default defineComponent({
        props: {
            ...Props,
            // 显示文本
            text: String
        },

        setup(props) {
            const { disabled } = useForm();

            // 是否禁用
            const isDisabled = computed(() => disabled.value || props.disabled);

            return {
                isDisabled,
                ...useStyle({ padding: "0 20rpx" })
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-select-inner {
        @apply flex items-center w-100% bg-#fff box-border relative;
        height: $cui-height;
        font-size: $cui-font-size;

        &__wrap {
            @apply w-100%;
        }

        &__value {
            @apply flex-1 overflow-hidden text-ellipsis whitespace-nowrap;
            line-height: 1;
        }

        &__icon {
            color: $cui-color-placeholder;
            font-size: 32rpx !important;

            &:last-child {
                @apply ml-10;
            }
        }

        &__placeholder {
            color: $cui-color-placeholder;
        }

        &.is-disabled {
            background-color: $cui-color-disabled-bg;
            color: $cui-color-disabled;

            .cui-select__placeholder {
                color: $cui-color-disabled;
            }
        }

        &.is-border {
            border: $cui-border-width solid $cui-border-color;
            border-radius: $cui-border-radius;
        }

        &.is-round {
            border-radius: $cui-height;
        }
    }
</style>
