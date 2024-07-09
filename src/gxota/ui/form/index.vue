<template>
    <div :class="['cui-form', { 'is-border': border }]">
        <slot></slot>

        <!-- 提示 -->
        <base-toast :ref="setRefs('toast')"></base-toast>
    </div>
</template>

<script>
    import { cloneDeep, isArray, isEmpty } from "lodash-es";
    import { useRefs } from "../../hooks";
    import AsyncValidator from "../../utils/async-validator";

    export default defineComponent({
        name: "BaseForm",

        options: { styleIsolation: "shared" },

        props: {
            // 表单数据对象
            modelValue: { type: Object, default: () => ({}) },
            // 表单验证规则
            rules: Object,
            // 是否带有边框
            border: Boolean,
            // 是否禁用
            disabled: Boolean,
            // 水平布局  PropType<"start" | "center" | "end">
            justify: String,
            // 消息提示方式  PropType<"toast" | "inner" | "none">
            tips: { type: String, default: "toast" },
            // 标签的宽度
            labelWidth: { type: [String, Number], default: 150 },
            // 标签的位置
            labelPosition: { type: String, default: "left" },
            // 是否在 rules 属性改变后立即触发一次验证
            validateOnRuleChange: { type: Boolean, default: false },
            // 是否滚动到错误项
            scrollToError: { type: Boolean, default: true }
        },

        emits: ["update:modelValue", "change", "reset", "clear"],

        setup(props, { emit }) {
            const { proxy } = getCurrentInstance();
            const { refs, setRefs } = useRefs();

            // 校验关键字
            const fields = ref([]);

            // 表单值
            const form = ref({});

            // 旧值
            const _form = cloneDeep(props.modelValue);

            watch(
                () => props.modelValue,
                val => {
                    form.value = val;
                },
                { immediate: true, deep: true }
            );

            // 规则
            const rules = ref({});

            // 设置规则
            const setRules = value => {
                rules.value = value || {};
            };

            // 监听规则变化
            watch(() => props.rules, setRules, { immediate: true, deep: true });

            // 添加校验关键字
            const addField = (value, rule) => {
                const item = fields.value.find(e => e == value);

                if (!item && value) {
                    fields.value.push(value);

                    // 添加规则
                    if (rule) {
                        rules.value[value] = rule;
                    }
                }
            };

            // 移除校验关键字
            const removeField = value => {
                fields.value.splice(fields.value.indexOf(value), 1);
            };

            // 校验表单
            const validate = async () => {
                return new Promise((resolve, reject) => {
                    if (props.disabled) {
                        return resolve();
                    }
                    validateField(fields.value, (valid, errors) => {
                        if (!valid) {
                            const { field, message } = errors[0];
                            props.scrollToError && proxy.__children.forEach(e => e.scrollTo(field));
                            switch (props.tips) {
                                case "toast":
                                    refs.toast.open({
                                        message,
                                        icon: "toast-warning"
                                    });
                                    break;
                                case "inner":
                                    proxy.__children.forEach(e => {
                                        e.onError(errors);
                                    });
                                    break;
                            }
                            return reject(errors);
                        } else {
                            return resolve();
                        }
                    });
                });
            };

            // 根据字段校验表单
            const validateField = (value, callback) => {
                if (!isEmpty(value)) {
                    const r = {};

                    fields.value.forEach(e => {
                        if (rules.value[e]) {
                            r[e] = rules.value[e];
                        }
                    });
                    const validator = new AsyncValidator(r);
                    const values = isArray(value) ? value : [value];
                    const data = {};

                    values.forEach(e => {
                        let d = form.value;

                        if (e) {
                            if (e.includes(".")) {
                                e.split(".").forEach(e => (d = d[e]));
                            } else {
                                d = d[e];
                            }

                            data[e] = d;
                        }
                    });

                    validator.validate(data, errors => {
                        if (callback) {
                            callback(!errors, errors);
                        }
                    });
                } else {
                    callback(true, []);
                }
            };

            // 重置表单
            const reset = () => {
                form.value = cloneDeep(_form);
                emit("update:modelValue", form.value);
                emit("reset");
                clearValidate();
            };

            // 清空表单
            const clear = () => {
                form.value = {};
                emit("update:modelValue", form.value);
                emit("clear");
                clearValidate();
            };

            // 移除表单校验结果
            const clearValidate = () => {
                (proxy.__children || []).forEach(e => {
                    e.clearValidate();
                });
            };

            return { refs, setRefs, form, setRules, validate, validateField, reset, clear, clearValidate, addField, removeField };
        }
    });
</script>

<style lang="scss" scoped>
    .cui-form {
        :deep(.cui-form-item) {
            @apply flex mb-16 relative font-size-14;

            .cui-form-item {
                &__container {
                    @apply flex items-center flex-1;
                }

                &__label {
                    @apply flex-shrink-0 mr-10;
                    height: $cui-height;
                    line-height: $cui-height;
                }

                &__content {
                    @apply flex-1;

                    &.is-justify--left {
                        @apply text-left;
                    }

                    &.is-justify--center {
                        @apply text-center;
                    }

                    &.is-justify--end {
                        @apply text-right;
                    }
                }

                &__message {
                    @apply flex font-size-12 text-right mt-3 items-center ml-5;
                    color: $cui-color-error;
                }

                &__append {
                    @apply flex items-center ml-10;
                }
            }
        }

        :deep(.is-required) {
            .cui-form-item__label::after {
                @apply ml-3;
                content: "*";
                color: $cui-color-error;
            }
        }

        :deep(.is-top) {
            @apply flex-col;

            .cui-form-item__label {
                @apply mr-0 mb-5;
            }
        }

        :deep(.is-left) {
            .cui-form-item__label {
                @apply text-left;
            }
        }

        :deep(.is-right) {
            .cui-form-item__label {
                @apply text-right;
            }
        }

        &--border {
            :deep(.cui-form-item) {
                border-bottom: $cui-border-width solid #eeeeee;
            }
        }
    }
</style>
