<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-input-number />
        </base-card>

        <base-card label="步数">
            <base-input-number :step="500" :max="10000" />
        </base-card>

        <base-card label="禁用">
            <base-input-number disabled />
        </base-card>

        <base-card label="范围（4-10）">
            <base-input-number :max="10" :min="4" />
        </base-card>

        <base-card label="单位">
            <base-input-number unit="个" />
        </base-card>
    </base-page>
</template>
