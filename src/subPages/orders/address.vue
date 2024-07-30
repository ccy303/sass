<template>
	<base-page>
	<view class="w-full h-full">
		<view class="main w-full p-30rpx flex flex-col pb-100rpx">
			<view v-if="!shopList.length" class="no-address-tips">
				<view class="mb-30rpx">暂无地址信息</view>
				<view>请点击底部按钮添加地址信息</view>
			</view>
			<template v-else>
				<view v-for="(address, index) in shopList" :key="index" class="address w-full py-40rpx px-30rpx bg-white flex justify-between items-center" @tap="chooseAddress(address)">
					<view class="left flex-auto overflow-hidden mr-20rpx">
						<view class="font-size-28rpx font-bold text-truncate" style="margin-bottom: 10rpx;">{{ address.shopName }}</view>
						<view class="font-size-24rpx c-#919293">
							{{ address.slogan }} {{ address.createTime }}
						</view>
					</view>
					<!-- <image src="/static/images/edit.png" class="edit-icon" @tap.stop="edit(address.id)"></image> -->
				</view>
			</template>
		</view>
		<!-- <view class="btn-box">
			<button type="primary" size="default" @tap="add">新增地址</button>
		</view> -->
	</view>
	</base-page>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { useOrderStore } from "@/stores/order";
	import { useCommonStore } from "@/stores/common";
	import { list, getHomePageModules } from "@/http/stall";

	const orderStore = useOrderStore();
	const commonStore = useCommonStore();

	const scene = ref('')
	const is_choose = ref(false)
	const swipeOption = ref([
		{
			text: '删除',
			style: {
				backgroundColor: '#D12E32'
			}
		}
	])
	const shopList = ref([])

	onLoad(async(option) => {
		is_choose.value = option.is_choose || false
		scene.value = option.scene || 'menu'
		const res = await list()
		shopList.value = res?.records || []
		console.log(res)
	})

	const chooseAddress = async (shop) => {
		if(!is_choose.value) return
		orderStore.setAddress(shop)

		commonStore.setShopTenantId(shop.tenantId);
        commonStore.setShopId(shop.id);
        commonStore.setDeskNo(null);

		const data = await getHomePageModules({ shopId: shop.id});
        commonStore.setHomeModules(data);
        commonStore.setLoaded();


		if(scene.value == 'menu') {
			uni.switchTab({
				url: '/pages/menu/menu'
			})
		} else if(scene.value == 'pay') {
			uni.navigateTo({
				url: '/pages/pay/pay'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
	}
	
	.main {
		width: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		padding-bottom: 100rpx;
		
		.address-wrapper {
			margin-bottom: 30rpx;
		}
		
		.address {
			width: 100%;
			padding: 40rpx 30rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.right {
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
			}
			
			.edit-icon {
				width: 50rpx;
				height: 50rpx;
				flex-shrink: 0;
			}
		}
	}
	
	.btn-box {
		height: 100rpx;
		background-color: #FFFFFF;
		box-shadow: 0 0 20rpx rgba($color: $text-color-assist, $alpha: 0.1);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		
		button {
			height: 80rpx;
			width: 80%;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
