<template>
    <base-page padding="0">
        <base-collapse ref="collapse">
            <base-collapse-item title="默认开启">
                <text class="text">
                    折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段文字。再次点击标题，折叠内容。
                </text>
            </base-collapse-item>
            <base-collapse-item
                title="折叠内容"
                thumb="http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280"
            >
                <text class="text">
                    折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段文字。再次点击标题，折叠内容。
                </text>
            </base-collapse-item>
            <base-collapse-item title="禁用状态" disabled>
                <text class="text">禁用状态内容主体，页面上是看不到这段话的。</text>
            </base-collapse-item>
        </base-collapse>
    </base-page>

    <base-fab>
        <div class="actions">
            <navigator class="actions-item" url="/subPages/goods/categorize">
                <base-icon :size="40" name="app" />
                <base-text>分类</base-text>
            </navigator>
            <navigator class="actions-item" url="/subPages/goods/good">
                <base-icon :size="40" name="pay" />
                <base-text>商品</base-text>
            </navigator>
        </div>
    </base-fab>
</template>

<script setup>
    const active = ref(1);
</script>

<style lang="scss" scope>
    .actions {
        @apply flex;
        &-item {
            @apply flex-center flex-col w-55 px-5;
        }
    }
</style>
