<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-list-item label="账单"></base-list-item>
        </base-card>

        <base-card label="带图标">
            <base-list-item label="神仙">
                <template #icon>
                    <base-image :size="60" src="https://img2.baidu.com/it/u=304293407,1878548733&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=500" />
                </template>
            </base-list-item>
        </base-card>

        <base-card label="带描述">
            <base-list-item label="余额">
                <base-text type="price" :size="30" :value="159.2" />
            </base-list-item>
        </base-card>

        <base-card label="禁用">
            <base-list-item label="银行卡" disabled>
                <text>兴业银行(***1113)</text>
            </base-list-item>
        </base-card>

        <base-card label="滑动">
            <base-list-item label="向右滑动" swipe="left">
                <template #menu>
                    <base-button type="primary">置顶</base-button>
                    <base-button type="error">删除</base-button>
                </template>
            </base-list-item>

            <base-list-item label="向左滑动" swipe="right">
                <template #menu>
                    <base-button type="primary">置顶</base-button>
                    <base-button type="error">删除</base-button>
                </template>
            </base-list-item>
        </base-card>

        <base-card label="自定义">
            <base-list-item :justify="'start'">
                <base-row :type="'flex'" align="center">
                    <base-avatar></base-avatar>
                    <base-text value="神仙都没用" :margin="[0, 0, 0, 20]" />
                </base-row>

                <template #append>
                    <base-button>修改头像</base-button>
                </template>
            </base-list-item>
        </base-card>

        <base-card label="按钮组">
            <base-list :radius="20">
                <base-list-item label="A"></base-list-item>
                <base-list-item label="B"></base-list-item>
                <base-list-item label="C"></base-list-item>
            </base-list>
        </base-card>
    </base-page>
</template>
