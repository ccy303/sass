<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-select v-model="v1" :options="list"></base-select>
        </base-card>

        <base-card label="日期">
            <base-select v-model="v2" mode="date" fields="month"></base-select>
        </base-card>

        <base-card label="时间">
            <base-select v-model="v3" mode="time"></base-select>
        </base-card>

        <base-card label="禁用">
            <base-select v-model="v4" :options="list" disabled></base-select>
        </base-card>

        <base-card label="省市区">
            <base-select-region v-model="v5"></base-select-region>
        </base-card>

        <base-card label="自定义">
            <base-select v-model="v6" :options="list">
                <template #default="{ label }">
                    <base-select-inner round background-color="#f7f7f7">
                        <base-text value="你选择了" :size="24" color="info" />
                        <base-tag round size="small" :margin="[0, 0, 0, 20]">{{ label }}</base-tag>
                    </base-select-inner>
                </template>
            </base-select>
        </base-card>
    </base-page>
</template>

<script setup>
    const v1 = ref();
    const v2 = ref();
    const v3 = ref();
    const v4 = ref(2);
    const v5 = ref([]);
    const v6 = ref(2);

    const list = ref([
        { label: "冠军相", value: 1 },
        { label: "鬼脸", value: 2 },
        { label: "说唱歌手", value: 3 },
        { label: "一般的一天", value: 4 },
        { label: "会魔法的老人", value: 5 },
        { label: "C级浪漫", value: 6 },
        { label: "我想", value: 7 },
        { label: "小河淌水", value: 8 },
        { label: "午夜派对", value: 9 },
        { label: "POW!!!!!!!!!!!!!引爆", value: 10 },
        { label: "流浪`地球", value: 11 }
    ]);
</script>
