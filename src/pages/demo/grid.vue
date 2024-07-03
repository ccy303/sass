<template>
	<base-page :padding="20">
		<base-card label="3列">
			<base-grid :column="3">
				<base-grid-item v-for="item in 9" :key="item">
					<view class="item">{{ item }}</view>
				</base-grid-item>
			</base-grid>
		</base-card>

		<base-card label="6列">
			<base-grid :column="6">
				<base-grid-item v-for="item in 24" :key="item">
					<view class="item">{{ item }}</view>
				</base-grid-item>
			</base-grid>
		</base-card>
	</base-page>
</template>

<style lang="scss" scoped>
.item {
	background-color: #f6f7fa;
	text-align: center;
	font-size: 28rpx;
	height: 60rpx;
	line-height: 60rpx;
	margin: 10rpx;
}
</style>
