<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-row :margin="[0, 0, 10, 0]">
                <base-tag>{{ refs.tree?.label }}</base-tag>
            </base-row>

            <base-tag type="error">{{ value }}</base-tag>

            <view class="bor">
                <base-tree :ref="setRefs('tree')" v-model="value" :data="data"> </base-tree>
            </view>
        </base-card>

        <base-card label="多选">
            <base-row :margin="[0, 0, 10, 0]">
                <base-tag>{{ refs.treeMultiple?.label }}</base-tag>
            </base-row>
            <base-tag type="error">{{ value2 }}</base-tag>

            <view class="bor">
                <base-tree multiple :ref="setRefs('treeMultiple')" v-model="value2" :data="data" />
            </view>
        </base-card>

        <base-card label="弹出框选择">
            <base-list-item :arrow-icon="false" label="节点选择" @tap="refs.treeSelect?.open">
                <base-text :value="refs.treeSelect?.label || '请选择'" :ellipsis="1" />
            </base-list-item>

            <base-tree-select :ref="setRefs('treeSelect')" v-model="value3" :data="data" :show-picker="false" />
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";  
    import { useRefs } from "@/gxota/hooks/index";

    const { refs, setRefs } = useRefs();

    const value = ref(3);
    const value2 = ref([12, 3]);
    const value3 = ref();

    const data = ref([
        {
            label: "Level one 1",
            value: 1,
            children: [
                {
                    label: "Level two 1-1",
                    value: 2,
                    children: [
                        {
                            label: "Level three 1-1-1",
                            value: 3
                        }
                    ]
                }
            ]
        },
        {
            label: "Level one 2",
            value: 4,
            children: [
                {
                    label: "Level two 2-1",
                    value: 5,
                    children: [
                        {
                            label: "Level three 2-1-1",
                            value: 6,
                            children: [
                                {
                                    label: "Level four 2-1-1-1",
                                    value: 14,
                                    children: [
                                        {
                                            label: "Level five 2-1-1-1-1",
                                            value: 16
                                        }
                                    ]
                                },
                                {
                                    label: "Level four 2-1-1-2",
                                    value: 15,
                                    children: [
                                        {
                                            label: "Level five 2-1-1-2-1",
                                            value: 17
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "Level two 2-2",
                    value: 7
                }
            ]
        },
        {
            label: "Level one 3",
            value: 8,
            children: [
                {
                    label: "Level two 3-1",
                    value: 9,
                    children: [
                        {
                            label: "Level three 3-1-1",
                            value: 10
                        }
                    ]
                },
                {
                    label: "Level two 3-2",
                    value: 11,
                    children: [
                        {
                            label: "Level three 3-2-1",
                            value: 12
                        }
                    ]
                }
            ]
        },
        {
            label: "Level one 4",
            value: 13
        }
    ]);
</script>

<style lang="scss" scoped>
    .bor {
        border: $cui-border-width solid #eee;
        border-radius: 16rpx;
        margin-top: 20rpx;
        padding: 10rpx;
    }
</style>
