<script setup>
    import { onLaunch } from "@dcloudio/uni-app";
    import { useUserStore } from "@/stores/user";
    import { login } from "@/http/user";

    const userStore = useUserStore();

    // #ifndef H5
    uni.showShareMenu({});
    // #endif

    (async () => {
        const { code } = await uni.login();
        if (!code) {
            return;
        }
        const { access_token, ...other } = await login(code);

        userStore.setToken(access_token);
        userStore.setUser(other);
    })();
</script>

<style lang="scss">
    /*每个页面公共css */
    page {
        background-color: #f5f1e6;
        background-repeat: no-repeat;
        min-height: 100vh;
        width: 100vw;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
    }

    .empty-btn {
        -webkit-tap-highlight-color: transparent;
        background-color: transparent;
        border-radius: 0;
        box-sizing: border-box;
        border: none;
        color: #000;
        cursor: pointer;
        display: block;
        font-size: 18px;
        line-height: normal;
        margin-left: 0;
        margin-right: 0;
        overflow: hidden;
        padding-left: 0;
        padding-right: 0;
        position: relative;
        text-align: center;
        text-decoration: none;

        &::after {
            border: none;
        }
    }

    ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
</style>
