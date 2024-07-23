<template>
	<view class="container w-full h-full" v-if="!loading">
		<view class="flex flex-col w-full" style="padding: 30rpx; padding-bottom: -34rpx; margin-bottom: 150rpx;">
			<view class="flex items-center bg-white" 
				style="padding: 30rpx; height: 220rpx; margin-bottom: 34rpx; border-radius: 8rpx;" 
				v-for="(item, index) in packages" :key="index"  @tap="pay(item.id)">
				<image :src="item.image" style="width: 200rpx; height: 160rpx; margin-right: 20rpx;"></image>
				<view class="flex flex-auto flex-col justify-between" style="height: 160rpx;">
					<view class="font-size-lg text-color-base">{{ item.title }}</view>
					<view class="flex justify-between items-center">
						<view class="font-size-sm">￥{{ item.amount }}</view>
						<button type="primary" size="mini" plain class="pay-btn">去购买</button>
					</view>
				</view>
			</view>
		</view>
		<view class="flex position-fixed bg-base bottom-0 left-0 right-0 z-1030 text-color-primary font-size-28rpx items-center just-center w-full"
			style="height: 150rpx;">
			<text>购买记录</text>
		</view>
	</view>
	<base-loading v-else></base-loading>
</template>

<script setup>
	import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
	import $api from '@/http/data'

	const loading = ref(false)
	const packages = ref([])


	onLoad(async () => {
		await this.getPackages()
	})

	onPullDownRefresh(async () => {
		await this.getPackages()
	})
	
	const  getPackages = async () => {
		loading.value = true
		packages.value = await $api('packages')
		loading.value = false
	}

	const pay = (id) => {
		uni.navigateTo({
			url: '/subPages/packages/detail?id=' + id
		})
	}
	
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: -150rpx;
	}
	
	.pay-btn {
		height: 50rpx;
		width: 120rpx;
		font-size: $font-size-sm;
		border-radius: 50rpx;
		padding: 0;
		line-height: 50rpx;
		text-align: center;
	}
</style>
