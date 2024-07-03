<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-text value="由于 uniapp 限制，cl-page 组件可作为全局组件使用" block color="warning" :margin="[0, 0, 30, 0]" />

            <base-row>
                <base-button @tap="openToast">提示框</base-button>
                <base-button @tap="openConfirm">确认框</base-button>
                <base-button @tap="openLoading">加载框</base-button>
            </base-row>
        </base-card>

        <base-card label="主题示例">
            <base-text value="开发时，请根据设计图自行调整" block color="warning" :margin="[0, 0, 30, 0]" />

            <base-row>
                <base-button @tap="setTheme('default')">默认</base-button>
                <base-button @tap="setTheme('grey')">灰色</base-button>
            </base-row>
        </base-card>
    </base-page>
</template>

<script setup>
    import { useUi } from "@/gxota/ui";

    const ui = useUi();
    // const app = useApp();

    // const setTheme = name => {
    //     // app.theme.set(name);
    // };

    const openToast = () => {
        ui.showToast("lf-cli");
    };

    const openConfirm = () => {
        ui.showConfirm({
            title: "提示",
            type: "warning",
            message: "是否要删除该联系人？"
        });
    };

    const openLoading = () => {
        ui.showLoading({
            text: "2秒后关闭",
            border: false
        });

        setTimeout(() => {
            ui.hideLoading();
        }, 2000);
    };
</script>
