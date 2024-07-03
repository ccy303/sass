<template>
    <div class="cui-skeleton" :class="{ 'is-loading': loading }" :style="[baseStyle, loading && loadingStyle]">
        <div class="cui-skeleton__inner" v-show="!loading">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { useStyle } from "../../hooks";

    export default defineComponent({
        name: "BaseSkeleton",
        props: {
            loading: { type: Boolean, default: true },
            loadingStyle: { type: Object, default: () => ({}) }
        },

        setup() {
            return { ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-skeleton {
        @apply size-100%;
        &__inner {
            height: 100%;
            width: 100%;
        }

        &.is-loading {
            border-radius: $cui-border-radius;
            background: linear-gradient(90deg, #f0f2f5 25%, #e6e8eb 37%, #f0f2f5 63%);
            background-size: 400% 100%;
            animation: cui-skeleton-loading 1.4s ease infinite;
        }
    }

    @keyframes cui-skeleton-loading {
        0% {
            background-position: 100% 50%;
        }

        to {
            background-position: 0 50%;
        }
    }
</style>
