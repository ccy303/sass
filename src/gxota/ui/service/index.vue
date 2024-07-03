<template>
    <base-loading-mask
        :loading="maskComputed.loading && loading"
        :modal="maskComputed.modal"
        :color="maskComputed.color"
        :text="maskComputed.text"
        :fullscreen="maskComputed.fullscreen"
        :background="maskComputed.background"
        :loading-theme="maskComputed.loadingTheme"
    >
        <slot :data="data" :loading="loading"></slot>
    </base-loading-mask>
</template>

<script>
    export default defineComponent({
        name: "BaseService",
        props: {
            service: null,
            mask: { type: Object, default: () => ({}) },
            immediate: { type: Boolean, default: true }
        },
        setup(props) {
            // 数据
            const data = ref();

            // 加载中
            const loading = ref(false);

            // 遮罩层
            const mask = computed(() => {
                return Object.assign({ loading: true, modal: true, fullscreen: false }, props.mask || {});
            });

            // 请求
            const get = async () => {
                loading.value = true;
                const res = await props?.service;
                loading.value = false;

                return (data.value = res);
            };

            onMounted(() => {
                if (props.immediate) {
                    get();
                }
            });

            return { maskComputed: mask, loading, data, get };
        }
    });
</script>
