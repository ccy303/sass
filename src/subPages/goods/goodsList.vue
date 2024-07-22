<template>
    <base-page :padding="20">
        <template v-if="list.length">
            <base-card v-for="item in list" :key="item.id" :label="item.name">
                <div>
                    <base-text color="info">商品简述：</base-text>
                    <base-text>{{ item.brief }}</base-text>
                </div>
                <div>
                    <base-text color="info">创建时间：</base-text>
                    <base-text>{{ item.createTime }}</base-text>
                </div>
                <div>
                    <base-text color="info">价格：</base-text>
                    <base-text type="price">{{ item.discountPrice ? item.discountPrice / 100 : item.discountPrice }}</base-text>
                    <base-text type="price" :size="24" lineThrough>{{ item.originalPrice ? item.originalPrice / 100 : item.originalPrice }}</base-text>
                </div>
                <template #footer>
                    <div class="flex-center">
                        <navigator :url="`/subPages/goods/goodsDtl?categorizeId=${categorizeId.value}&goodId=${item.id}`" class="mr-5">
                            <base-button size="small" type="primary">编辑</base-button>
                        </navigator>
                        <base-button size="small" type="error" @tap="() => del(item.id)">删除</base-button>
                    </div>
                </template>
            </base-card>
        </template>
        <template v-else>
            <base-empty />
        </template>
    </base-page>

    <base-fab @fabClick="add" />
</template>

<script setup>
    import { getGoodList, deleteGood } from "@/http/goods";
    import { onShow, onLoad } from "@dcloudio/uni-app";
    import { useUi } from "@/gxota/ui";

    const ui = useUi();
    const categorizeId = ref();
    const list = ref([]);

    const add = () => {
        uni.navigateTo({ url: `/subPages/goods/goodsDtl?categorizeId=${categorizeId.value}` });
    };

    const del = id => {
        ui.showConfirm({
            title: "提示",
            message: "确定要删除吗？",
            type: "warning",
            async callback(type) {
                if (type == "confirm") {
                    await deleteGood([id]);
                    ui.showToast("删除成功");
                    getList();
                }
            }
        });
    };

    const getList = async () => {
        const { records } = await getGoodList({ categoryId: categorizeId.value });
        list.value = records;
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
