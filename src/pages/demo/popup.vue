<template>
    <base-page>
        <base-card>
            <base-popup v-model="visible">
                <base-text value="云想衣裳花想容，春风拂槛露华浓。" />
            </base-popup>

            <base-popup v-model="visible_modal" :modal="false" :padding="0">
                <base-button type="primary" @tap="visible_modal = false">点我关闭</base-button>
            </base-popup>

            <base-popup v-model="visible_custom" background-color="#333" border-radius="20rpx">
                <base-text :color="`#fff`" value="云想衣裳花想容，春风拂槛露华浓。" />
            </base-popup>

            <base-popup v-model="visible_left" direction="left">
                <base-text value="云想衣裳花想容，春风拂槛露华浓。" />
            </base-popup>

            <base-popup v-model="visible_top" direction="top">
                <base-text value="云想衣裳花想容，春风拂槛露华浓。" />
            </base-popup>

            <base-popup v-model="visible_right" direction="right">
                <base-text value="云想衣裳花想容，春风拂槛露华浓。" />
            </base-popup>

            <base-popup v-model="visible_bottom" direction="bottom">
                <base-text value="云想衣裳花想容，春风拂槛露华浓。" />
            </base-popup>

            <base-card label="基础用法">
                <base-button @tap="visible = true">打开</base-button>
            </base-card>

            <base-card label="不显示遮罩层">
                <base-button @tap="visible_modal = true">打开</base-button>
            </base-card>

            <base-card label="添加样式">
                <base-button @tap="visible_custom = true">打开</base-button>
            </base-card>

            <base-card label="方向">
                <base-button @tap="visible_left = true">左边</base-button>
                <base-button @tap="visible_top = true">上边</base-button>
                <base-button @tap="visible_right = true">右边</base-button>
                <base-button @tap="visible_bottom = true">下边</base-button>
            </base-card>
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";

    const visible = ref(false);
    const visible_modal = ref(false);
    const visible_custom = ref(false);

    const visible_left = ref(false);
    const visible_top = ref(false);
    const visible_right = ref(false);
    const visible_bottom = ref(false);
</script>
