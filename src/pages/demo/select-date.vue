<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-select-date v-model="v1" />
        </base-card>

        <base-card label="时-分">
            <base-select-date v-model="v2" :mode="['hour', 'minute']" format="HH:mm" />
        </base-card>

        <base-card label="年-月">
            <base-select-date v-model="v3" :mode="['year', 'month']" format="YYYY-MM" />
        </base-card>

        <base-card label="起始时间">
            <base-select-date v-model="v4" :start="'2023-01-01 08:00:00'" :end="'2025-12-12 12:00:00'" />

            <base-row :margin="[20, 0, 0, 0]">
                <base-text value="2023-01-01 08:00:00 < " />
                <base-text value="时间" :color="'red'" :margin="[0, 10, 0, 10]" />
                <base-text value=" < 2025-12-12 12:00:00" />
            </base-row>
        </base-card>

        <base-card label="展示格式">
            <base-select-date
                v-model="v5"
                :display-format="
                    date => {
                        return date ? moment(date).format('YYYY年MM月DD日 HH时mm分ss秒') : '';
                    }
                "
            />
        </base-card>

        <base-card label="自定义">
            <base-select-date v-model="v6" title="请选择预约时间">
                <template #default="{ value }">
                    <base-select-inner round background-color="#f7f7f7">
                        <base-text
                            prefix-icon="time"
                            :value="value ? moment(value).format('YYYY年MM月DD日 HH时mm分ss秒') : '请选择预约时间'"
                        />
                    </base-select-inner>
                </template>
            </base-select-date>
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";
    import moment from "moment";

    const v1 = ref();
    const v2 = ref();
    const v3 = ref();
    const v4 = ref();
    const v5 = ref();
    const v6 = ref();
</script>
