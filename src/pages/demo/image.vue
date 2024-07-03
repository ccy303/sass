<template>
    <base-page :padding="20">
        <base-card label="裁剪模式">
            <base-row :gutter="20">
                <base-col :span="6">
                    <base-image
                        src="https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
                        :size="140"
                        mode="scaleToFill"
                    />
                    <base-text value="scaleToFill"></base-text>
                </base-col>

                <base-col :span="6">
                    <base-image
                        src="https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
                        :size="140"
                        mode="aspectFit"
                    />
                    <base-text value="aspectFit"></base-text>
                </base-col>

                <base-col :span="6">
                    <base-image
                        src="https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
                        :size="140"
                        mode="aspectFill"
                    />
                    <base-text value="aspectFill"></base-text>
                </base-col>

                <base-col :span="6">
                    <base-image
                        src="https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
                        :size="140"
                        mode="widthFix"
                    />
                    <base-text value="widthFix"></base-text>
                </base-col>
            </base-row>
        </base-card>

        <base-card label="圆角">
            <base-row type="flex">
                <base-col :span="6">
                    <base-image
                        src="https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
                        :size="140"
                        round
                    />
                </base-col>

                <base-col :span="6">
                    <base-image
                        src="https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
                        :size="140"
                        :radius="16"
                    />
                </base-col>
            </base-row>
        </base-card>

        <base-card label="自定义大小">
            <base-row type="flex">
                <base-image
                    src="https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
                    :size="[150, 280]"
                    mode="aspectFill"
                />
            </base-row>
        </base-card>

        <base-card label="点击预览">
            <base-row type="flex">
                <base-image
                    src="https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
                    :size="140"
                    :preview-list="previewList"
                />
            </base-row>
        </base-card>

        <base-card label="插槽：地址为空">
            <base-row type="flex">
                <base-image src="" :size="150" />

                <base-image src="" :size="150" :margin="[0, 0, 0, 20]">
                    <template #placeholder>
                        <base-text color="red" value="自定义"></base-text>
                    </template>
                </base-image>
            </base-row>
        </base-card>

        <base-card label="插槽：加载错误">
            <base-image src="https://xxxx.png" :size="150" />
        </base-card>
    </base-page>
</template>

<script setup>
    const previewList = ref([
        "https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280",
        "https://pic.rmb.bdstatic.com/bjh/events/0ea835923842d778bb2043e205a39a495843.jpeg@h_1280"
    ]);
</script>
