<template>
    <base-page>
        <base-form ref="Form" v-model="form" :rules="rules" :disabled="loading" label-position="left">
            <base-form-item label="分类名称" prop="name" required>
                <base-input v-model="form.name" placeholder="请填写分类名称"></base-input>
            </base-form-item>
            <base-form-item label="分类图标" prop="image" label-position="left" required>
                <base-upload v-model="form.image" :limit="1" />
            </base-form-item>
        </base-form>
        <base-footer :border="true">
            <base-button size="large" round fill @tap="clear">清空</base-button>
            <base-button size="large" round fill @tap="submit" type="primary" loadingColor="#fff" :loading="loading">提交</base-button>
        </base-footer>
    </base-page>
</template>

<script setup>
    import { createCategory } from "@/http/goods";
    import { useUi } from "@/gxota/ui";

    const form = ref({
        name: "",
        image: "啊实打实的"
    });
    const rules = ref({});
    const loading = ref(false);
    const Form = ref(false);

    const ui = useUi();

    const submit = async () => {
        await Form.value?.validate();
        loading.value = true;
        try {
            const data = await createCategory(form.value);
            loading.value = false;
            ui.showToast("提交成功");
            Form.value?.reset();
        } catch (err) {
            loading.value = false;
        }
    };

    const clear = () => {
        Form.value?.reset();
    };
</script>
