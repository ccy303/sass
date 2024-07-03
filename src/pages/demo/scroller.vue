<template>
    <base-page fullscreen>
        <base-scroller :ref="setRefs('scroller')" @up="loadmore" @down="refresh">
            <base-list-item v-for="(item, index) in list" :key="index" :label="`${item + 1}`" :padding="[0, 20, 0, 20]" border />
        </base-scroller>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";
    import { useRefs } from "@/gxota/hooks";
    import { onReady } from "@dcloudio/uni-app";
    import { range } from "lodash-es";

    const { refs, setRefs } = useRefs();

    const list = ref([]);

    const loadmore = () => {
        setTimeout(() => {
            const data = range(list.value.length, list.value.length + 20);
            list.value.push(...data);
        }, 300);
    };

    const refresh = () => {
        list.value = range(20);

        setTimeout(() => {
            refs.scroller.end();
        }, 500);
    };

    onReady(() => {
        refresh();
    });
</script>
