<template>
    <div class="cui-image" :style="[imgStyle, baseStyle]" :class="[{ 'is-round': round, 'is-error': !src || isError }]" @tap="onPreview">
        <div class="cui-image__placeholder" v-if="!src">
            <slot name="placeholder">
                <base-icon :size="50" name="image" />
            </slot>
        </div>

        <div class="cui-image__error" v-else-if="isError">
            <slot name="error">
                <base-icon :size="50" name="image-error" />
            </slot>
        </div>

        <template v-else>
            <div class="cui-image__loading" v-if="isLoading && showLoading">
                <base-loading />
            </div>

            <img
                class="cui-image__target"
                :src="src"
                :mode="mode"
                :lazy-load="lazyLoad"
                :webp="webp"
                :show-menu-by-longpress="showMenuByLongpress"
                @error="handleError"
                @load="handleLoad"
            />

            <slot></slot>
        </template>
    </div>
</template>

<script>
    import { isNumber, isArray, isString, isNaN } from "lodash-es";
    import { parseRpx } from "../../utils";
    import { useStyle } from "../../hooks";

    export default defineComponent({
        name: "BaseImage",

        props: {
            // 图片地址
            src: String,
            // 图片裁剪、缩放的模式
            mode: { type: String, default: "aspectFill" },
            // 图片大小
            size: { type: [String, Number, Array], default: "100%" },
            // 是否圆角
            round: Boolean,
            // 当前预览值
            previewCurrent: String,
            // 预览列表
            previewList: Array,
            // 懒加载
            lazyLoad: Boolean,
            fadeShow: { type: Boolean, default: true },
            webp: Boolean,
            showMenuByLongpress: Boolean,
            showLoading: { type: Boolean, default: true }
        },

        emits: ["error", "load"],

        setup(props, { emit }) {
            // 是否加载失败
            const isError = ref(false);

            // 是否加载中
            const isLoading = ref(false);

            // 样式
            const imgStyle = computed(() => {
                const [height, width] = size.value;

                let minWidth = "0";
                let minHeight = "0";

                // 不是有效高
                if (isNaN(parseInt(height))) {
                    minHeight = width;
                }

                // 不是有效宽
                if (isNaN(parseInt(width))) {
                    minWidth = height;
                }

                return { height, width, minWidth, minHeight };
            });

            // 尺寸
            const size = computed(() => {
                let size = ["100%", "100%"];

                if (isString(props.size) || isNumber(props.size)) {
                    size = [props.size, props.size];
                } else if (isArray(props.size)) {
                    size = props.size;
                }
                return size.map(v => parseRpx(v));
            });

            // 加载失败
            const handleError = e => {
                isError.value = true;
                isLoading.value = false;
                emit("error", e);
            };

            // 加载成功
            const handleLoad = e => {
                isError.value = false;
                isLoading.value = false;
                emit("load", e);
            };

            // 点击是否预览图片
            const onPreview = e => {
                if (props.previewList) {
                    uni.previewImage({
                        urls: props.previewList || [],
                        current: props.previewCurrent || props.src
                    });

                    e.stopPropagation();
                }
            };

            watch(
                () => props.src,
                val => {
                    isLoading.value = !!val;
                    isError.value = false;
                },
                { immediate: true }
            );

            return { isError, isLoading, imgStyle, handleError, handleLoad, onPreview, ...useStyle() };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-image {
        @apply flex-shrink-0 relative overflow-hidden;
        font-size: $cui-font-size;

        &__target {
            @apply inline-block size-100% max-h-100% max-w-100% border-rd-inherit;
        }

        &__loading,
        &__placeholder {
            @apply absolute left-0 top-0;
        }

        &__loading,
        &__placeholder,
        &__error {
            @apply size-100% flex-direction-col justify-center items-center;
        }

        &__loading {
            @apply bg-#f6f7fa;
        }

        &__error {
            @apply text-center border-rd-inherit;
            color: $cui-color-info;
        }

        &.is-round {
            .cui-image__placeholder,
            .cui-image__error,
            .cui-image__target {
                @apply border-rd-100%;
            }
        }

        &.is-error {
            @apply bg-#f6f7fa;
        }
    }
</style>
