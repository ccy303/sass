<template>
    <base-page :padding="20">
        <div class="bg-#fff p-10 mb-30">
            <base-form ref="Form" :labelWidth="180" v-model="form" :rules="rules" :disabled="loading" label-position="left">
                <base-form-item label="商品分类" prop="categories.ids" required>
                    <base-select-popup v-model="form.categories.ids" multiple :options="categoryList" />
                </base-form-item>
                <base-form-item label="商品名称" prop="name" required>
                    <base-input v-model="form.name" placeholder="请填写分类名称"></base-input>
                </base-form-item>
                <base-form-item label="商品主图" prop="image" label-position="left" required>
                    <base-upload v-model="form.image" :limit="1" />
                </base-form-item>
                <base-form-item label="商品图片" prop="images" label-position="left" required>
                    <base-upload v-model="form.image" :limit="6" />
                </base-form-item>
                <base-form-item label="商品原价(元)" prop="originalPrice" label-position="left" required>
                    <base-input-number :precision="2" :step="0.01" v-model="form.originalPrice" />
                </base-form-item>
                <base-form-item label="优惠价(元)" prop="discountPrice" label-position="left" required>
                    <base-input-number :precision="2" :step="0.01" v-model="form.discountPrice" />
                </base-form-item>
                <div>
                    <base-divider>商品属性</base-divider>
                    <div v-for="(item, idx) in allAttrs" :key="idx">
                        <template v-for="(tag, tagIdx) in item.attrOptions" :key="tagIdx">
                            <base-tag plain :margin="[0, 10, 0, 0]">
                                {{ tag.name }} {{ tag.discountPrice ? `¥${tag.discountPrice / 100}` : "" }}
                            </base-tag>
                        </template>
                        <base-divider>
                            属性{{ idx + 1 }}：{{ item.name }}
                            <base-button size="small" type="primary" @tap="() => editAttr(idx)">编辑</base-button>
                            <base-button size="small" type="error" @tap="() => delAttr(idx)">删除</base-button>
                        </base-divider>
                    </div>
                </div>
                <div class="my-10">
                    <base-button type="primary" @tap="addAttr" size="small">商品属性添加</base-button>
                </div>
                <base-form-item label="简要描述" prop="brief" label-position="left" required>
                    <base-textarea v-model="form.brief" :limit="6" />
                </base-form-item>
                <base-form-item label="详细描述" prop="description" label-position="left" required>
                    <base-textarea v-model="form.description" :limit="6" />
                </base-form-item>
            </base-form>
        </div>

        <base-footer :border="true">
            <base-button size="large" round fill @tap="clear">清空</base-button>
            <base-button size="large" round fill @tap="submit" type="primary" loadingColor="#fff" :loading="loading">提交</base-button>
        </base-footer>

        <base-confirm ref="attrConfirm">
            <div class="h-60vh overflow-auto">
                <base-scroller :refresherEnabled="false">
                    <base-form :labelWidth="120" v-model="attrs" label-position="right" ref="AttrsForm">
                        <base-form-item label="属性名称">
                            <base-input v-model="attrs.name" />
                        </base-form-item>
                        <base-divider>属性选项</base-divider>
                        <template v-for="(item, idx) in attrs.attrOptions" :key="idx">
                            <base-form-item label="选项名称">
                                <base-input v-model="item.name" />
                            </base-form-item>
                            <base-form-item label="价格增量">
                                <base-input-number v-model="item.discountPrice" :min="-100" :step="0.01" :precision="2" />
                            </base-form-item>
                            <base-divider>
                                选项{{ idx + 1 }}
                                <base-button v-if="idx != 0" type="error" @tap="() => removeAttrOptions(idx)" size="small">删除</base-button>
                            </base-divider>
                        </template>
                        <base-divider>
                            <base-button type="success" @tap="addAttrOptions" size="small">添加属性选项</base-button>
                        </base-divider>
                    </base-form>
                </base-scroller>
            </div>
        </base-confirm>
    </base-page>
</template>

