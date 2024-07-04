<template>
    <div class="cui-page" :class="[{ 'is-fullscreen': fullscreen }]" :style="{ style }">
        <div v-if="widthNav" class="cui-page-nav">
            <base-custom-nav
                :navTitle="navTitleComputed"
                :navTitleColor="navTitleColor"
                :navTtitleAlign="navTtitleAlign"
                :navBgColor="navBgColor"
                :navBackText="navBackText"
                :navBackIconColor="navBackIconColor"
                :navBackTextColor="navBackTextColor"
            />
        </div>

        <base-loading-mask fullscreen :loading="loader.loading" :text="loader.text" :border="loader.border" />

        <base-toast :ref="setRefs('toast')" />

        <base-confirm :ref="setRefs('confirm')" />

        <div :style="{ padding: parseRpx(padding) }">
            <slot></slot>
        </div>
    </div>

    <div class="cui-page__bg" :style="{ background }"></div>
</template>

<script>
    import { parseRpx, getNavHeight } from "../../utils";
    import { router } from "../../router/index";
    import { useRefs } from "../../hooks";
    import { isString } from "lodash-es";
    import { customNavProps } from "../custom-nav/helper";

    export default defineComponent({
        name: "BasePage",
        props: {
            // 是否全屏显示，高度100%
            fullscreen: { type: Boolean, default: false },
            // 內间距
            padding: { type: [Number, String], default: 20 },
            // 页面背景色
            backgroundColor: String,
            // 是否包含 Nav
            widthNav: { type: Boolean, default: true },
            ...customNavProps
        },

        setup(props) {
            const { proxy } = getCurrentInstance();

            const h = getNavHeight();
            const navHeight = computed(() => `${h.value}px`);
            const { windowHeight, screenHeight, safeAreaInsets } = uni.getSystemInfoSync();
            const page = router.currentPage();
            const { refs, setRefs } = useRefs();

            const info = router.info();

            // 加载框配置
            const loader = reactive({ loading: false, border: false, text: "加载中" });

            const navTitle = computed(() => {
                if (props.navTitle === false) {
                    return false;
                }
                if (props.navTitle) {
                    return props.navTitle;
                }
                return info.attrs.uiTitle;
            });

            const background = computed(() => {
                return props.backgroundColor || info.backgroundColor || router.globalStyle.backgroundColor || "transparent";
            });

            // 显示加载框
            const showLoading = options => {
                loader.loading = true;
                isString(options) ? (loader.text = options) : Object.assign(loader, options);
            };

            // 隐藏加载框
            const hideLoading = () => {
                loader.loading = false;
            };

            // 提示框
            const showToast = options => {
                refs.toast?.open(options);
            };

            // 确认框
            const showConfirm = options => {
                refs.confirm?.open(options);
            };

            // 提示框
            const showTips = (message, callback) => {
                refs.confirm?.open({ title: "提示", message, showCancelButton: false, callback });
            };

            // 扩展
            if (page) {
                page["BasePage"] = { loaded: false, showLoading, hideLoading, showToast, showConfirm, showTips, widthNav: props.widthNav };

                onMounted(() => {
                    page["BasePage"].loaded = true;
                });
            }

            const height = computed(() => {
                if (!props.fullscreen) {
                    return "auto";
                }
                let height = 0;
                // #ifdef H5
                height = windowHeight;
                // #endif

                // #ifndef H5
                if (props?.widthNav) {
                    height = screenHeight;
                }
                // #endif

                return `${height - (safeAreaInsets?.bottom || 0)}px`;
            });

            // const styles = computed(() => {
            //     const output = {
            //         padding: parseRpx(props.padding),
            //         height: height.value
            //     };
            //     // if (props.widthNav) {
            //     //     output.paddingTop = parseRpx(Number(h.value) + Number(props.padding) / 2, "px");
            //     // }
            //     return output;
            // });

            // 滚动事件
            proxy.$root.scrollTo = top => {
                // 减去间距
                if (props.padding) {
                    const [t] = parseRpx(props.padding).split(" ");
                    top -= parseInt(t);
                }
                uni.createSelectorQuery()
                    .in(proxy)
                    .select(".cui-page")
                    .boundingClientRect(() => {
                        uni.pageScrollTo({
                            scrollTop: top,
                            duration: 100
                        });
                    })
                    .exec();
            };

            return {
                navHeight,
                height,
                refs,
                setRefs,
                loader,
                parseRpx,
                navTitleComputed: navTitle,
                background
            };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-page {
        box-sizing: border-box;
        position: relative;
        z-index: 2;

        .safe-area-bottom {
            height: env(safe-area-inset-bottom);
        }

        &__loading {
            position: relative;
            z-index: 9999;
        }

        &__bg {
            position: fixed;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: $cui-color-bg;
            z-index: -1;
        }
    }

    // .is-nav-fixed {
    //     margin-top: v-bind(navHeight);
    // }

    .cui-page-nav {
        @apply sticky top-0 z-999;
    }
</style>
