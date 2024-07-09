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
                    <base-list-item label="向左滑动" swipe="right">
                        <template #menu>
                            <base-button type="primary">置顶</base-button>
                            <base-button type="error">删除</base-button>
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

    const getUserStallList = async () => {
        const data = await list();
        console.log(data);
    };

    watch(
        () => user,
        async val => {
            val.value?.tenant_id && getUserStallList();
        },
        { immediate: true, deep: true }
    );
</script>
