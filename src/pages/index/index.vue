<template>
    <base-page :widthNav="false" fullscreen padding="0">
        <view class="logo">
            <text class="name">欢迎光临</text>
        </view>
    </base-page>
</template>

<script setup>
    import { useCommonStore } from "@/stores/common";
    import { storeToRefs } from "pinia";

    const { loaded } = storeToRefs(useCommonStore());

    watch(loaded, val => {
        val &&
            setTimeout(() => {
                uni.switchTab({ url: "/pages/home/index" });
            }, 2000);
    });
</script>

<style lang="scss" scoped>
    .logo {
        @apply h-100vh w-100vw flex-center;

        .name {
            @apply font-size-40;
            animation: showName 2.5s forwards;
            background: linear-gradient(to right, #6b69f8, #a35df2, #d14bd8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        @keyframes showName {
            from {
                letter-spacing: -40rpx;
                filter: blur(20rpx);
            }

            to {
                letter-spacing: 6rpx;
            }
        }
    }
</style>
