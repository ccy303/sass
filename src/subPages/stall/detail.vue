<template>
    <base-page>
        <base-form ref="Form" v-model="form" :disabled="loading" label-position="left">
            <base-form-item label="摊位名称" prop="shopName" required>
                <base-input v-model="form.shopName" placeholder="请填写分类名称"></base-input>
            </base-form-item>
        </base-form>

        <base-footer :border="true">
            <base-button size="large" round fill @tap="clear">清空</base-button>
            <base-button size="large" round fill @tap="submit" type="primary" :loading="loading">提交</base-button>
        </base-footer>
    </base-page>
</template>

<script setup>
    import { beTenant } from "@/http/user";
    import { create } from "@/http/stall";
    import { useUi } from "@/gxota/ui/index";
    import { useUserStore } from "@/stores/user";
    import { storeToRefs } from "pinia";

    const Form = ref({ shopName: "" });
    const form = ref({});
    const loading = ref(false);

    const ui = useUi();

    const { setUser } = useUserStore();
    const user = storeToRefs(useUserStore()).user;

    const submit = async () => {
        await Form.value?.validate();
        const data = await beTenant({ userId: user.value.user_id });
        setUser({ ...user.value, tenant_id: data });
        await create({
            ...form.value,
            userId: user.value.user_id,
            tenantId: user.value.tenant_id,
            ownerWxUserId: user.value.user_id
        });

        ui.showToast("提交成功");
        loading.value = false;
    };

    const clear = () => {
        Form.value?.reset();
    };
</script>
