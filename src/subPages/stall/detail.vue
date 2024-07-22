<template>
    <base-page :padding="20">
        <div class="bg-#fff p-10">
            <base-form ref="Form" v-model="form" :disabled="loading" label-position="left">
                <base-form-item label="摊位名称" prop="shopName" required>
                    <base-input v-model="form.shopName" placeholder="请填写分类名称"></base-input>
                </base-form-item>

                <base-divider>模块配置</base-divider>
            </base-form>
        </div>

        <base-footer :border="true">
            <base-button size="large" round fill @tap="clear">清空</base-button>
            <base-button size="large" round fill @tap="submit" type="primary" :loading="loading">提交</base-button>
        </base-footer>
    </base-page>
</template>

<script setup>
    import { onLoad } from "@dcloudio/uni-app";
    import { beTenant } from "@/http/user";
    import { create, dtl, getAdminShopModules } from "@/http/stall";
    import { useUi } from "@/gxota/ui/index";
    import { useUserStore } from "@/stores/user";
    import { storeToRefs } from "pinia";

    const Form = ref({ shopName: "" });
    const form = ref({});
    const loading = ref(false);
    const modules = ref([]);

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
        uni.navigateBack();
        loading.value = false;
    };

    const clear = () => {
        Form.value?.reset();
    };

    const getDtl = async () => {
        const data = await dtl({ id: form.value.id });
        form.value = data;
    };

    const getModules = async () => {
        const data = await getAdminShopModules({ shopId: form.value.id });
        console.log(data);
    };

    onLoad(options => {
        if (options.id) {
            form.value.id = options.id;
            getDtl();
            getModules();
        }
    });
</script>
