<template>
	<base-page :padding="0" class="container position-relative">
		<view style="padding-bottom: 130rpx">
			<view class="section-1">
				<template v-if="orderStore.orderType == 'takein'">
					<list-cell class="location">
						<view class="flex-auto flex justify-between items-center">
							<view class="store-name flex-auto">
								{{ orderStore.store.name }}
							</view>
							<image src="/static/images/navigator-1.png" class="arrow"></image>
						</view>
					</list-cell>
				</template>
				<template v-else>
					<list-cell @click="chooseAddress">
						<view class="w-full flex flex-col">
							<view class="flex items-center justify-between mb-10">
								<view class="font-size-40rpx c-#5A5B5C">{{ address.street }}</view>
								<image src="/static/images/navigator-1.png" class="arrow"></image>
							</view>
							<view class="flex text-color-assist font-size-24rpx items-center">
								<view class="mr-10">{{ orderStore.address.accept_name }}</view>
								<view class="mr-10">{{ !orderStore.address.sex ? "先生" : "女士" }}</view>
								<view>{{ address.mobile }}</view>
							</view>
						</view>
					</list-cell>
				</template>
				<template v-if="orderStore.orderType == 'takein'">
					<list-cell arrow class="meal-time">
						<view class="flex-auto flex justify-between items-center">
							<view class="title">取餐时间</view>
							<view class="time">立即用餐</view>
						</view>
					</list-cell>
					<list-cell class="contact" last :hover="false">
						<view class="flex-auto flex justify-between items-center">
							<view class="title flex-auto">联系电话</view>
							<view class="time">
								<input class="text-right" placeholder="请输入手机号码" value="18666600000" />
							</view>
							<view class="contact-tip font-size-24rpx">自动填写</view>
						</view>
					</list-cell>
				</template>
				<template v-else>
					<list-cell>
						<view class="w-full flex flex-col">
							<view class="flex items-center font-size-base c-#5A5B5C">
								<view class="flex-auto">预计送达时间</view>
								<view class="mr-10">15:18</view>
								<image src="/static/images/navigator-1.png" class="arrow"></image>
							</view>
							<view class="font-size-base c-#6b69f8"> 特殊时期减少接触，请修改下方订单备注 </view>
						</view>
					</list-cell>
				</template>
			</view>
			<!-- 购物车列表 begin -->
			<view class="section-2">
				<view class="cart flex flex-col">
					<list-cell last v-for="(item, index) in cart" :key="index">
						<view class="w-full flex flex-col">
							<view class="flex items-center mb-10">
								<view class="name-and-props overflow-hidden">
									<view class="c-#5A5B5C font-size-32rpx">
										{{ item.name }}
									</view>
								</view>
								<view
									class="flex flex-auto justify-between items-center c-#5A5B5C font-size-32rpx">
									<view>x{{ item.number }}</view>
									<view>￥{{ item.price }}</view>
								</view>
							</view>
							<view class="text-truncate font-size-base text-color-assist">
								{{ item.props_text }}
							</view>
						</view>
					</list-cell>
					<template v-if="orderStore.orderType == 'takeout'">
						<list-cell last v-if="orderStore.store.packing_fee > 0">
							<view class="w-full flex font-size-base items-center justify-between">
								<view>包装费</view>
								<view>￥{{ parseFloat(orderStore.store.packing_fee) }}</view>
							</view>
						</list-cell>
						<list-cell last v-if="orderStore.store.delivery_cost > 0">
							<view class="w-full flex font-size-base items-center justify-between">
								<view>配送费</view>
								<view>￥{{ parseFloat(orderStore.store.delivery_cost) }}</view>
							</view>
						</list-cell>
					</template>
				</view>
				<list-cell arrow @click="goToPackages">
					<view class="flex-auto flex justify-between items-center">
						<view class="c-#5A5B5C">奈雪券</view>
						<view class="c-#6b69f8">超值购买优惠券大礼包</view>
					</view>
				</list-cell>
				<list-cell arrow>
					<view class="flex-auto flex justify-between items-center">
						<view class="c-#5A5B5C">礼品卡</view>
						<view class="c-#6b69f8">请选择</view>
					</view>
				</list-cell>
				<list-cell last>
					<view class="flex-auto flex justify-end items-center">
						<view>总计￥{{ total }},实付</view>
						<view class="font-size-40rpx font-weight-bold">￥{{ amount }}</view>
					</view>
				</list-cell>
			</view>
			<!-- 购物车列表 end -->
			<view class="flex items-center justify-start font-size-24rpx c-#FAB714"
				style="padding: 20rpx 0">
				<view class="iconfont iconhelp line-height-100%"></view>
				<view>优惠券不与满赠、满减活动共享</view>
			</view>
			<!-- 支付方式 begin -->
			<view class="payment">
				<list-cell last :hover="false">
					<text>支付方式</text>
				</list-cell>
				<list-cell>
					<view class="flex items-center justify-between w-full disabled">
						<view class="iconfont iconbalance line-height-100% payment-icon"></view>
						<view class="flex-auto">余额支付（余额￥0）</view>
						<view class="font-size-24rpx">余额不足</view>
						<view class="iconfont iconradio-button-off line-height-100% checkbox"></view>
					</view>
				</list-cell>
				<list-cell last>
					<view class="flex items-center justify-between w-full">
						<view class="iconfont iconwxpay line-height-100% payment-icon" style="color: #7eb73a"></view>
						<view class="flex-auto">微信支付</view>
						<view class="iconfont iconradio-button-on line-height-100% checkbox checked"></view>
					</view>
				</list-cell>
			</view>
			<!-- 支付方式 end -->
			<!-- 备注 begin -->
			<list-cell arrow last @click="goToRemark">
				<view class="flex flex-auto items-center justify-between overflow-hidden">
					<view class="flex-shrink-0 mr-20">备注</view>
					<view class="c-#6b69f8 flex-auto text-truncate text-right">{{ form.remark || "点击填写备注" }}</view>
				</view>
			</list-cell>
			<!-- 备注 end -->
		</view>
		<!-- 付款栏 begin -->
		<view class="w-full pay-box position-fixed bottom-0 right-0 left-0 z-1030 flex items-center justify-between bg-white">
			<view class="font-size-24rpx" style="margin-left: 20rpx">合计：</view>
			<view class="font-size-32rpx flex-auto">￥{{ amount }}</view>
			<view class="bg-#6b69f8 h-full flex items-center justify-center color-white font-size-28rpx"
				style="padding: 0 60rpx" @tap="submit">
				付款
			</view>
		</view>
		<!-- 付款栏 end -->
		<modal :show="ensureAddressModalVisible" custom :mask-closable="false" :radius="0" width="90%">
			<view class="modal-content">
				<view class="flex justify-end">
					<image src="/static/images/pay/close.png" style="width: 40rpx; height: 40rpx"
						@tap="ensureAddressModalVisible = false"></image>
				</view>
				<view class="flex justify-center items-center" style="margin-bottom: 40px">
					<view class="font-size-40rpx c-#5A5B5C">请再次确认下单地址</view>
				</view>
				<view
					class="flex font-size-base c-#5A5B5C font-weight-bold items-center justify-between mb-20">
					<view>{{ orderStore.address.accept_name }} {{ orderStore.address.sex ? "女士" : "先生" }}</view>
					<view>{{ orderStore.address.mobile }}</view>
				</view>
				<view class="flex font-size-24rpx text-color-assist items-center justify-between mb-40">
					<view>{{ orderStore.address.street + orderStore.address.door_number }}</view>
					<button type="primary" size="mini" plain class="change-address-btn">修改地址</button>
				</view>
				<button type="primary" class="pay_btn" @tap="pay">确认并付款</button>
			</view>
		</modal>
	</base-page>
