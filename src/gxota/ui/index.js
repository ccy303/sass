import { router } from "@/gxota/router";

export const useUi = () => {
    const ui = {
        get loaded() {
            return router.currentPage()?.["BasePage"]?.loaded;
        },
        get widthNav() {
            return router.currentPage()?.["BasePage"]?.widthNav;
        }
    };

    const keys = ["showLoading", "hideLoading", "showToast", "showTips", "showConfirm"];

    keys.forEach(k => {
        ui[k] = (...args) => {
            const d = router.currentPage()?.["BasePage"];
            if (d) {
                d[k]?.(...args);
            }
        };
    });

    return ui;
};
