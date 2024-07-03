<template>
    <base-page>
        <base-card label="基础用法">
            <base-row>
                <base-col :span="4">
                    <base-loading></base-loading>
                </base-col>
            </base-row>
        </base-card>

        <base-card label="不同大小">
            <base-row>
                <base-col :span="4">
                    <base-loading :size="40"></base-loading>
                </base-col>

                <base-col :span="4">
                    <base-loading :size="50"></base-loading>
                </base-col>

                <base-col :span="4">
                    <base-loading :size="60"></base-loading>
                </base-col>
            </base-row>
        </base-card>

        <base-card label="主题">
            <base-row>
                <base-col :span="4">
                    <base-loading></base-loading>
                </base-col>

                <base-col :span="4">
                    <base-loading theme="snow"></base-loading>
                </base-col>

                <base-col :span="4">
                    <base-loading theme="dot"></base-loading>
                </base-col>
            </base-row>
        </base-card>

        <base-card label="加载区域">
            <base-loading-mask loading>
                <view class="space">
                    12312312312
                    <!-- <base-form>
                        <base-form-item label="昵称">
                            <base-input />
                        </base-form-item>

                        <base-form-item label="性别">
                            <base-select />
                        </base-form-item>
                    </base-form> -->
                </view>
            </base-loading-mask>
        </base-card>
    </base-page>
</template>

<script setup></script>

<style lang="scss" scoped>
    .space {
        font-size: 28rpx;
        background-color: #f6f7fa;
        position: relative;
        padding: 20rpx;
        box-sizing: border-box;
        border-radius: 16rpx;
    }
</style>
