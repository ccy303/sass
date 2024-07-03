<template>
    <base-page>
        <base-card>
            <base-card label="基础用法">
                <base-input />
            </base-card>

            <base-card label="数字键盘">
                <base-input type="number" />
            </base-card>

            <base-card label="禁用">
                <div mb-10>
                    <base-button size="small" :type="disabled ? 'success' : 'error'" @tap="disabled = !disabled">
                        {{ disabled ? "启用" : "禁用" }}
                    </base-button>
                </div>

                <base-input :disabled="disabled" />
            </base-card>

            <base-card label="无边框">
                <base-input :border="false" />
            </base-card>

            <base-card label="前置元素">
                <base-input>
                    <template #prepend>
                        <text>https://</text>
                    </template>
                </base-input>
            </base-card>

            <base-card label="后置元素">
                <base-input>
                    <template #append>
                        <text>元</text>
                    </template>
                </base-input>
            </base-card>

            <base-card label="自定义">
                <base-input :height="80" :padding="[0, 32, 0, 32]" :radius="16" background-color="#eee" :border="false" />
            </base-card>
        </base-card>
    </base-page>
</template>

<script setup>
    import { ref } from "vue";

    const disabled = ref(true);
</script>
