<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-divider background-color="#ffffff">默认</base-divider>
            <base-divider :color="'#409EFF'" background-color="#ffffff">不同颜色</base-divider>
        </base-card>

        <base-card label="渐变颜色">
            <base-divider :color="['#fff', '#F56C6C']" background-color="#ffffff">渐变颜色</base-divider>
        </base-card>

        <base-card label="线条宽度">
            <base-divider width="50%" background-color="#ffffff">线条宽度</base-divider>
        </base-card>

        <base-card label="自定义">
            <base-divider background-color="#ffffff">
                <base-icon name="like"></base-icon>
                <text>猜你喜欢</text>
            </base-divider>
        </base-card>
    </base-page>
</template>
