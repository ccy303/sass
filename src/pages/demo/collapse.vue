<template>
    <base-page>
        <base-card label="基本用法">
            <base-collapse ref="collapse" v-model="value" @change="change">
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
        </base-card>
    </base-page>
</template>

<script setup>
    const value = ref([0]);

    const change = e => {
        console.log(e);
    };
</script>
