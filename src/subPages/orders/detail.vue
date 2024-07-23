<template>
	<base-page class="container" style="padding:20rpx;">
		<view style="padding-bottom: 100rpx;">
			<view class="bg-white">
				<view class="section">
					<!-- store info begin -->
					<list-cell :hover="false">
						<view class="w-full flex items-center">
							<view class="flex flex-col w-60%">
								<view class="w-full font-size-32rpx text-color-base text-truncate mb-10rpx">{{ order.store.name
								}}</view>
								<view class="w-full flex items-center overflow-hidden">
									<image src="/static/images/order/location.png" class="flex-shrink-0"
										style="width: 30rpx; height: 30rpx;"></image>
									<view class="text-truncate font-size-24rpx text-color-assist">{{ order.store.address }}
									</view>
								</view>
							</view>
							<view class="flex justify-end items-center w-40%">
								<image src="/static/images/order/mobile.png"
									style="width: 60rpx; height: 60rpx;margin-right: 30rpx;"></image>
								<image src="/static/images/order/navigation.png" style="width: 60rpx; height: 60rpx;">
								</image>
							</view>
						</view>
					</list-cell>
					<!-- store info end -->
					<!-- goods begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-full flex flex-col position-relative" style="margin-bottom: -40rpx;">
							<view class="w-full flex items-center mb-40rpx" v-for="(good, index) in order.goods"
								:key="index">
								<view class="flex flex-col w-60% overflow-hidden">
									<view class="font-size-32rpx text-color-base mb-10rpx text-truncate">{{ good.name }}</view>
									<view class="font-size-24rpx text-color-assist text-truncate">{{ good.property }}</view>
								</view>
								<view class="flex w-40% items-center justify-between pl-30rpx">
									<view class="font-size-28rpx text-color-base">x{{ good.number }}</view>
									<view class="font-size-28rpx text-color-base font-bold">￥{{ good.price }}</view>
								</view>
							</view>
						</view>
					</list-cell>
					<!-- goods end -->
				</view>
				<view class="section">
					<!-- payment and amount begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-full flex flex-col">
							<view class="pay-cell">
								<view>支付方式</view>
								<view class="font-bold">{{ order.pay_mode }}</view>
							</view>
							<view class="pay-cell">
								<view>金额总计</view>
								<view class="font-bold">￥{{ order.amount }}</view>
							</view>
						</view>
					</list-cell>
					<!-- payment and amount end -->
				</view>
				<view class="section">
					<!-- order info begin -->
					<list-cell :hover="false" padding="50rpx 30rpx">
						<view class="w-full flex flex-col">
							<view class="pay-cell">
								<view>下单时间</view>
								<view class="font-bold">{{ moment(order.created_at).format('YYYY-MM-DD HH:mm:ss') }}</view>
							</view>
							<view class="pay-cell">
								<view>下单门店</view>
								<view class="font-bold">{{ order.store.name }}</view>
							</view>
							<view class="pay-cell">
								<view>支付方式</view>
								<view class="font-bold">{{ order.pay_mode }}</view>
							</view>
							<view class="pay-cell">
								<view>订单号</view>
								<view class="font-bold">{{ order.order_no }}</view>
							</view>
						</view>
					</list-cell>
					<!-- order info end -->
				</view>
				<!-- order other info begin -->
				<list-cell :hover="false" padding="50rpx 30rpx 20rpx" last>
					<view class="w-full flex flex-col">
						<view class="pay-cell">
							<view>取单号</view>
							<view class="font-bold">{{ order.sort_num }}</view>
						</view>
						<view class="pay-cell">
							<view>享用方式</view>
							<view class="font-bold">自取</view>
						</view>
						<view class="pay-cell">
							<view>取餐时间</view>
							<view class="font-bold">立即取餐</view>
						</view>
						<view class="pay-cell">
							<view>完成制作时间</view>
							<view class="font-bold">{{ order.productioned_time }}</view>
						</view>
						<view class="pay-cell">
							<view>备注</view>
							<view class="font-bold">{{ order.postscript }}</view>
						</view>
					</view>
				</list-cell>
				<!-- order other info end -->
			</view>
			<view class="position-relative w-full">
				<image src="/static/images/order/bottom.png" mode="widthFix" class="w-full"></image>
				<view class="invote-box" v-if="!order.invoice_status">
					<view class="font-size-28rpx text-color-primary" @tap="goToInvoice">去开发票</view>
					<image src="/static/images/order/right.png"></image>
				</view>
			</view>
		</view>
		<view class="btn-box">
			<view class="item" v-if="order.invoice_status > 0"><button type="primary">查看发票</button></view>
			<view class="item"><button type="primary" plain @tap="review">去评价</button></view>
			<view class="item"><button type="primary">再来一单</button></view>
		</view>
	</base-page>
</template>

<script setup>
import moment from 'moment'
import Orders from '@/http/data/orders';
import listCell from './list-cell/list-cell';
import { onLoad } from '@dcloudio/uni-app'

const order = ref([])

onLoad(({ id }) => {
	order.value = Orders.find(item => item.id == id);
})

const review = () => {
	const date = order.value.completed_time.split(' ')[0]
	uni.navigateTo({
		url: '/subPages/orders/review?storename=' + order.value.store.name + '&typeCate=' + order.value.typeCate + '&date=' + date
	})
}
const goToInvoice = () => {
	uni.navigateTo({
		url: '/subPages/orders/invoice'
	})
}

</script>

<style lang="scss" scoped>
@mixin arch {
	content: "";
	position: absolute;
	background-color: $bg-color;
	width: 30rpx;
	height: 30rpx;
	bottom: -15rpx;
	z-index: 10;
	border-radius: 100%;
}

.section {
	position: relative;

	&::before {
		@include arch;
		left: -15rpx;
	}

	&::after {
		@include arch;
		right: -15rpx;
	}
}

.pay-cell {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 28rpx;
	color: $text-color-base;
	margin-bottom: 40rpx;

	&:nth-last-child(1) {
		margin-bottom: 0;
	}
}

.invote-box {
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	image {
		width: 30rpx;
		height: 30rpx;
	}
}

.btn-box {
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120rpx;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	z-index: 11;

	.item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rpx 10rpx;
		flex: 1;
		flex-shrink: 0;

		button {
			width: 100%;
			border-radius: 50rem !important;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
		}
	}
}</style>
