<template>
    <base-page>
        <base-card label="尺寸">
            <base-icon name="like"></base-icon>
            <base-icon name="like" :size="40"></base-icon>
            <base-icon name="like" :size="50"></base-icon>
        </base-card>

        <base-card label="颜色">
            <base-icon name="like" color="primary"></base-icon>
            <base-icon name="like" color="red"></base-icon>
            <base-icon name="like" color="green"></base-icon>
        </base-card>

        <base-card label="所有图标">
            <base-grid :column="4">
                <base-grid-item v-for="item in list" :key="item">
                    <div class="item" @click="copy(item)">
                        <base-icon :name="item" :size="44"></base-icon>
                        <base-text :value="item" align="center" :margin="[10, 0, 0, 0]" />
                    </div>
                </base-grid-item>
            </base-grid>
        </base-card>
    </base-page>
</template>

<script setup>
    const list = ref([
        "app",
        "payment",
        "face-auth",
        "folder",
        "bill",
        "phone",
        "share",
        "link",
        "back",
        "enter",
        "top",
        "upgrade",
        "rise",
        "decline",
        "active",
        "shrink",
        "cropper",
        "fullscreen",
        "enlarge",
        "chart-bar",
        "chart-pie",
        "my",
        "eye-open",
        "eye-close",
        "cloud-download",
        "cloud-upload",
        "like",
        "like-fill",
        "arrow-double-left",
        "arrow-double-right",
        "arrow-bottom",
        "arrow-top",
        "arrow-left",
        "arrow-right",
        "set",
        "stop",
        "play",
        "more",
        "back-top",
        "map",
        "keyboard-9",
        "keyboard-26",
        "calendar",
        "customer-service",
        "edit",
        "scan",
        "pay",
        "image",
        "image-error",
        "time",
        "meh",
        "cry",
        "smile",
        "refresh",
        "caret-bottom",
        "caret-top",
        "notification",
        "search",
        "plus",
        "minus",
        "check",
        "close",
        "plus-border",
        "minus-border",
        "check-border",
        "close-border",
        "help-border",
        "warning-border",
        "toast-success",
        "toast-waiting",
        "toast-warning",
        "toast-error",
        "clock-fill",
        "favor-fill",
        "help-fill",
        "history-fill",
        "smile-fill",
        "success-fill",
        "delete-fill",
        "map-fill",
        "prompt-fill",
        "meh-fill",
        "cry-fill",
        "amount-fill",
        "wallet-fill",
        "doc-fill",
        "good-fill",
        "camera-fill",
        "mail-fill",
        "bank-card-fill",
        "relay-fill",
        "comment-fill",
        "notification-fill"
    ]);

    const copy = name => {
        uni.setClipboardData({
            data: name
        });
    };
</script>

<style lang="scss" scoped>
    .item {
        @apply flex-center flex-col h-75 p-10;
    }
</style>
