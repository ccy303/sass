<template>
    <div pt-100 p-x-16>
        <div size-100 b-rd-20 bg-red m-auto overflow-hidden>
            <img size-100 :src="common.appIcon" alt="" />
        </div>
        <div mt-50>
            <button @click="loginFn">使用微信号登录</button>
        </div>
        <uni-popup ref="popup" type="bottom" mask-click="false">
            <div bg-#fff b-rd-10>
                <div p-15 w-230>
                    <div font-size-18 text-center font-bold>提示</div>
                    <div mt-15 color-#757575 text-center>为保证您能享受到本应用的所有功能能，我们将获取您的手机号用于登录操作。</div>
                </div>
                <div flex>
                    <div flex-1>
                        <button @click="cancel" class="left" :plain="true">取消</button>
                    </div>
                    <div flex-1>
                        <button open-type="getPhoneNumber" @getphonenumber="bindPhone" class="right" :plain="true">同意</button>
                    </div>
                </div>
            </div>
        </uni-popup>
    </div>
</template>

<script setup>
    import { common } from "@/imgImport";
    import { login, bingPhone } from "@/http/user";
    import { onLoad } from "@dcloudio/uni-app";
    import { useUserStore } from "@/stores/user";

    const popup = ref(null);
    const queryArgument = ref({});
    const userStore = useUserStore();

    const cancel = () => {
        popup.value.close();
        userStore.setToken(null);
        userStore.setUser(null);
        navigateFun();
    };

    onLoad(query => {
        queryArgument.value = query;
    });

    const loginFn = async () => {
        const { code: loginCode } = await uni.login({ provider: "weixin" });
        // 微信登录
        const { access_token } = await login(loginCode);
        userStore.setToken(access_token);
        const userInfo = await userStore.getUserInfo();

        // 绑定手机;
        if (!userInfo.phone) {
            popup.value.open("center");
        } else {
            navigateFun();
        }
    };

    const bindPhone = async ({ detail }) => {
        const { errMsg, code } = detail;
        if (errMsg !== "getPhoneNumber:ok") {
            return cancel();
        }
        popup.value.close();
        try {
            await bingPhone(code);
            await userStore.getUserInfo();
            navigateFun();
        } catch (err) {
            setTimeout(() => cancel(), 1000);
        }
    };

    const navigateFun = () => {
        const { backUrl } = queryArgument.value;
        if (backUrl) {
            return uni.redirectTo({
                url: decodeURIComponent(backUrl),
                fail: uni.switchTab.bind(uni, { url: "/pages/index/index" })
            });
        }
        uni.navigateBack({
            delta: 1,
            fail: uni.switchTab.bind(uni, { url: "/pages/index/index" })
        });
    };
</script>

<style lang="scss" scoped>
    .left,
    .right {
        border: none;
        border-radius: 0;
        border-top: 1px solid #e0d8d8;
    }

    .right {
        color: #2a6ae9;
        border-left: 1px solid #e0d8d8;
    }
</style>
