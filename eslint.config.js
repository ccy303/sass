const js = require("@eslint/js");
const esVuePlugin = require("eslint-plugin-vue");
const eslintConfigPrettier = require("eslint-config-prettier");
const unocss = require("@unocss/eslint-config/flat");

module.exports = [
    { files: ["src/**/*.{vue,js,ts,jsx,tsx}"] },
    unocss,
    js.configs.recommended,
    ...esVuePlugin.configs["flat/strongly-recommended"],
    eslintConfigPrettier,
    {
        languageOptions: {
            globals: {
                ref: "readonly",
                computed: "readonly",
                watch: "readonly",
                watchEffect: "readonly",
                nextTick: "readonly",
                onMounted: "readonly",
                onBeforeUnmount: "readonly",
                onBeforeMount: "readonly",
                reactive: "readonly",
                toRaw: "readonly",
                toRefs: "readonly",
                inject: "readonly",
                defineStore: "readonly",
                useUserStore: "readonly",
                provide: "readonly",
                defineComponent: "readonly",
                onUnmounted: "readonly",
                uni: "readonly",
                require: "readonly",
                getCurrentInstance: "readonly",
                useSlots: "readonly",
                getCurrentPages: "readonly"
            }
        },
        rules: {
            "vue/multi-word-component-names": ["error", { ignores: [] }],
            "vue/attribute-hyphenation": "off",
            "vue/v-on-event-hyphenation": ["error", "never", {}],
            "vue/multi-word-component-names": "off",
            "vue/no-template-shadow": ["error"],
            "vue/valid-attribute-name": "off",
            "vue/require-default-prop": ["off"],
            "vue/component-definition-name-casing": ["error"]
        }
    },
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module"
        }
    },
    {
        rules: {
            "func-style": ["error", "expression"],
            "no-var": "error",
            "no-unused-vars": "warn"
        }
    },
    {
        rules: {
            "unocss/order-attributify": "off"
        }
    }
];
