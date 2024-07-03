<template>
    <base-page class="page-demo-button">
        <div class="page-demo-button">
            <base-card label="基础用法">
                <base-row :gutter="20">
                    <base-col :span="8">
                        <base-button fill>默认</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="primary" fill>主要</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="success" fill>成功</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="error" fill>失败</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="warning" fill>警告</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="info" fill>信息</base-button>
                    </base-col>
                </base-row>
            </base-card>

            <base-card label="朴素">
                <base-row :gutter="20">
                    <base-col :span="8">
                        <base-button type="primary" plain fill>主要</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="success" plain fill>成功</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="error" plain fill>失败</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="warning" plain fill>警告</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="info" plain fill>信息</base-button>
                    </base-col>
                </base-row>
            </base-card>

            <base-card label="不同尺寸">
                <base-button size="small">小</base-button>
                <base-button size="default">默认</base-button>
                <base-button size="large">大</base-button>
                <base-button :height="90" :width="200" :font-size="34">90*200</base-button>
            </base-card>

            <base-card label="图标">
                <base-button icon="search">搜索</base-button>
                <base-button icon="chart-bar">统计</base-button>
            </base-card>

            <base-card label="圆角">
                <base-button type="primary" round>默认</base-button>
                <base-button round>默认</base-button>
            </base-card>

            <base-card label="禁用">
                <base-row :gutter="20">
                    <base-col :span="8">
                        <base-button disabled fill>默认</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="primary" fill disabled>主要</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="success" fill disabled>成功</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="error" fill disabled>失败</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="warning" fill disabled>警告</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="info" fill disabled>信息</base-button>
                    </base-col>
                </base-row>
            </base-card>

            <base-card label="加载中">
                <base-row :gutter="20">
                    <base-col :span="8">
                        <base-button loading fill>默认</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="primary" fill loading>主要</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="success" fill loading>成功</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="error" fill loading>失败</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="warning" fill loading>警告</base-button>
                    </base-col>
                    <base-col :span="8">
                        <base-button type="info" fill loading>信息</base-button>
                    </base-col>
                </base-row>
            </base-card>

            <base-card label="没有边框">
                <base-button :border="false">默认</base-button>
            </base-card>

            <base-card label="自定义颜色">
                <base-button :border="false" :color="`#ffffff`" :backgroundColor="`#008000`">默认</base-button>
                <base-button :color="`#008000`" plain>朴素</base-button>
            </base-card>
        </div>
    </base-page>
</template>

<script setup>
    import { injectHook } from "vue";
</script>

<style lang="scss" scoped>
    .page-demo-button {
        :deep(.cui-col) {
            @apply pb-10;
        }
    }
</style>
