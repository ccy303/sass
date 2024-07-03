<template>
    <base-page :padding="20">
        <base-card label="基础用法">
            <base-noticebar text="云想衣裳花想容，春风拂槛露华浓。"></base-noticebar>
        </base-card>

        <base-card label="带图标">
            <base-noticebar icon="notification" text="云想衣裳花想容，春风拂槛露华浓。"></base-noticebar>
        </base-card>

        <base-card label="可关闭">
            <base-noticebar text="云想衣裳花想容，春风拂槛露华浓。" closeable></base-noticebar>
        </base-card>

        <base-card label="可滑动">
            <base-noticebar text="云想衣裳花想容，春风拂槛露华浓。" scrollable></base-noticebar>
        </base-card>

        <base-card label="不同方向">
            <base-noticebar
                :text="[
                    '云想衣裳花想容，春风拂槛露华浓云想衣裳花想容，春风拂槛露华浓云想衣裳花想容，春风拂槛露华浓。',
                    '这世界那么多人',
                    '目光所至则心向往之'
                ]"
                direction="vertical"
                scrollable
                :duration="3"
            ></base-noticebar>
        </base-card>
    </base-page>
</template>
