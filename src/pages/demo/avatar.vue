<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-row>
                <base-col :span="4">
                    <base-avatar src="https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280"></base-avatar>
                </base-col>

                <base-col :span="4">
                    <base-avatar
                        src="https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280"
                        shape="square"
                    ></base-avatar>
                </base-col>
            </base-row>
        </base-card>

        <base-card label="占位">
            <base-row>
                <base-col :span="4">
                    <base-avatar></base-avatar>
                </base-col>

                <base-col :span="4">
                    <base-avatar name="神仙" background-color="red"></base-avatar>
                </base-col>
            </base-row>
        </base-card>

        <base-card label="不同大小">
            <base-row>
                <base-col :span="6">
                    <base-avatar
                        :size="100"
                        src="https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280"
                    ></base-avatar>
                </base-col>

                <base-col :span="6">
                    <base-avatar
                        :size="120"
                        src="https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280"
                    ></base-avatar>
                </base-col>

                <base-col :span="6">
                    <base-avatar
                        :size="140"
                        src="https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280"
                    ></base-avatar>
                </base-col>
            </base-row>
        </base-card>

        <base-card label="头像组">
            <base-avatar-group :urls="urls"></base-avatar-group>
        </base-card>
    </base-page>
</template>

<script setup>
    const urls = ref([
        "https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280",
        "https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280",
        "https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280",
        "https://pic.rmb.bdstatic.com/bjh/events/5faf8886b25ceb3831aa71e08733e8738534.png@h_1280"
    ]);
</script>
