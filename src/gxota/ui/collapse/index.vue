<template>
    <view class="cui-collapse">
        <slot />
    </view>
</template>
<script>
    export default defineComponent({
        name: "BaseCollapse",
        emits: ["change", "activeItem", "input", "update:modelValue"],
        props: {
            modelValue: { type: [String, Array], default: "" },
            // 是否开启手风琴效果
            accordion: { type: [Boolean, String], default: false }
        },
        setup(props) {
            console.log(1111111, getCurrentInstance());

            const childInstance = reactive({});

            const setChildInstance = (key, ctx) => {
                childInstance[key] = ctx;
            };

            watch(
                () => childInstance,
                e => {
                    console.log(1234567, e);
                },
                { deep: true }
            );

            console.log(childInstance);

            provide("COLLAPSE", {
                setChildInstance
            });
        }
    });
    // export default {

    //     computed: {
    //         dataValue() {
    //             let value = (typeof this.value === "string" && this.value === "") || (Array.isArray(this.value) && this.value.length === 0);
    //             let modelValue =
    //                 (typeof this.modelValue === "string" && this.modelValue === "") ||
    //                 (Array.isArray(this.modelValue) && this.modelValue.length === 0);
    //             if (value) {
    //                 return this.modelValue;
    //             }
    //             if (modelValue) {
    //                 return this.value;
    //             }

    //             return this.value;
    //         }
    //     },
    //     watch: {
    //         dataValue(val) {
    //             this.setOpen(val);
    //         }
    //     },
    //     created() {
    //         this.childrens = [];
    //         this.names = [];
    //     },
    //     mounted() {
    //         this.$nextTick(() => {
    //             this.setOpen(this.dataValue);
    //         });
    //     },
    //     methods: {
    //         setOpen(val) {
    //             let str = typeof val === "string";
    //             let arr = Array.isArray(val);
    //             this.childrens.forEach((vm, index) => {
    //                 if (str) {
    //                     if (val === vm.nameSync) {
    //                         if (!this.accordion) {
    //                             console.warn("accordion 属性为 false ,v-model 类型应该为 array");
    //                             return;
    //                         }
    //                         vm.isOpen = true;
    //                     }
    //                 }
    //                 if (arr) {
    //                     val.forEach(v => {
    //                         if (v === vm.nameSync) {
    //                             if (this.accordion) {
    //                                 console.warn("accordion 属性为 true ,v-model 类型应该为 string");
    //                                 return;
    //                             }
    //                             vm.isOpen = true;
    //                         }
    //                     });
    //                 }
    //             });
    //             this.emit(val);
    //         },
    //         setAccordion(self) {
    //             if (!this.accordion) return;
    //             this.childrens.forEach((vm, index) => {
    //                 if (self !== vm) {
    //                     vm.isOpen = false;
    //                 }
    //             });
    //         },
    //         resize() {
    //             this.childrens.forEach((vm, index) => {
    //                 // #ifndef APP-NVUE
    //                 vm.getCollapseHeight();
    //                 // #endif
    //                 // #ifdef APP-NVUE
    //                 vm.getNvueHwight();
    //                 // #endif
    //             });
    //         },
    //         onChange(isOpen, self) {
    //             let activeItem = [];

    //             if (this.accordion) {
    //                 activeItem = isOpen ? self.nameSync : "";
    //             } else {
    //                 this.childrens.forEach((vm, index) => {
    //                     if (vm.isOpen) {
    //                         activeItem.push(vm.nameSync);
    //                     }
    //                 });
    //             }
    //             this.$emit("change", activeItem);
    //             this.emit(activeItem);
    //         },
    //         emit(val) {
    //             this.$emit("input", val);
    //             this.$emit("update:modelValue", val);
    //         }
    //     }
    // };
</script>
<style lang="scss" scoped>
    .cui-collapse {
        @apply w-100% flex flex-1 flex-col bg-#fff;
    }
</style>
