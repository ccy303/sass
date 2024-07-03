<template>
    <base-page :padding="20">
        <view class="page">
            <base-card label="基础用法">
                <base-form ref="Form" v-model="form" :rules="rules" :disabled="loading" label-position="left">
                    <base-form-item label="活动名称" prop="name">
                        <base-input v-model="form.name" placeholder="请填写活动名称"></base-input>
                    </base-form-item>

                    <base-form-item label="活动时间" prop="date">
                        <base-select-date v-model="form.date"></base-select-date>
                    </base-form-item>

                    <base-form-item label="活动类型" prop="type">
                        <base-select v-model="form.type" :options="options.type"></base-select>
                    </base-form-item>

                    <base-form-item label="活动人数" prop="num" :justify="'end'">
                        <base-input-number v-model="form.num" :min="1" :max="100"></base-input-number>
                    </base-form-item>

                    <base-form-item label="活动区域" prop="area" label-position="top">
                        <base-checkbox-group v-model="form.area">
                            <base-checkbox v-for="(item, index) in options.area" :key="index" :label="item.value">
                                {{ item.label }}
                            </base-checkbox>
                        </base-checkbox-group>
                    </base-form-item>

                    <base-form-item label="资源" prop="source" label-position="top">
                        <base-radio-group v-model="form.source">
                            <base-radio v-for="(item, index) in options.source" :key="index" :label="item.value">
                                {{ item.label }}
                            </base-radio>
                        </base-radio-group>
                    </base-form-item>

                    <base-form-item label="活动封面" prop="cover" label-position="top">
                        <base-upload v-model="form.cover" :limit="1" />
                    </base-form-item>

                    <base-form-item label="活动海报（最多上传6张）" prop="pics" label-position="top">
                        <base-upload v-model="form.pics" :limit="6" />
                    </base-form-item>

                    <base-form-item label="活动描述" prop="remark" label-position="top">
                        <base-textarea v-model="form.remark" count placeholder="请填写活动描述" />
                    </base-form-item>

                    <base-form-item label="活动赞助商" prop="company" label-position="top">
                        <base-input v-model="form.company" placeholder="请填写活动赞助商" />

                        <template #append>
                            <base-icon name="help-border" :size="36"></base-icon>
                        </template>
                    </base-form-item>
                </base-form>
            </base-card>

            <base-footer :border="true">
                <base-button size="large" round fill @tap="clear">清空</base-button>
                <base-button size="large" round fill @tap="submit" type="success" :loading="loading">提交</base-button>
            </base-footer>
        </view>
    </base-page>
</template>

<script setup>
    import { useUi } from "@/gxota/ui/index";

    const ui = useUi();

    const form = ref({
        name: "",
        type: undefined,
        date: undefined,
        area: [0, 1],
        source: 0,
        num: 5,
        remark: "",
        cover: [],
        pics: [],
        company: ""
    });

    const rules = reactive({
        name: { required: true, message: "活动名称不能为空" },
        type: { required: true, message: "活动类型不能为空" },
        date: { required: true, message: "活动时间不能为空" },
        cover: { required: true, message: "活动封面不能为空" }
    });

    const options = reactive({
        area: [
            { label: "一区", value: 0 },
            { label: "二区", value: 1 }
        ],
        type: [
            { label: "线上活动", value: 3 },
            { label: "推广活动", value: 1 },
            { label: "线下活动", value: 2 }
        ],
        source: [
            { label: "赞助", value: 0 },
            { label: "场地", value: 1 }
        ]
    });

    const Form = ref();

    const loading = ref(false);

    const submit = () => {
        Form.value?.validate(valid => {
            if (valid) {
                loading.value = true;
                console.log(form);
                setTimeout(() => {
                    ui.showToast("提交成功");
                    loading.value = false;
                }, 1500);
            }
        });
    };

    // function reset() {
    //     Form.value?.reset();
    // }

    const clear = () => {
        Form.value?.clear();
    };
</script>
