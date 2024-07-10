<template>
    <base-page :padding="20">
        <base-card>
            <base-list>
                <base-list-item v-for="item in list" :key="item.id" :label="item.name" swipe="right">
                    <template #menu>
                        <div class="flex-center">
                            <navigator url="/shop/goods/categorizeDtl" class="mr-5">
                                <base-button size="small" type="warning">编辑</base-button>
                            </navigator>
                            <navigator url="/shop/goods/categorizeList" class="mr-5">
                                <base-button size="small" type="primary">商品</base-button>
                            </navigator>
                            <base-button size="small" type="error" @tap="() => del(item.id)">删除</base-button>
                        </div>
                    </template>
                    <template #append>
                        <base-text color="info">右滑更多</base-text>
                    </template>
                </base-list-item>
            </base-list>
        </base-card>
    </base-page>

    <base-fab @fabClick="add" />
</template>

<script setup>
    import { getCategoryList, deleteCategory } from "@/http/goods";
    import { onShow } from "@dcloudio/uni-app";
    import { useUi } from "@/gxota/ui";

    const ui = useUi();
    const list = ref([]);

    const getList = async () => {
        const { records } = await getCategoryList();
        list.value = records;
    };

    const del = async id => {
        ui.showConfirm({
            title: "提示",
            message: "确定要删除吗？",
            type: "warning",
            async callback(type) {
                if (type == "confirm") {
                    await deleteCategory([id]);
                    ui.showToast("删除成功");
                    getList();
                }
            }
        });
    };

    onShow(() => {
        getList();
    });

    const add = () => {
        uni.navigateTo({ url: "/subPages/goods/categorizeDtl?type=add" });
    };
</script>

<style lang="scss" scope>
    .actions {
        @apply flex;
        &-item {
            @apply flex-center flex-col w-55 px-5;
        }
    }
</style>
