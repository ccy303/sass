<template>
    <base-page></base-page>
    <base-fab position="leftBottom" popDirection="vertical">
        <div class="flex-warp-col">
            <div class="icon-item">
                <base-icon :size="40" name="app" />
                <base-text>app</base-text>
            </div>
            <div class="icon-item">
                <base-icon :size="40" name="payment" />
                <base-text>pay</base-text>
            </div>
            <div class="icon-item">
                <base-icon :size="40" name="face-auth" />
                <base-text>face</base-text>
            </div>
        </div>
    </base-fab>
    <base-fab position="rightBottom">
        <div class="flex-warp">
            <div class="icon-item">
                <base-icon :size="40" name="app" />
                <base-text>app</base-text>
            </div>
            <div class="icon-item">
                <base-icon :size="40" name="payment" />
                <base-text>pay</base-text>
            </div>
            <div class="icon-item">
                <base-icon :size="40" name="face-auth" />
                <base-text>face</base-text>
            </div>
        </div>
    </base-fab>
    <base-fab position="rightTop" popDirection="vertical">
        <div class="flex-warp-col">
            <div class="icon-item">
                <base-icon :size="40" name="app" />
                <base-text>app</base-text>
            </div>
            <div class="icon-item">
                <base-icon :size="40" name="payment" />
                <base-text>pay</base-text>
            </div>
            <div class="icon-item">
                <base-icon :size="40" name="face-auth" />
                <base-text>face</base-text>
            </div>
        </div>
    </base-fab>
    <base-fab position="leftTop">
        <div class="flex-warp">
            <div class="icon-item">
                <base-icon :size="40" name="app" />
                <base-text>app</base-text>
            </div>
            <div class="icon-item">
                <base-icon :size="40" name="payment" />
                <base-text>pay</base-text>
            </div>
            <div class="icon-item">
                <base-icon :size="40" name="face-auth" />
                <base-text>face</base-text>
            </div>
        </div>
    </base-fab>
</template>

<style lang="scss" scoped>
    .flex-warp {
        @apply inline-flex items-center;
        .icon-item {
            @apply flex flex-col items-center mr-20 w-50;
        }
    }
    .flex-warp-col {
        @apply inline-flex flex-col items-center;
        .icon-item {
            @apply flex flex-col items-center my-10 w-50;
        }
    }
</style>
