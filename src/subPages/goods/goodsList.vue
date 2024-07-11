<template>
    <base-page :padding="20">
        <base-card v-for="item in list" :key="item.id" label="ASDASD">
            <template #footer>
                <div class="flex-center">
                    <navigator url="/pages/" class="mr-5">
                        <base-button size="small" type="primary">编辑</base-button>
                    </navigator>
                    <base-button size="small" type="error" @tap="() => del(item.id)">删除</base-button>
                </div>
            </template>
        </base-card>
    </base-page>

    <base-fab @fabClick="add" />
</template>

<script setup>
    import { getGoodsList, deleteGoods } from "@/http/goods";
    import { onShow, onLoad } from "@dcloudio/uni-app";
    import { useUi } from "@/gxota/ui";

    const ui = useUi();
    const categorizeId = ref();
    const list = ref([]);

    const add = () => {
        uni.navigateTo({ url: "/subPages/goods/goodsDtl" });
    };

    const del = id => {
        ui.showConfirm({
            title: "提示",
            message: "确定要删除吗？",
            type: "warning",
            async callback(type) {
                if (type == "confirm") {
                    await deleteGoods([id]);
                    ui.showToast("删除成功");
                    getList();
                }
            }
        });
    };

    const getList = async () => {
        const { records } = await getGoodsList({});
        // list.value = records;
        list.value = [1, 2, 3, 4, 5];
    };

    onShow(() => {
        categorizeId.value && getList();
    });

    onLoad(options => {
        categorizeId.value = options?.categorizeId;
    });
</script>

<style lang="scss" scope>
    .actions {
        @apply flex;
        &-item {
            @apply flex-center flex-col w-55 px-5;
        }
    }
</style>
