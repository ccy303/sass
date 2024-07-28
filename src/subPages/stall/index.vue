<template>
    <base-page :padding="20">
        <div class="flex-center flex-col w-100% mt-100" v-if="user?.tenant_id == '000000'">
            <div>
                <base-text>您还没有开设摊位，您可以</base-text>
            </div>
            <div class="mt-15">
                <navigator url="/subPages/stall/detail">
                    <base-button type="primary" size="default">开设摊位</base-button>
                </navigator>
            </div>
        </div>
        <div v-else>
            <template v-for="item in myShop" :key="item.id">
                <base-card :label="item.shopName">
                    <div class="flex-center justify-start">
                        <base-text>店铺设置：</base-text>
                        <navigator :url="`/subPages/stall/detail?id=${item.id}`">
                            <base-button size="small" type="primary">前往</base-button>
                        </navigator>
                    </div>
                    <div class="mt-10 flex-center justify-start">
                        <base-text>商品设置：</base-text>
                        <navigator url="/subPages/goods/categorizeList">
                            <base-button size="small" type="primary">前往</base-button>
                        </navigator>
                    </div>
                    <div class="mt-10 flex-center justify-start">
                        <base-text>摊位订单：</base-text>
                        <navigator url="/subPages/orders/orders">
                            <base-button size="small" type="primary">前往</base-button>
                        </navigator>
                    </div>
                    <div class="mt-10 flex-center justify-start">
                        <base-text>营业状态：</base-text>
                        <base-switch
                            v-model="item.status"
                            :activeValue="1"
                            :inactiveValue="0"
                            @change="data => statusChange(data, item.id)"
                        ></base-switch>
                    </div>
                </base-card>
            </template>
        </div>
    </base-page>
</template>

<script setup>
    import { useUserStore } from "@/stores/user";
    import { storeToRefs } from "pinia";
    import { list, create } from "@/http/stall";
    import { useUi } from "@/gxota/ui";

    const ui = useUi();

    const user = storeToRefs(useUserStore()).user;

    const myShop = ref([]);

    const getUserStallList = async () => {
        const { records } = (await list()) || {};
        if (records) {
            myShop.value = records;
        }
    };

    const statusChange = async (e, id) => {
        await create({
            id: id,
            status: e
        });
        ui.showToast("修改成功");
        getUserStallList();
    };

    watch(
        () => user,
        async val => {
            val.value?.tenant_id && getUserStallList();
        },
        { immediate: true, deep: true }
    );
</script>
