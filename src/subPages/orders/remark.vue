<template>
	<base-page class="container w-full h-full overflow-hidden">
		<view class="textarea">
			<textarea placeholder-class="text-color-assist font-size-28rpx" v-model="remark"
				class="bg-white w-full box-border font-size-28rpx remark"
				:class="{'text-color-danger': remarkLength > 50, 'text-color-assist' : remarkLength <=50}"
				placeholder="请填写备注信息" focus/>
			<view class="tips" :class="{'text-color-danger': remarkLength > 50, 'text-color-assist' : remarkLength <=50}">
				{{ remarkLength }}/50
			</view>
		</view>
		<view class="d-flex font-size-28rpx text-color-assist" style="margin: 40rpx 0;">
			快捷输入
		</view>
		<view class="quick-inputs flex flex-wrap justify-start">
			<view class="quick-input" v-for="(item, index) in quickInputs" :key="index" @tap="handleQuickInput(item)">
				{{ item }}
			</view>
		</view>
		<view class="flex just-center items-center" style="margin-top: 60rpx;">
			<button type="primary" class="submit-btn font-size-28rpx" @tap="submit">完成</button>
		</view>
	</base-page>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'

const remark = ref('')
const quickInputs = ref([
	'请放门把手上', '请放门口', '请放前台桌上', '如地址封闭管理，请电话与我联系'
])


onLoad((option) => {
	remark.value = option.remark
})

const remarkLength = computed(() => {
	return remark.value.length
})

const isDanger = computed(() => {
	return remark.value.length > 50
})

const handleQuickInput = (item) => {
	remark.value = remark.value.concat(" ", item)
}

const submit = () => {
	uni.navigateTo({
		url: "/subPages/pay/pay?remark=" + remark.value
	})
}

</script>

<style lang="scss" scoped>
	.container {
		padding: 30rpx 40rpx;
		
		.textarea {
			position: relative;
			
			.remark {
				border-radius: 8rpx;
				padding: 30rpx 40rpx;
				height: 320rpx;
				color: 28rpx;
			}
			
			.tips {
				position: absolute;
				bottom: 30rpx;
				right: 40rpx;
			}
		}
		
		.quick-inputs {
			padding-right: 20rpx;
			
			.quick-input {
				background-color: #FFFFFF;
				border: 2rpx solid $color-primary;
				color: $color-primary;
				font-size: 28rpx;
				padding: 16rpx 26rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
		
		.submit-btn {
			width: 90%;
			height: 80rpx;
			border-radius: 40rpx;
			line-height: 80rpx;
		}
	}
</style>
