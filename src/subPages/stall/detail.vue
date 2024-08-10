<template>
    <base-page :padding="20">
        <div>
            <base-form ref="Form" v-model="form" :disabled="loading" label-position="left">
                <base-form-item label="摊位名称" prop="shopName" required>
                    <base-input v-model="form.shopName" placeholder="请填写分类名称"></base-input>
                </base-form-item>
                <base-form-item label="店铺标语" prop="slogan">
                    <base-textarea v-model="form.slogan"></base-textarea>
                </base-form-item>
                <base-form-item label="店铺描述" prop="description">
                    <base-textarea v-model="form.description"></base-textarea>
                </base-form-item>
                <base-divider>模块配置</base-divider>
                <div v-for="(item, idx) in modules" :key="item.id" :style="{ marginBottom: idx == modules.length - 1 ? '50px' : '' }">
                    <base-card :label="item.title">
                        <base-upload
                            v-model="item.image"
                            :limit="item.moduleType == 8 ? 6 : 1"
                            :url="url"
                            :requestOption="{ ...requestOption, formData: { refId: item.id } }"
                            @delete="data => imageDel(data, item.id)"
                        />
                        <template #footer>
                            <div>
                                <base-switch :activeValue="1" :inactiveValue="0" v-model="item.status"></base-switch>
                            </div>
                        </template>
                    </base-card>
                </div>
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
    import { create, dtl, getAdminShopModules, saveAdminShopModules } from "@/http/stall";
    import { useUi } from "@/gxota/ui/index";
    import { useUserStore } from "@/stores/user";
    import { storeToRefs } from "pinia";
    import { header } from "@/http/request";

    const url = ref(`${import.meta.env.VITE_BASE_URL}/blade-resource/attach/uploadFile`);
    const { tenant_id } = uni.getStorageSync("accountInfo");
    const requestOption = ref({
        header: { ...header(), "Tenant-Id": tenant_id }
    });
    const Form = ref({ shopName: "" });
    const form = ref({});
    const loading = ref(false);
    const modules = ref([]);
    const deleteFiles = ref([]);

    const ui = useUi();

    const { setUser } = useUserStore();
    const user = storeToRefs(useUserStore()).user;

    const submit = async () => {
        await Form.value?.validate();
        if (user.value.user_id == "000000") {
            const data = await beTenant({ userId: user.value.user_id });
            setUser({ ...user.value, tenant_id: data });
        } else {
            const body = modules.value.map(item => {
                const { image, ...other } = item;
                const data = { ...other };
                if (image?.length) {
                    data.moduleImageList = image.map((img, idx) => {
                        return {
                            attachId: img.data.attachId,
                            imageSort: idx,
                            imageUrl: img.data.addressList[0]
                        };
                    });
                }
                return data;
            });
            await saveAdminShopModules({ homepageModulesDTOS: body, deleteFiles: deleteFiles.value });
        }
        await create({
            ...form.value,
            userId: user.value.user_id,
            tenantId: user.value.tenant_id,
            ownerWxUserId: user.value.user_id
        });
        ui.showToast("提交成功");
        uni.navigateBack();
        deleteFiles.value = [];
        loading.value = false;
    };

    const clear = () => {
        Form.value?.reset();
    };

    const getDtl = async () => {
        const data = await dtl({ id: form.value.id });
        form.value = data;
    };

    const imageDel = async (data, id) => {
        deleteFiles.value.push(data.data.attachId);
    };

    const getModules = async () => {
        const data = await getAdminShopModules({ shopId: form.value.id });
        data.map(item => {
            item.image = item.moduleImageList.map(img => {
                return { thumb: img.imageUrl, url: img.imageUrl, status: "success", data: { addressList: [img.imageUrl], attachId: img.attachId } };
            });
        });
        modules.value = data;
    };

    onLoad(options => {
        if (options.id) {
            form.value.id = options.id;
            getDtl();
            getModules();
        }
    });
</script>
