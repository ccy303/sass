<template>
    <base-page>
        <base-card label="基础用法">
            <base-select-popup v-model="v1" title="选择歌曲" :options="list" />
        </base-card>

        <base-card label="多选">
            <base-select-popup v-model="v2" multiple title="选择歌曲" :options="list" />
        </base-card>

        <base-card label="必填">
            <base-select-popup v-model="v3" required title="选择歌曲" :options="list" />
        </base-card>

        <base-card label="自定义">
            <base-select-popup v-model="v4" required title="选择歌曲" :options="list">
                <template #item="{ item }">
                    {{ item }}
                </template>

                <template #default="{ label }">
                    <base-select-inner round background-color="#f7f7f7">
                        <base-text value="你选择了" :size="24" color="info" />
                        <base-tag round size="small" :margin="[0, 0, 0, 20]">{{ label }}</base-tag>
                    </base-select-inner>
                </template>
            </base-select-popup>
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";

    const v1 = ref();
    const v2 = ref([]);
    const v3 = ref();
    const v4 = ref();

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
