<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-timeline>
                <base-timeline-item
                    v-for="(item, index) in list"
                    :key="index"
                    :timestamp="item.timestamp"
                    :show-line="item.showLine"
                    :content="item.content"
                    :icon="item.icon"
                    :color="item.color"
                >
                </base-timeline-item>
            </base-timeline>
        </base-card>

        <base-card label="自定义内容">
            <base-timeline>
                <base-timeline-item
                    v-for="(item, index) in list"
                    :key="index"
                    :timestamp="item.timestamp"
                    :show-line="item.showLine"
                    :content="item.content"
                    :icon="item.icon"
                    :color="item.color"
                >
                    <template #content>
                        <base-tag>{{ item.content }}</base-tag>
                    </template>
                </base-timeline-item>
            </base-timeline>
        </base-card>
    </base-page>
</template>

<script setup>
    const list = ref([
        { timestamp: "昨天", content: "开通账号，赠送500" },
        { timestamp: "今天", content: "成功转入9000", color: "#409EFF" },
        { timestamp: "11-06", content: "开始计算收益", icon: "toast-waiting", color: "#E6A23C" },
        { timestamp: "11-09", content: "收益到账", showLine: true, icon: "check-border", color: "#67C23A" }
    ]);
</script>
