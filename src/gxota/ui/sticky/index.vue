<template>
    <div class="cui-sticky">
        <slot />
    </div>
</template>

<script>
    export default defineComponent({
        name: "BaseSticky",

        props: {
            offsetTop: { type: Number, default: 0 }
        },

        emits: [],

        setup(props) {
            const offsetTopComputed = computed(() => {
                return props.offsetTop;
            });

            return {
                offsetTopComputed: offsetTopComputed.value
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-sticky {
        position: sticky;
        top: v-bind(offsetTopComputed);
    }
</style>
