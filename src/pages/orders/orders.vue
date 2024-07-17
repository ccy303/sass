<template>
	<view class="container">
		<view class="orders-list flex flex-col w-full" style="padding: 20rpx; padding-bottom: 0;">
			<view class="order-item" v-for="(item, index) in orders" :key="index" style="margin-bottom: 30rpx;"
				@tap="detail(item.id)">
				<list-cell :hover="false">
					<view class="w-full flex items-center">
						<view class="flex-auto flex flex-col">
							<view class="font-size-32rpx text-color-base" style="margin-bottom: 20rpx;">
								{{ item.store.name }}
							</view>
							<view class="font-size-24rpx text-color-assist">订单编号：{{ item.order_no }}</view>
						</view>
						<view class="font-size-32rpx text-color-primary">
							{{ item.status_text }}
						</view>
					</view>
				</list-cell>
				<list-cell :hover="false" last>
					<view class="w-full flex flex-col">
						<view class="w-full text-truncate font-size-32rpx text-color-base" style="margin-bottom: 20rpx;">
							{{ orderGoodsName(item.goods) }}
						</view>
						<view class="flex justify-between items-center" style="margin-bottom: 30rpx;">
							<view class="font-size-24rpx text-color-assist">
								{{ moment(item.created_at * 1000).format('YYYY-MM-DD hh:mm:ss') }}
							</view>
							<view class="flex font-size-24rpx text-color-base items-center">
								<view style="margin-right: 10rpx;">共{{ item.goods_num }}件商品，实付</view>
								<view class="font-size-32rpx">￥{{ item.amount }}</view>
							</view>
						</view>
						<view class="flex items-center justify-end">
							<view style="margin-right: 10rpx;">
								<button type="primary" plain size="mini" v-if="item.invoice_status > 0">查看发票</button>
								<button type="primary" plain size="mini" v-else @tap.stop="goToInvoice">开发票</button>
							</view>
							<view>
								<button type="primary" plain size="mini" @tap.stop="review(item)">去评价</button>
							</view>
						</view>
					</view>
				</list-cell>
			</view>
		</view>
	</view>
</template>

<script setup>
import listCell from './list-cell/list-cell'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { useOrderStore } from "@/stores/order";
import moment from 'moment';

import $api from '@/http/data'

const orderStore = useOrderStore();

const page = ref(1)
const pageSize = ref(5)
const orders = ref([])

const orderGoodsName = computed(() => {
	return (goods) => {
		let arr = []
		goods.forEach(good => arr.push(good.name + '*' + good.number))
		return arr.join('，')
	}
})

onLoad(async () => {
	if (!orderStore.isLogin) {
		uni.navigateTo({ url: '/pages/login/login' })
	}
	await getOrders(false)
})

onReachBottom(async () => {
	await getOrders(false)
})
onPullDownRefresh(async () => {
	await getOrders(true)
})

const getOrders = async (isRefresh = false) => {
	uni.showLoading({
		title: '加载中'
	})

	let _orders = await $api('orders')
	console.log(_orders)
	if (isRefresh) {
		orders.value = []
		page.value = 1
	}
	_orders = _orders.slice(pageSize.value * (page.value - 1), pageSize.value * page.value)
	if (_orders.length) {
		orders.value = orders.value.concat(_orders)
		page.value += 1
	}

	uni.hideLoading()
}
const detail = (id) => {
	uni.navigateTo({
		url: '/subPages/orders/detail?id=' + id
	})
}
const review = (order) => {
	const date = order.completed_time.split(' ')[0]
	uni.navigateTo({
		url: '/subPages/orders/review?storename=' + order.store.name + '&typeCate=' + order.typeCate + '&date=' + date
	})
}
const goToInvoice = () => {
	uni.navigateTo({
		url: '/subPages/orders/invoice'
	})
}

</script>

<style lang="scss" scoped></style>
