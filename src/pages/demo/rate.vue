<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-rate :model-value="2.7"></base-rate>
        </base-card>

        <base-card label="禁用">
            <base-rate :model-value="2.7" disabled></base-rate>
        </base-card>

        <base-card label="多色">
            <base-rate :model-value="2" :color="['#F56C6C', '#E6A23C', '#67C23A']"></base-rate>
        </base-card>

        <base-card label="其他图标">
            <base-rate :model-value="1" icon="like"></base-rate>
        </base-card>
    </base-page>
</template>
