<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-tag>默认</base-tag>
        </base-card>

        <base-card label="圆角">
            <base-tag round>默认</base-tag>
        </base-card>

        <base-card label="尺寸">
            <base-tag size="large" :margin="[0, 20, 0, 0]">大尺寸</base-tag>
            <base-tag size="default" :margin="[0, 20, 0, 0]">默认尺寸</base-tag>
            <base-tag size="small">小尺寸</base-tag>
        </base-card>

        <base-card label="标签颜色">
            <base-tag type="primary" :margin="[0, 20, 0, 0]">主要</base-tag>
            <base-tag type="success" :margin="[0, 20, 0, 0]">成功</base-tag>
            <base-tag type="error" :margin="[0, 20, 0, 0]">失败</base-tag>
            <base-tag type="warning" :margin="[0, 20, 0, 0]">警告</base-tag>
            <base-tag type="info" :margin="[0, 20, 0, 0]">信息</base-tag>
        </base-card>

        <base-card label="自定义颜色">
            <base-tag color="#626aef">标签</base-tag>
        </base-card>

        <base-card label="其他">
            <base-tag plain :margin="[0, 20, 0, 0]">镂空</base-tag>
            <base-tag closable>可移除标签</base-tag>
        </base-card>
    </base-page>
</template>

<script setup></script>
