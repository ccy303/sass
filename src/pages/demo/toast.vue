<template>
    <base-page>
        <base-card>
            <base-toast ref="toast"></base-toast>

            <base-card label="基础用法">
                <base-button @tap="open()">默认</base-button>
            </base-card>

            <base-card label="不同位置">
                <base-button @tap="open()">默认</base-button>
                <base-button @tap="open({ position: 'top' })">顶部</base-button>
                <base-button @tap="open({ position: 'center' })">中间</base-button>
                <base-button @tap="open({ position: 'bottom' })">底部</base-button>
            </base-card>

            <base-card label="不同类型">
                <base-button @tap="open({ type: 'success' })">成功</base-button>
                <base-button @tap="open({ type: 'error' })">失败</base-button>
                <base-button @tap="open({ type: 'warning' })">警告</base-button>
                <base-button @tap="open({ type: 'info' })">信息</base-button>
            </base-card>

            <base-card label="其他">
                <base-button @tap="open({ icon: 'good-fill', message: '带图标' })">带图标</base-button>
                <base-button
                    @tap="
                        open({
                            message: '带图片',
                            image: {
                                url: 'http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
                                style: { height: '200rpx', width: '200rpx', borderRadius: '20rpx' }
                            }
                        })
                    "
                    >带图片</base-button
                >
            </base-card>

            <base-card label="不同类型">
                <base-button @tap="open({ clear: true })">只显示一个</base-button>
            </base-card>
        </base-card>
    </base-page>
</template>

<script setup>
    const toast = ref(null);

    const open = data => {
        toast.value?.open({
            message: "请输入收货人姓名",
            ...data
        });
    };
</script>
