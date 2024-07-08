<template>
    <view class="cui-collapse">
        <slot />
    </view>
</template>
<script>
    export default defineComponent({
        name: "BaseCollapse",
        emits: ["change", "update:modelValue"],
        props: {
            modelValue: { type: [Array], default: () => [] },
            // 是否开启手风琴效果
            accordion: { type: [Boolean, String], default: false }
        },
        setup(props, { emit }) {
            const childInstance = reactive({});

            const setChildInstance = (key, ctx) => {
                childInstance[key] = ctx;
            };

            watchEffect(() => {
                props.modelValue?.map(item => {
                    childInstance[item] && childInstance[item].proxy && (childInstance[item].proxy.isOpen = true);
                });
            });

            const setValue = ctx => {
                if (props.accordion) {
                    Object.values(childInstance).forEach(item => {
                        item.proxy.isOpen = item.name == ctx.name;
                    });
                } else {
                    childInstance[ctx.name].proxy.isOpen = !childInstance[ctx.name].proxy.isOpen;
                }
            };

            const setChange = (name, value) => {
                if (!name) return;

                const arr = [...props.modelValue];
                const data = arr.reduce(result => {
                    if (value && !result.includes(name)) {
                        result.push(name);
                        return result;
                    }

                    if (!value && result.includes(name)) {
                        const index = result.indexOf(name);
                        result.splice(index, 1);
                        return result;
                    }

                    return result;
                }, arr);

                emit("update:modelValue", data);
            };

            provide("COLLAPSE", {
                setChildInstance,
                setValue,
                setChange
            });
        }
    });
</script>
<style lang="scss" scoped>
    .cui-collapse {
        @apply w-100% flex flex-1 flex-col bg-#fff;
    }
</style>
