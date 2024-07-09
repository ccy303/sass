<template>
    <base-page>
        <base-form ref="Form" v-model="form" :rules="rules" :disabled="loading" label-position="left">
            <base-form-item label="分类名称" prop="name" required>
                <base-input v-model="form.name" placeholder="请填写分类名称"></base-input>
            </base-form-item>

            <base-form-item label="分类图标" prop="pics" label-position="left" required>
                <base-upload v-model="form.pics" :limit="1" />
            </base-form-item>
        </base-form>
    </base-page>
</template>

<script setup>
    const form = ref({});
    const rules = ref({});
    const loading = ref({});
</script>
