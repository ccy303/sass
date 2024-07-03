<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-radio v-model="v1" label="1">炸鸡</base-radio>
            <base-radio v-model="v1" label="2">汉堡</base-radio>
            <base-radio v-model="v1" label="3">薯条</base-radio>
            <base-radio v-model="v1" label="4">可乐</base-radio>
            <base-radio v-model="v1" label="5">冰淇淋</base-radio>
        </base-card>

        <base-card label="禁用">
            <base-radio v-model="v3" disabled label="1">炸鸡</base-radio>
            <base-radio v-model="v3" disabled label="2">汉堡</base-radio>
        </base-card>

        <base-card label="边框">
            <base-radio v-model="v4" :border="true" label="1">炸鸡</base-radio>
            <base-radio v-model="v4" :border="true" label="2">汉堡</base-radio>
        </base-card>

        <base-card label="边框填充">
            <base-radio-group v-model="v5" fill :border="true">
                <base-radio label="1">
                    <base-text align="right" block>鸡米花（靠右）</base-text>
                </base-radio>
                <base-radio label="2">可乐</base-radio>
                <base-radio label="3">蛋挞</base-radio>
            </base-radio-group>
        </base-card>

        <base-card label="只显示文字">
            <base-radio-group v-model="v6" text :border="true">
                <base-radio label="1">炸鸡</base-radio>
                <base-radio label="2">汉堡</base-radio>
            </base-radio-group>
        </base-card>

        <base-card label="圆角">
            <base-radio-group v-model="v7" round :border="true">
                <base-radio label="1">炸鸡</base-radio>
                <base-radio label="2">汉堡</base-radio>
            </base-radio-group>
        </base-card>

        <base-card label="文字贼多">
            <base-radio-group v-model="v8">
                <base-radio label="1"> 汉堡、可乐、鸡肉卷、鸡排、鸡腿、蛋挞、薯条、鸡翅、原味鸡 </base-radio>

                <base-radio label="2"> 鸡块、鸡米发、鸡腿堡 </base-radio>
            </base-radio-group>
        </base-card>

        <base-card label="自定义图标">
            <base-radio-group v-model="v9">
                <base-radio v-for="(item, index) in ['汉堡', '可乐', '薯条']" :key="index" :label="index">
                    <template #icon="{ checked }">
                        <base-icon name="like-fill" :size="36" :color="checked ? 'primary' : 'info'" />
                    </template>
                    {{ item }}
                </base-radio>
            </base-radio-group>
        </base-card>
    </base-page>
</template>

<script setup>
    const v1 = ref("1");
    const v3 = ref("2");
    const v4 = ref("2");
    const v5 = ref("2");
    const v6 = ref("2");
    const v7 = ref("1");
    const v8 = ref("1");
    const v9 = ref("1");
</script>