</template>
<script setup>
import listCell from "./list-cell/list-cell";
import modal from "@/pages/menu/modal/modal";
import orders from "@/http/data/orders";
import { useOrderStore } from "@/stores/order";
import { onLoad } from "@dcloudio/uni-app";

const orderStore = useOrderStore();

const cart = ref([]);
const form = reactive({ remark: "" });
const ensureAddressModalVisible = ref(false);

const total = computed(() => {
	return cart.value.reduce((acc, cur) => acc + cur.number * cur.price, 0);
});
const amount = computed(() => {
	return cart.value.reduce((acc, cur) => acc + cur.number * cur.price, 0);
});

onLoad(async option => {
	const { remark } = option;
	cart.value = uni.getStorageSync("cart");
	if (remark) {
		form.remark = remark;
	}
});

const goToRemark = () => {
	uni.navigateTo({
		url: "/pages/remark/remark?remark=" + form.remark
	});
};
const chooseAddress = () => {
	uni.navigateTo({
		url: "/pages/address/address?is_choose=true&scene=pay"
	});
};
const goToPackages = () => {
	uni.navigateTo({
		url: "/pages/packages/index"
	});
};
const submit = () => {
	if (orderStore.orderType == "takeout") {
		ensureAddressModalVisible.value = true;
	} else {
		pay();
	}
};
const pay = () => {
	uni.showLoading({ title: "加载中" });
	//测试订单
	let order = orderStore.orderType == "takein" ? orders[0] : orders[1];
	order = Object.assign(order, { status: 1 });
	orderStore.orderType = order;
	uni.removeStorageSync("cart");
	uni.reLaunch({
		url: "/pages/take-foods/take-foods"
	});
	uni.hideLoading();
}
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
}

.arrow {
	width: 50rpx;
	height: 50rpx;
	position: relative;
	margin-right: -10rpx;
}

.location {
	.store-name {
		font-size: 32rpx;
	}

	.iconfont {
		font-size: 50rpx;
		line-height: 100%;
		color: $color-primary;
	}
}

.section-1 {
	margin-bottom: 30rpx;

	.contact {
		.contact-tip {
			margin-left: 10rpx;
			border: 2rpx solid $color-primary;
			padding: 6rpx 10rpx;
			color: $color-primary;
		}
	}
}

.section-2 {
	.name-and-props {
		width: 65%;
	}
}

.payment {
	margin-bottom: 30rpx;

	.disabled {
		color: $text-color-grey;
	}

	.payment-icon {
		font-size: 44rpx;
		margin-right: 10rpx;
	}

	.checkbox {
		font-size: 36rpx;
		margin-left: 10rpx;
	}

	.checked {
		color: $color-primary;
	}
}

.pay-box {
	box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	height: 100rpx;
}

.modal-content {
	.change-address-btn {
		line-height: 2;
		padding: 0 1em;
	}

	.pay_btn {
		width: 100%;
		border-radius: 50rem !important;
		line-height: 3;
	}
}</style>
