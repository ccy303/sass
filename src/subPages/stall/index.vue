<template>
    <base-page padding="0">
        <div class="flex-center flex-col w-100% mt-100" v-if="user?.tenant_id == '000000'">
            <div>
                <base-text>您还没有开设摊位，您可以</base-text>
            </div>
            <div class="mt-15">
                <base-button type="primary" size="default" @tap="openStall">开设摊位</base-button>
            </div>
        </div>
    </base-page>
</template>

<script setup>
    import { useUserStore } from "@/stores/user";
    import { storeToRefs } from "pinia";
    import { list } from "@/http/stall";

    const user = storeToRefs(useUserStore()).user;

    console.log(JSON.stringify(user));

    const getUserStallList = async () => {
        const data = await list();
        console.log(data);
    };

    watch(
        () => user,
        async val => {
            if (val.value?.tenant_id) {
                const data = await list();
                console.log(data);
            }
        },
        { immediate: true, deep: true }
    );

    const openStall = () => {};
</script>
