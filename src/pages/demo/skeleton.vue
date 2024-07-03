<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <view class="count">
                <view class="item" v-for="(item, index) in list" :key="index">
                    <base-skeleton :height="120" :width="120" :radius="120" :margin="[0, 0, 20, 0]" :loading="!item.avatar">
                        <base-image :radius="120" :src="item.avatar" background-color="#fff" v-if="item.avatar" />
                    </base-skeleton>

                    <base-skeleton :custom-style="{ height: '28rpx', width: '90rpx', borderRadius: '6rpx' }" :loading="!item.name">
                        <base-text :size="24" align="center" block>{{ item.name }}</base-text>
                    </base-skeleton>
                </view>
            </view>
        </base-card>

        <base-card label="基础用法2">
            <base-banner :list="list" type="card" :height="300">
                <template #item="{ item }">
                    <base-skeleton :radius="12" height="100%" :loading="!item.bg">
                        <image class="size-100%" :src="item.bg" mode="aspectFill" />
                    </base-skeleton>
                </template>
            </base-banner>
        </base-card>
    </base-page>
</template>

<script setup>
    import { onReady } from "@dcloudio/uni-app";
    import { uniqueId } from "lodash-es";

    const list = ref([{}, {}, {}]);

    const get = () => {
        setTimeout(() => {
            list.value = list.value.map((_, i) => {
                return {
                    id: uniqueId(),
                    avatar: `https://img2.baidu.com/it/u=304293407,1878548733&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=500`,
                    bg: `https://img2.baidu.com/it/u=304293407,1878548733&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=500`,
                    name: ["小青", "小白", "小黑", "笑死"][i]
                };
            });
        }, 1500);
    };

    onReady(() => {
        get();
    });
</script>

<style lang="scss" scoped>
    .count {
        display: flex;
        padding: 20rpx 0;

        .item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200rpx;
        }
    }
</style>
