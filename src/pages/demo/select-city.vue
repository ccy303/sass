<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-select-city v-model="v1" />
        </base-card>

        <base-card label="省市区乡镇4级">
            <base-select-city v-model="v2" :data="pcas" placeholder="省市区县、乡镇" />
        </base-card>

        <base-card label="自定义">
            <base-select-city v-model="v3">
                <template #default="{ selection }">
                    <base-row :margin="[0, 0, 20, 0]" v-if="selection.length">
                        <base-tag v-for="item in selection" :margin="[0, 20, 20, 0]" plain round :key="item.code">{{ item.name }}</base-tag>
                    </base-row>

                    <base-button round>选择所在地区</base-button>
                </template>
            </base-select-city>
        </base-card>
    </base-page>
</template>

<script setup>
    import { onReady } from "@dcloudio/uni-app";

    const v1 = ref([]);
    const v2 = ref([]);
    const v3 = ref([]);

    const pcas = ref();

    onReady(() => {
        uni.request({
            url: "https://cool-service.oss-cn-shanghai.aliyuncs.com/app%2Fbase%2F8fe445f06db5463386ae940d45b4bd6c_city-pcas.json",
            success(res) {
                pcas.value = res.data;
            }
        });
    });
</script>
