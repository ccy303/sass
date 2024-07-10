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
        <div>
            <base-card>
                <base-list>
                    <base-list-item v-for="item in myShop" :key="item.id" :label="item.shopName" swipe="right">
                        <template #menu>
                            <div class="flex-center">
                                <navigator url="/subPages/stall/detail" class="mr-5">
                                    <base-button size="small" type="primary">店铺设置</base-button>
                                </navigator>
                                <navigator url="/subPages/goods/index">
                                    <base-button size="small" type="warning">商品设置</base-button>
                                </navigator>
                            </div>
                        </template>
                        <template #append>
                            <base-text color="info">右滑更多</base-text>
                        </template>
                    </base-list-item>
                </base-list>
            </base-card>
        </div>
    </base-page>
</template>

<script setup>
    import { useUserStore } from "@/stores/user";
    import { storeToRefs } from "pinia";
    import { list } from "@/http/stall";

    const user = storeToRefs(useUserStore()).user;

    const myShop = ref([]);

    const getUserStallList = async () => {
        const { records } = (await list()) || {};
        if (records) {
            myShop.value = records;
        }
    };

    watch(
        () => user,
        async val => {
            val.value?.tenant_id && getUserStallList();
        },
        { immediate: true, deep: true }
    );
</script>
