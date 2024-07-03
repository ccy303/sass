<template>
    <base-page :padding="20">
        <base-action-sheet ref="ActionSheet" />

        <base-card label="基础用法">
            <base-button @tap="open">打开</base-button>
        </base-card>

        <base-card label="添加图标">
            <base-button @tap="open2">打开</base-button>
        </base-card>

        <base-card label="禁用">
            <base-button @tap="open3">打开</base-button>
        </base-card>

        <base-card label="关闭回调">
            <base-button @tap="open4">打开</base-button>
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";
    import { useUi } from "@/gxota/ui/index";

    const ui = useUi();

    const ActionSheet = ref();

    const open = () => {
        ActionSheet.value?.open({
            list: [{ label: "删除好友" }]
        });
    };

    const open2 = () => {
        ActionSheet.value?.open({
            list: [{ label: "微信支付", icon: "payment" }]
        });
    };

    const open3 = () => {
        ActionSheet.value?.open({
            list: [
                { label: "删除好友会同时删除所有聊天记录", disabled: true },
                { label: "删除好友", color: "red" }
            ]
        });
    };

    const open4 = () => {
        ActionSheet.value?.open({
            closeOnClickModal: false,
            list: [{ label: "删除好友", color: "red" }],
            beforeClose(index, done) {
                if (index == 0) {
                    ui.showConfirm({
                        title: "提示",
                        message: "是否删除该联系人",
                        callback(action) {
                            if (action == "confirm") {
                                ui.showToast("删除成功");
                            }

                            done();
                        }
                    });
                } else {
                    done();
                }
            }
        });
    };
</script>
