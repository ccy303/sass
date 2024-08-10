<template>
    <base-page>
        <base-form ref="Form" v-model="form" :rules="rules" :disabled="loading" label-position="left">
            <base-form-item label="分类名称" prop="name" required>
                <base-input v-model="form.name" placeholder="请输入分类名称"></base-input>
            </base-form-item>
            <base-form-item label="描述" prop="brief">
                <base-textarea v-model="form.brief" placeholder="请输入描述"></base-textarea>
            </base-form-item>
            <base-form-item label="分类图标" prop="image" label-position="left" required>
                <base-upload v-model="form.image" :limit="1" :url="url" :requestOption="requestOption" />
            </base-form-item>
        </base-form>
        <base-footer :border="true">
            <base-button size="large" round fill @tap="clear">清空</base-button>
            <base-button size="large" round fill @tap="submit" type="primary" loadingColor="#fff" :loading="loading">提交</base-button>
        </base-footer>
    </base-page>
</template>

<script setup>
    import { submitCategory, getCategory } from "@/http/goods";
    import { useUi } from "@/gxota/ui";
    import { onLoad } from "@dcloudio/uni-app";
    import { header } from "@/http/request";

    const url = ref(`${import.meta.env.VITE_BASE_URL}/blade-resource/attach/uploadFile`);
    const { tenant_id } = uni.getStorageSync("accountInfo");
    const requestOption = ref({
        header: { ...header(), "Tenant-Id": tenant_id }
    });

    const form = ref({ id: "", name: "", image: [], brief: "" });

    const rules = ref({});
    const loading = ref(false);
    const Form = ref(false);

    const ui = useUi();

    const submit = async () => {
        await Form.value?.validate();
        loading.value = true;
        try {
            await submitCategory({ ...form.value, image: form.value.image[0].data.addressList[0] });
            loading.value = false;
            ui.showToast("提交成功");
            Form.value?.reset();
        } catch (err) {
            loading.value = false;
        }
    };

    const getDtl = async () => {
        const data = await getCategory({ id: form.value.id });
        form.value = { ...data, image: [{ thumb: data.image, url: data.image, status: "success", data: { addressList: [data.image] } }] };
    };

    const clear = () => {
        Form.value?.reset();
    };

    onLoad(options => {
        if (options.id) {
            form.value.id = options.id;
            getDtl();
        }
    });
</script>
