<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-tabs v-model="active" :list="list"></base-tabs>
        </base-card>

        <base-card label="居中">
            <base-tabs v-model="active" :list="list2" justify="center"></base-tabs>
        </base-card>

        <base-card label="填充">
            <base-tabs v-model="active" :list="list2" fill></base-tabs>
        </base-card>

        <base-card label="下拉框">
            <base-tabs v-model="active" :border="false" :list="list" show-dropdown :ref="setRefs('tabs')">
                <template #dropdown>
                    <view class="dropdown">
                        <base-text
                            v-for="item in list"
                            :value="item.label"
                            :key="item.value"
                            :margin="20"
                            :color="active === item.value ? 'primary' : ''"
                            @tap="check(item.value)"
                        />
                    </view>
                </template>
            </base-tabs>
        </base-card>

        <base-card label="自定义">
            <base-tabs v-model="active" :list="list" :border="false" color="red" background-color="f6f7fa" :show-line="false"></base-tabs>
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";
    import { useRefs } from "@/gxota/hooks";

    const { refs, setRefs } = useRefs();

    const active = ref(1);

    const list = ref([
        { label: "百亿补贴", value: 1 },
        { label: "包邮", value: 2 },
        { label: "限时达", value: 3 },
        { label: "同城速配", value: 4 },
        { label: "货到付款", value: 5 },
        { label: "分期免息", value: 6 },
        { label: "配送全球", value: 7 },
        { label: "促销", value: 8 }
    ]);

    const list2 = ref([
        { label: "盒装", value: 1, prefixIcon: "like", suffixIcon: "like" },
        { label: "纸包装", value: 2, prefixIcon: "like", suffixIcon: "like" },
        { label: "袋装", value: 3, prefixIcon: "like", suffixIcon: "like" },
        { label: "罐装", value: 4, prefixIcon: "like", suffixIco: "like" }
    ]);

    const check = value => {
        active.value = value;
        refs.tabs.closeDropdown();
    };
</script>

<style lang="scss" scoped>
    .dropdown {
        background-color: #fff;
        padding: 20rpx;
        border: $cui-border-width solid $cui-border-color;
        border-radius: 12rpx;
    }
</style>
