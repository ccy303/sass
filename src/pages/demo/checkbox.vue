<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-checkbox-group v-model="v0">
                <base-checkbox label="1">炸鸡</base-checkbox>
                <base-checkbox label="2">汉堡</base-checkbox>
                <base-checkbox label="3">薯条</base-checkbox>
            </base-checkbox-group>
        </base-card>

        <base-card label="圆角">
            <base-checkbox-group v-model="v1" round>
                <base-checkbox label="1">炸鸡</base-checkbox>
                <base-checkbox label="2">汉堡</base-checkbox>
            </base-checkbox-group>
        </base-card>

        <base-card label="禁用">
            <base-checkbox-group v-model="v2">
                <base-checkbox label="1">炸鸡</base-checkbox>
                <base-checkbox disabled label="2">汉堡</base-checkbox>
            </base-checkbox-group>
        </base-card>

        <base-card label="开关">
            <base-checkbox v-model="v3">已阅读并同意《用户协议》及《隐私政策》</base-checkbox>
        </base-card>

        <base-card label="边框">
            <base-checkbox-group v-model="v4">
                <base-checkbox :border="true" label="1">炸鸡</base-checkbox>
                <base-checkbox :border="true" label="2">汉堡</base-checkbox>
            </base-checkbox-group>
        </base-card>

        <base-card label="边框填充">
            <base-checkbox-group v-model="v5" fill :border="true">
                <base-checkbox label="1">
                    <base-text align="right" block>鸡米花（靠右）</base-text>
                </base-checkbox>
                <base-checkbox label="2">可乐</base-checkbox>
                <base-checkbox label="3">蛋挞</base-checkbox>
            </base-checkbox-group>
        </base-card>

        <base-card label="只显示文字">
            <base-checkbox-group v-model="v6" text :border="true">
                <base-checkbox label="1">炸鸡</base-checkbox>
                <base-checkbox label="2">汉堡</base-checkbox>
            </base-checkbox-group>
        </base-card>

        <base-card label="边框圆角">
            <base-checkbox-group v-model="v7" round :border="true">
                <base-checkbox label="1">炸鸡</base-checkbox>
                <base-checkbox label="2">汉堡</base-checkbox>
            </base-checkbox-group>
        </base-card>

        <base-card label="文字贼多">
            <base-checkbox-group v-model="v8">
                <base-checkbox label="1"> 汉堡、可乐、鸡肉卷、鸡排、鸡腿、蛋挞、薯条、鸡翅、原味鸡 </base-checkbox>

                <base-checkbox label="2"> 鸡块、鸡米发、鸡腿堡 </base-checkbox>
            </base-checkbox-group>
        </base-card>

        <base-card label="自定义图标">
            <base-checkbox-group v-model="v9">
                <base-checkbox v-for="(item, index) in ['汉堡', '可乐', '薯条']" :key="index" :label="index">
                    <template #icon="{ checked }">
                        <base-icon name="like-fill" :size="36" :color="checked ? 'primary' : 'info'" />
                    </template>
                    {{ item }}
                </base-checkbox>
            </base-checkbox-group>
        </base-card>
    </base-page>
</template>

<script setup>
    const v0 = ref(["1"]);
    const v1 = ref(["2"]);
    const v2 = ref([]);
    const v3 = ref(true);
    const v4 = ref(["1"]);
    const v5 = ref(["1", "2"]);
    const v6 = ref(["1", "2"]);
    const v7 = ref(["1", "2"]);
    const v8 = ref(["1", "2"]);
    const v9 = ref([]);
</script>
