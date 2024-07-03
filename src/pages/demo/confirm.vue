<template>
    <base-page>
        <base-confirm ref="Confirm"> </base-confirm>

        <base-confirm ref="Confirm2">
            <base-input />
        </base-confirm>

        <base-confirm ref="Confirm3"> </base-confirm>

        <base-confirm ref="Confirm4"> </base-confirm>

        <base-card label="基础用法">
            <base-button @tap="open">打开</base-button>
        </base-card>

        <base-card label="自定义内容">
            <base-button @tap="open2">打开</base-button>
        </base-card>

        <base-card label="关闭回掉">
            <base-button @tap="open3">打开</base-button>
        </base-card>

        <base-card label="不同类型">
            <base-button @tap="open4('success')">成功</base-button>
            <base-button @tap="open4('warning')">警告</base-button>
            <base-button @tap="open4('error')">错误</base-button>
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";
    import { useUi } from "@/gxota/ui/index";

    const ui = useUi();
    const Confirm = ref();
    const Confirm2 = ref();
    const Confirm3 = ref();
    const Confirm4 = ref();

    const open = () => {
        Confirm.value?.open({
            title: "提示",
            message: "你有一个待取信件",
            callback(action) {
                console.log(action);
                switch (action) {
                    case "confirm":
                        ui.showToast("领取成功");
                        break;

                    case "cancel":
                        ui.showToast("已取消");
                        break;

                    case "close":
                        ui.showToast("已关闭");
                        break;
                }
            }
        });
    };

    const open2 = () => {
        Confirm2.value?.open({ title: "提示" });
    };

    const open3 = () => {
        Confirm3.value?.open({
            title: "提示",
            message: "你有一个待取信件",
            beforeClose(action, { done, showLoading }) {
                if (action == "confirm") {
                    showLoading();
                    setTimeout(() => {
                        done();
                    }, 1500);
                } else {
                    done();
                }
            }
        });
    };

    //  "success" | "warning" | "error"
    const open4 = type => {
        Confirm4.value?.open({ title: "提示", message: "这是一条消息", type, showCancelButton: false });
    };
</script>
