<template>
	<list-cell :hover="false" last class="w-full flex items-baseline">
		<view class="font-size-40rpx text-color-primary mr-40rpx">{{ label }}</view>
		<view class="flex-auto flex flex-col">
			<view class="flex items-center mb-20rpx">
				<view class="iconfont score" v-for="(item, index) in 5" :key="index" @tap="handleScoreClick(index)"
					:class="[modelValue > index ? 'iconshoucangfill' : 'iconshoucang']"
					:style="{ opacity: (modelValue <= index) || !modelValue ? 1 : modelValue / 5 + 0.1 }">
				</view>
			</view>
			<view class="font-size-28rpx text-color-base">{{ tips }}</view>
		</view>
	</list-cell>
</template>

<script setup>
import listCell from '../list-cell/list-cell.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	label: {
		type: String,
		default: ''
	},
	tips: {
		type: String,
		default: ''
	}
})

const handleScoreClick = (index) => {
	emit('update:modelValue', index + 1)
}
</script>

<style lang="scss" scoped>
.score {
	font-size: 56rpx;
	color: #ccc;
	margin-right: 20rpx;

	&.iconshoucangfill {
		color: $color-warning;
	}
}
</style>
