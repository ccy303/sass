<template>
    <base-page>
        <base-dialog title="标题" v-model="visible">
            <text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
        </base-dialog>

        <base-dialog :ref="setRefs('d1')">
            <text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>
        </base-dialog>

        <base-dialog :ref="setRefs('d2')" title="标题">
            <text>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</text>

            <template #footer>
                <base-button @tap="refs.d2?.close()">好诗！</base-button>
            </template>
        </base-dialog>

        <base-card label="基础用法">
            <base-button @tap="open">打开</base-button>
        </base-card>

        <base-card label="无标题">
            <base-button @tap="refs.d1?.open()">打开</base-button>
        </base-card>

        <base-card label="带按钮">
            <base-button @tap="refs.d2?.open()">打开</base-button>
        </base-card>
    </base-page>
</template>

<script setup>
    import { useRefs } from "@/gxota/hooks";

    const { refs, setRefs } = useRefs();

    const visible = ref(false);

    const open = () => {
        visible.value = true;
    };
</script>
