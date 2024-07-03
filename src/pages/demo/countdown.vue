<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-countdown :minute="1"></base-countdown>
        </base-card>

        <base-card label="精简模式">
            <base-countdown :hour="1" simple></base-countdown>
        </base-card>

        <base-card label="自定义格式">
            <base-countdown :hour="5" format="{d}天{h}时{m}分{s}秒后结束"></base-countdown>
        </base-card>

        <base-card label="自定义样式">
            <base-countdown
                :second="20"
                :font-size="40"
                :number-style="{
                    backgroundColor: '#f56c6c',
                    color: '#fff',
                    borderRadius: '8rpx',
                    padding: '6rpx',
                    margin: '0 6rpx'
                }"
            />
        </base-card>
    </base-page>
</template>
