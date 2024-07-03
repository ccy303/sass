<template>
    <div class="cui-loading">
        <base-icon :class-name="`cui-loading cui-icon-loading-${theme}`" :color="color" :size="size" />
    </div>
</template>

<script>
    import { parseRpx } from "../../utils/index";
    export default defineComponent({
        name: "BaseLoading",
        options: { styleIsolation: "shared" },
        props: {
            // 图标颜色
            color: { type: String, default: "primary" },
            // 主题  PropType<"spin" | "snow" | "dot">
            theme: { type: String, default: "spin" },
            // 图标大小
            size: { type: [String, Number], default: 50 }
        },
        setup(props) {
            const styles = computed(() => {
                return {
                    width: parseRpx(props.size),
                    height: parseRpx(props.size)
                };
            });
            return { styles };
        }
    });
</script>

<style lang="scss" scoped>
    :deep(.cui-loading) {
        animation: loading-rotate 1.2s linear infinite;

        @keyframes loading-rotate {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>
