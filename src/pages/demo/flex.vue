<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-row :gutter="20">
                <base-col :span="4" @tap="onTap">
                    <view class="item">4</view>
                </base-col>

                <base-col :span="12">
                    <view class="item">12</view>
                </base-col>

                <base-col :span="8">
                    <view class="item">8</view>
                </base-col>
            </base-row>

            <base-row :gutter="20">
                <base-col :span="8">
                    <view class="item">8</view>
                </base-col>

                <base-col :span="8">
                    <view class="item">8</view>
                </base-col>

                <base-col :span="8">
                    <view class="item">8</view>
                </base-col>
            </base-row>

            <base-row :gutter="20">
                <base-col :span="14">
                    <view class="item">14</view>
                </base-col>

                <base-col :span="4">
                    <view class="item">4</view>
                </base-col>

                <base-col :span="6">
                    <view class="item">6</view>
                </base-col>
            </base-row>

            <base-row :gutter="20" :type="'flex'" justify="space-between">
                <base-col :span="6">
                    <view class="item">6</view>
                </base-col>

                <base-col :span="6">
                    <view class="item">6</view>
                </base-col>
            </base-row>
        </base-card>
    </base-page>
</template>

<script setup>
    const onTap = () => {
        console.log("tap");
    };
</script>

<style lang="scss" scoped>
    .item {
        background-color: #f6f7fa;
        text-align: center;
        font-size: 28rpx;
        height: 60rpx;
        line-height: 60rpx;
        margin: 10rpx 0;
    }
</style>
