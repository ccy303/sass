<template>
    <base-page :widthNav="false" padding="0">
        <base-image :size="[400, '100%']" :src="bg"></base-image>

        <div class="w-95% mx-auto mt--20 bg-#fff z-99 relative p-20 box-border border-rd-10 flex items-center">
            <base-avatar :size="130" :src="avatar"></base-avatar>
            <div class="ml-20">
                <base-text :size="30" :bold="true">Hi~微信用户</base-text>
            </div>
        </div>

        <div class="w-95% mx-auto bg_#fff mt-20">
            <base-card label="我的功能">
                <base-grid :column="4" :border="false">
                    <base-grid-item>
                        <div class="flex flex-col items-center">
                            <base-image :size="100" :src="gdfw" />
                            <base-text>我的摊位</base-text>
                        </div>
                    </base-grid-item>
                    <base-grid-item>
                        <div class="flex flex-col items-center">
                            <base-image :size="100" :src="wddd" />
                            <base-text>我的订单</base-text>
                        </div>
                    </base-grid-item>
                </base-grid>
            </base-card>
        </div>
    </base-page>
</template>

<script setup>
    import bg from "@/images/9a82219bedcae5c2.jpeg";
    import avatar from "@/images/mine/default.png";
    import gdfw from "@/images/mine/gdfw.png";
    import wddd from "@/images/mine/wddd.png";

    const bgs = ref([{ url: bg }]);
</script>
<style lang="scss" scoped></style>