<script setup>
    import { getGood, submitGood, getCategoryList } from "@/http/goods";
    import { useUi } from "@/gxota/ui";
    import { onLoad } from "@dcloudio/uni-app";

    const form = ref({
        name: "",
        image: "asd",
        images: "asd",
        originalPrice: "",
        discountPrice: "",
        categories: { ids: [] },
        brief: "",
        description: "",
        attrs: []
    });

    const attrs = ref({
        name: "",
        attrOptions: [{ name: "", discountPrice: 0 }]
    });

    const allAttrs = ref([]);

    const attrConfirm = ref();
    const rules = ref({});
    const loading = ref(false);
    const categoryList = ref([]);

    const Form = ref(false);
    const AttrsForm = ref(false);

    const ui = useUi();

    const submit = async () => {
        await Form.value?.validate();
        const submitData = {
            ...form.value,
            categories: form.value.categories.ids.map(id => ({ id })),
            originalPrice: (form.value.originalPrice || 0) * 100,
            discountPrice: (form.value.discountPrice || 0) * 100
        };
        loading.value = true;
        try {
            await submitGood(submitData);
            loading.value = false;
            ui.showToast("提交成功");
            Form.value?.reset();
            allAttrs.value = [];
            submitData.id && uni.navigateBack();
        } catch (err) {
            loading.value = false;
        }
    };

    const editAttr = idx => {
        attrs.value = {
            ...allAttrs.value[idx],
            attrOptions: allAttrs.value[idx].attrOptions.map(item => ({ ...item, discountPrice: item.discountPrice ? item.discountPrice / 100 : 0 }))
        };

        attrConfirm.value.open({
            title: "商品属性编辑",
            width: "90vw",
            async beforeClose(type, { done }) {
                if (type == "confirm") {
                    allAttrs.value[idx] = {
                        ...allAttrs.value[idx],
                        name: attrs.value.name,
                        attrOptions: attrs.value.attrOptions.map(item => ({ ...item, discountPrice: (item.discountPrice || 0) * 100 }))
                    };
                }
                done();
                AttrsForm.value?.reset();
            }
        });
    };

    const delAttr = idx => {
        allAttrs.value.splice(idx, 1);
    };

    const addAttrOptions = () => {
        attrs.value.attrOptions.push({ name: "", discountPrice: 0 });
    };

    const removeAttrOptions = idx => {
        attrs.value.attrOptions.splice(idx, 1);
    };

    const addAttr = () => {
        attrConfirm.value.open({
            title: "商品属性添加",
            width: "90vw",
            async beforeClose(type, { done }) {
                if (type == "confirm") {
                    if (!attrs.value.name) {
                        return ui.showToast("请填写属性名称");
                    }
                    const index = attrs.value.attrOptions.findIndex(item => !item.name);
                    if (index != -1) {
                        return ui.showToast(`请填写选项${index + 1}名称`);
                    }

                    form.value.attrs.push({
                        name: attrs.value.name,
                        attrOptions: attrs.value.attrOptions.map(item => ({ ...item, discountPrice: (item.discountPrice || 0) * 100 }))
                    });

                    allAttrs.value = form.value.attrs;
                }

                done();
                AttrsForm.value?.reset();
            }
        });
    };

    const getDtl = async () => {
        const data = await getGood({ id: form.value.id });
        form.value = {
            ...data,
            categories: { ids: data.categories.map(v => v.id) },
            originalPrice: data.originalPrice ? data.originalPrice / 100 : 0,
            discountPrice: data.discountPrice ? data.discountPrice / 100 : 0
        };

        allAttrs.value = data.attrs;
    };

    const getCategoryListFn = async () => {
        const { records } = await getCategoryList({ size: 100 });
        categoryList.value = records.map(v => ({ label: v.name, value: v.id }));
    };

    const clear = () => {
        Form.value?.reset();
    };

    onLoad(options => {
        if (options.categorizeId) {
            form.value.categories.ids = [options.categorizeId];
        }
        if (options.goodId) {
            form.value.id = options.goodId;
            getDtl();
        }
        getCategoryListFn();
    });
</script>

<style lang="scss" scoped></style>
