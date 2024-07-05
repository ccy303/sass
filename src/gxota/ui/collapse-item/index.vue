<template>
    <div class="cui-collapse-item" :id="elId">
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
        <div class="cui-collapse-item__wrap" :class="{ 'is--transition': showAnimation }" :style="{ height: isOpen ? 'auto' : 0 }">
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
            // 是否展开
            open: { type: Boolean, default: false },
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

            const { setChildInstance } = inject("COLLAPSE");

            const isOpen = ref(false);
            const isheight = ref(null);
            const height = ref(0);
            const elId = ref(`cui_${uuid()}`);
            const nameSync = ref(0);

            const toggle = () => {
                if (props.disabled) {
                    return;
                }
                isOpen.value = !isOpen.value;
            };

            const getCollapse = (name = "uniCollapse") => {
                let parent = this.$parent;
                let parentName = parent.$options.name;
                while (parentName !== name) {
                    parent = parent.$parent;
                    if (!parent) return false;
                    parentName = parent.$options.name;
                }
                return parent;
            };

            onMounted(() => {
                setChildInstance(elId.value, proxy);
            });

            return { isOpen, elId, toggle };
        }
    });
    /**
     * CollapseItem 折叠面板子组件
     * @description 折叠面板子组件
     * @property {String} title 标题文字
     * @property {String} thumb 标题左侧缩略图
     * @property {String} name 唯一标志符
     * @property {Boolean} open = [true|false] 是否展开组件
     * @property {Boolean} titleBorder = [true|false] 是否显示标题分隔线
     * @property {String} border
     * @property {Boolean} disabled = [true|false] 是否展开面板
     * @property {Boolean} showAnimation = [true|false] 开启动画
     * @property {Boolean} showArrow = [true|false]
     */
    // export default {
    //     name: "BaseCollapseItem",
    //     props: {
    //     },
    //     data() {
    //         // TODO 随机生生元素ID，解决百度小程序获取同一个元素位置信息的bug
    //         const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`;
    //         return {
    //             isOpen: false,
    //             isheight: null,
    //             height: 0,
    //             elId,
    //             nameSync: 0
    //         };
    //     },
    //     watch: {
    //         open(val) {
    //             this.isOpen = val;
    //             this.onClick(val, "init");
    //         }
    //     },
    //     updated(e) {
    //         this.$nextTick(() => {
    //             this.init(true);
    //         });
    //     },
    //     created() {
    //         this.collapse = this.getCollapse();
    //         this.oldHeight = 0;
    //         this.onClick(this.open, "init");
    //     },
    //     unmounted() {
    //         this.__isUnmounted = true;
    //         this.uninstall();
    //     },
    //     mounted() {
    //         if (!this.collapse) return;
    //         if (this.name !== "") {
    //             this.nameSync = this.name;
    //         } else {
    //             this.nameSync = this.collapse.childrens.length + "";
    //         }
    //         if (this.collapse.names.indexOf(this.nameSync) === -1) {
    //             this.collapse.names.push(this.nameSync);
    //         } else {
    //             console.warn(`name 值 ${this.nameSync} 重复`);
    //         }
    //         if (this.collapse.childrens.indexOf(this) === -1) {
    //             this.collapse.childrens.push(this);
    //         }
    //         this.init();
    //     },
    //     methods: {
    //         init(type) {
    //             this.getCollapseHeight(type);
    //         },
    //         uninstall() {
    //             if (this.collapse) {
    //                 this.collapse.childrens.forEach((item, index) => {
    //                     if (item === this) {
    //                         this.collapse.childrens.splice(index, 1);
    //                     }
    //                 });
    //                 this.collapse.names.forEach((item, index) => {
    //                     if (item === this.nameSync) {
    //                         this.collapse.names.splice(index, 1);
    //                     }
    //                 });
    //             }
    //         },
    //         onClick(isOpen, type) {
    //             if (this.disabled) return;
    //             this.isOpen = isOpen;
    //             if (this.isOpen && this.collapse) {
    //                 this.collapse.setAccordion(this);
    //             }
    //             if (type !== "init") {
    //                 this.collapse.onChange(isOpen, this);
    //             }
    //         },
    //         getCollapseHeight(type, index = 0) {
    //             const views = uni.createSelectorQuery().in(this);
    //             views
    //                 .select(`#${this.elId}`)
    //                 .fields({ size: true }, data => {
    //                     // TODO 百度中可能获取不到节点信息 ，需要循环获取
    //                     if (index >= 10) return;
    //                     if (!data) {
    //                         index++;
    //                         this.getCollapseHeight(false, index);
    //                         return;
    //                     }
    //                     this.height = data.height;
    //                     this.isheight = true;
    //                     if (type) return;
    //                     this.onClick(this.isOpen, "init");
    //                 })
    //                 .exec();
    //         },
    //    }
    // };
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
