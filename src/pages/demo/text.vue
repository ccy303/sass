<template>
    <base-page :padding="20">
        <view class="page-demo-text">
            <base-card label="基础用法">
                <base-text value="云想衣裳花想容，春风拂槛露华浓。" />
            </base-card>

            <base-card label="不同颜色">
                <base-row>
                    <base-col :span="8">
                        <base-text value="主色" color="primary" />
                    </base-col>

                    <base-col :span="8">
                        <base-text value="成功" color="success" />
                    </base-col>

                    <base-col :span="8">
                        <base-text value="错误" color="error" />
                    </base-col>

                    <base-col :span="8">
                        <base-text value="警告" color="warning" />
                    </base-col>

                    <base-col :span="8">
                        <base-text value="信息" color="info" />
                    </base-col>

                    <base-col :span="8">
                        <base-text value="自定义颜色" :color="'#628bca'" />
                    </base-col>
                </base-row>
            </base-card>

            <base-card label="金额">
                <base-text type="price" :size="40" value="19450" />
            </base-card>

            <base-card label="手机号">
                <base-text type="phone" value="17605043035" />
            </base-card>

            <base-card label="超出省略">
                <base-text
                    :ellipsis="2"
                    :line-height="1.4"
                    value="锦瑟无端五十弦，一弦一柱思华年。庄生晓梦迷蝴蝶，望帝春心托杜鹃。沧海月明珠有泪，蓝田日暖玉生烟。此情可待成追忆，只是当时已惘然。"
                />
            </base-card>

            <base-card label="图标">
                <base-row>
                    <base-col :span="12">
                        <base-text prefix-icon="search" value="请填写名称" />
                    </base-col>

                    <base-col :span="12">
                        <base-text suffix-icon="time" value="2022-02-06" />
                    </base-col>
                </base-row>
            </base-card>

            <base-card label="自定义">
                <base-text :color="'green'" size="30" :margin="[20, 0, 20, 0]" value="颜色(green)、大小(30)、间距(20)" />
            </base-card>
        </view>
    </base-page>
</template>

<script setup></script>
