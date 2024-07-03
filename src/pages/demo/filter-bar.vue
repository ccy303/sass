<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-filter-bar v-model="filter" :num="4">
                <base-filter-item label="排序" prop="order" type="order" />
                <base-filter-item label="开关" prop="switch" type="switch" />
            </base-filter-bar>
        </base-card>

        <base-card label="展开列表">
            <base-filter-bar v-model="filter">
                <base-filter-item
                    label="多选"
                    prop="d1"
                    type="dropdown"
                    multiple
                    :options="[
                        { label: 'A', value: 1 },
                        { label: 'B', value: 2 }
                    ]"
                />
                <base-filter-item
                    label="单选"
                    prop="d2"
                    type="dropdown"
                    :options="[
                        { label: 'A', value: 1 },
                        { label: 'B', value: 2 }
                    ]"
                />
            </base-filter-bar>
        </base-card>

        <base-card label="展开宫格">
            <base-filter-bar v-model="filter">
                <base-filter-item
                    label="多选"
                    prop="d1"
                    type="dropdown"
                    multiple
                    :options="[
                        { label: 'A', value: 1 },
                        { label: 'B', value: 2 }
                    ]"
                    theme="grid"
                />
                <base-filter-item
                    label="单选"
                    prop="d2"
                    type="dropdown"
                    :options="[
                        { label: 'A', value: 1 },
                        { label: 'B', value: 2 }
                    ]"
                    theme="grid"
                />
            </base-filter-bar>
        </base-card>

        <base-card label="展开自定义">
            <base-filter-bar v-model="filter">
                <base-filter-item label="输入框" prop="input" type="dropdown">
                    <template #dropdown>
                        <view class="cs" @tap.stop>
                            <base-input />
                            <base-button :margin="[0, 0, 0, 20]">搜索</base-button>
                        </view>
                    </template>
                </base-filter-item>
            </base-filter-bar>
        </base-card>
    </base-page>
</template>

<script setup>
    const filter = ref({
        d1: []
    });
</script>

<style lang="scss" scoped>
    .cs {
        display: flex;
        padding: 20rpx;
    }
</style>
